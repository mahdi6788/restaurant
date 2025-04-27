/*
TODO:
1. summary up with the button of checkout and info down or put a button to ckeck the info as a modal and update
2. add payment
*/

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckoutInput } from "@/app/lib/zod";
import { CheckoutCard } from "@/app/[locale]/components/CheckoutCard";
import CheckoutAccordion from "@/app/[locale]/components/CheckoutAccordion";
import { User } from "@prisma/client";

export default function Checkout() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const [total, setTotal] = useState(0);

  const { data: session, status, update } = useSession();
  const userId = session?.user.id;
  const name = session?.user?.name;
  const email = session?.user?.email;
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { cartItems } = useCart();

  const query = new URLSearchParams({
    email: email || "",
    id: "",
  }).toString();

  const fetchCustomer = async () => {
    const res = await fetch(`api/users/single-user?${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Something went wrong");
    const customer = await res.json();
    return customer as User;
  };

  useEffect(() => {
    fetchCustomer()
      .then((customer) => {
        setAddress(customer.address ?? "");
        setPhone(customer.phone ?? "");
      })
      .catch((error) => {
        console.error("Failed to fetch customer: ", error);
      });
    setTotal(
      cartItems.reduce(
        (sum, item) => sum + item?.quantity * item?.menuItem.price,
        0
      ) ?? 0
    );
  }, [cartItems, session, email]);

  /// PAYMENT ///
  //   const paymentRes = await fetch("/api/payment", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ amount: total }),
  //   });
  //   const paymentData = await paymentRes.json();
  //   setClientSecret(paymentData.clientSecret);
  // }

  const makeOrderFn = async ({
    phone,
    address,
    total,
    userId,
  }: CheckoutInput) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, address, total, userId }),
      });
      if (!res.ok) throw new Error("Failed to make the order");
      const response = await res.json();
      console.log(response.error);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: makeOrder, isPending: orderLoading } = useMutation({
    mutationFn: makeOrderFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout"] });
      toast.success("Order made successfully");
      router.push("/users");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to make the order");
    },
  });

  const handleCheckout = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    /// if the user is not logged in, navigate to login page
    if (!session) {
      router.push(
        "/login?callbackUrl=/checkout&message=Please sign in to complete your order"
      );
      return null;
    }
    if (status === "authenticated") {
      if (!address || !phone) {
        router.push(
          "/users/customers/profile?callbackUrl=/checkout&message=Please complete your profile before ordering"
        );
        return null;
      }
      if (userId && total !== 0) {
        /// update the customer info if there is change
        try {
          const res = await fetch("/api/users", {
            method: "PATCH",
            body: JSON.stringify({ userId, address, phone }),
            headers: { "Content-Type": "application/json" },
          });
          const response = await res.json();
          /// object (res) contains the HTTP status code
          /// response variable contains parsed JSON body error or message
          switch (res.status) {
            case 404:
              toast.error(response.error);
              break;
            case 200:
              toast.success(response.message);
              /// Only trigger on a successful update to avoid redirecting on errors.
              update(session);
              break;
            case 500:
              toast.error(response.error);
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to update profile");
        }

        makeOrder({ phone, address, total, userId });
      } else {
        toast.error("Cart is empty.");
      }
    }
  };

  return (
    <div className="container mx-auto px-2 py-8 pt-24 h-screen text-orange-900 bg-emerald-500">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-start">
        Checkout
      </h1>
      <div className="hidden sm:grid grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className=" bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Customer Information</h2>
          <form onSubmit={(event) => handleCheckout(event)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={name || "Not set"}
                disabled
                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={email || ""}
                disabled
                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors ${orderLoading && "animate-pulse"}`}
            >
              {session ? "Checkout" : "Sign in to checkout"}
            </button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            <div className="space-y-4">
              {/* Desktop */}
              <table className="table min-w-full text-gray-900">
                <thead className="text-left text-sm">
                  <tr>
                    <th className="p-1" scope="col">
                      Image
                    </th>
                    <th className="p-1" scope="col">
                      Name
                    </th>
                    <th className="p-1" scope="col">
                      Quantity
                    </th>
                    <th className="p-1" scope="col">
                      Price
                    </th>
                    <th className="p-1" scope="col">
                      Edit
                    </th>
                    <th className="p-1" scope="col">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      key={item.id}
                    >
                      <CheckoutCard item={item} isMobile={false} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden">
        <CheckoutAccordion
          name={name as string}
          email={email as string}
          address={address as string}
          setAddress={setAddress}
          setPhone={setPhone}
          phone={phone as string}
          cartItems={cartItems}
          handleCheckout={handleCheckout}
          orderLoading={orderLoading}
        />
      </div>
    </div>
  );
}
