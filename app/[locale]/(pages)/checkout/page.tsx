"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { CheckoutInput } from "@/app/lib/zod";
import { CheckoutCard } from "@/app/components/CheckoutCard";
import CheckoutAccordion from "@/app/components/CheckoutAccordion";
import { User } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { BsCash } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";

export default function Checkout() {
  const translate = useTranslations("Checkout");
  const router = useRouter();
  // const queryClient = useQueryClient();
  const { data: session, status, update } = useSession();
  const userId = session?.user.id;
  const name = session?.user?.name;
  const email = session?.user?.email;
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const { cartItems, total } = useCart();

  const query = new URLSearchParams({ email: email || "" }).toString();

  const fetchCustomerFn = async () => {
    const res = await fetch(`/api/users/single-user?${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Something went wrong");
    const customer = await res.json();
    return customer as User;
  };

  const { data: SingleCustomer } = useQuery({
    queryKey: ["customer", email, session],
    queryFn: fetchCustomerFn,
  });

  useEffect(() => {
    setAddress(SingleCustomer?.address ?? "");
    setPhone(SingleCustomer?.phone ?? "");
  }, [SingleCustomer]);

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
              setShowPayment(true);
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
      } else {
        toast.error("Cart is empty.");
      }
    }
  };

  const handleCOD = async () => {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        phone,
        address,
        userId,
        paymentMethod: "COD",
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    alert("COD order placed successfully!");
    router.push("/users")
  };

  const handleOnline = () => {
    router.push("/payment")
  }

  return (
    <div className="container mx-auto px-2 py-8 pt-24 min-w-full h-screen text-orange-500 bg-emerald-900 ">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-start">
        {translate("Checkout")}
      </h1>
      <div className="hidden sm:grid grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className=" bg-white dark:dark-mode p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">
            {translate("Customer Information")}
          </h2>
          <form
            onSubmit={(event) => handleCheckout(event)}
            className="rounded-lg p-1"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium ">
                {translate("Name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={name || "Guest"}
                disabled
                className="mt-1 p-1 text-blue-950 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium ">
                {translate("Email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={email || ""}
                disabled
                className="mt-1 p-1 text-blue-950 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium ">
                {translate("Address")}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-1 text-blue-950 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium ">
                {translate("Phone Number")}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-1 text-blue-950 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors `} /// ${orderLoading && "animate-pulse"}
            >
              {session
                ? translate("Checkout")
                : translate("Sign in to checkout")}
            </button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="bg-white dark:dark-mode p-6 rounded-lg shadow-md">
          <h2 className="mb-4">{translate("Order Summary")}</h2>
          {cartItems.length === 0 ? (
            <p>{translate("No items in the cart")}</p>
          ) : (
            <div className="space-y-4">
              {/* Desktop */}
              <table className="table">
                <thead className="text-left text-sm">
                  <tr>
                    <th className="p-1" scope="col">
                      {translate("Image")}
                    </th>
                    <th className="p-1" scope="col">
                      {translate("Name")}
                    </th>
                    <th className="p-1" scope="col">
                      {translate("Quantity")}
                    </th>
                    <th className="p-1" scope="col">
                      {translate("Price")}
                    </th>
                    <th className="p-1" scope="col">
                      {translate("Edit")}
                    </th>
                    <th className="p-1" scope="col">
                      {translate("Remove")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr className="w-full border-b py-3 text-sm" key={item.id}>
                      <CheckoutCard item={item} isMobile={false} />
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-5 space-y-5 w-full">
                {/* Total */}
                <div className="flex justify-between items-center gap-3">
                  <p className=" text-lg">{translate("Delivery cost")} </p>
                  <p className="">AED 0.00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className=" text-lg">{translate("Total")}</p>
                  <p className=" text-xl font-bold">AED {total.toFixed(2)}</p>
                </div>
              </div>
              {/* Patment Options */}
              <div className={`${showPayment ? "flex flex-col": "hidden"}`}>
                <p>{translate("Payment options")}</p>
                <div className="flex items-center justify-between">
                  <button onClick={handleCOD} className="flex items-center justify-between gap-2 py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
                    <BsCash color="blue"/>
                    <p>{translate("Cash on Delivery")}(COD)</p>
                  </button>
                  <button onClick={handleOnline} className="flex items-center justify-between gap-2 py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
                    <MdOutlinePayment color="blue"/>
                    <p>{translate("Online payment")}</p>
                  </button>
                </div>
              </div>
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
          total={total}
          handleCheckout={handleCheckout}
          handleOnline={handleOnline}
          handleCOD={handleCOD}
          showPayment={showPayment}
          // orderLoading={orderLoading}
        />
      </div>
    </div>
  );
}
