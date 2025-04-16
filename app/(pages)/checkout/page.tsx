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
import { CheckoutCard } from "@/app/components/CheckoutCard";
import CheckoutAccordion from "@/app/components/CheckoutAccordion";

export default function Checkout() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const [total, setTotal] = useState(0);

  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const name = session?.user?.name;
  const address = session?.user?.address;
  const phone = session?.user?.phone;
  const email = session?.user?.email;

  const { cartItems } = useCart();

  useEffect(() => {
    setTotal(
      cartItems.reduce(
        (sum, item) => sum + item?.quantity * item?.menuItem.price,
        0
      ) ?? 0
    );
  }, [cartItems]);

  /// PAYMENT ///
  //   const paymentRes = await fetch("/api/payment", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ amount: total }),
  //   });
  //   const paymentData = await paymentRes.json();
  //   setClientSecret(paymentData.clientSecret);
  // }

  const makeOrderFn = async ({ address, total, userId }: CheckoutInput) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, total, userId }),
      });
      if (!res.ok) throw new Error("Failed to make the order");
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: makeOrder } = useMutation({
    mutationFn: makeOrderFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout"] });
      toast.success("Order was made successfully");
      router.push("/users/customers/orders");
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
          "/users/customers/profile?message=Please complete your profile before ordering"
        );
        return null;
      }
      if (userId) {
        makeOrder({ address, total, userId });
      } else {
        toast.error("Please try again.");
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
                defaultValue={address || ""}
                disabled
                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block text-sm font-medium text-orange-700"
              >
                Area (Deira, Business Bay, Down Town, Marina, ...)
              </label>
              <input
                type="text"
                id="area"
                name="area"
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
                defaultValue={phone || ""}
                disabled
                className="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Checkout
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
          phone={phone as string}
          cartItems={cartItems}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
