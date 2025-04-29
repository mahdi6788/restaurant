/// TODO: address and delivery based on area

import { useState } from "react";
import { CheckoutCard } from "./CheckoutCard";
import { CartItems } from "@/hooks/useCart";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface CheckoutProps {
  handleCheckout: (event:React.FormEvent<HTMLFormElement>) => void;
  name: string;
  email: string;
  address: string;
  setAddress: (value: string) => void,
  setPhone: (value: string) => void,
  phone: string;
  cartItems: CartItems;
  orderLoading: boolean
}

export default function CheckoutAccordion({
  handleCheckout,
  name,
  email,
  address,
  setAddress,
  phone,
  setPhone,
  cartItems,
  orderLoading
}: CheckoutProps) {
  const translate = useTranslations("CheckoutAccordion")
  const {data:session} = useSession()
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [orderIsOpen, setOrderIsOpen] = useState(false);
  const [totalIsOpen, setTotalIsOpen] = useState(false);
  

  const handleInfo = () => {
    setInfoIsOpen(!infoIsOpen);
    setOrderIsOpen(false);
    setTotalIsOpen(false);
  };
  const handleOrder = () => {
    setInfoIsOpen(false);
    setOrderIsOpen(!orderIsOpen);
    setTotalIsOpen(false);
  };
  const handleTotal = () => {
    setInfoIsOpen(false);
    setOrderIsOpen(false);
    setTotalIsOpen(!totalIsOpen);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {/* title: Customer Information */}
      <h2 id="accordion-collapse-heading-1">
        <button
          onClick={handleInfo}
          type="button"
          className="flex items-center justify-between w-full p-2 font-medium text-gray-900 border border-b-0 border-gray-200 rounded-t-xl focus:ring-2 focus:ring-gray-200 gap-3"
        >
          <p className="text-lg font-bold">{translate("Customer Information")}</p>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      {/* Content */}
      <div
        id="accordion-collapse-body-1"
        className={`${infoIsOpen ? "flex border" : "hidden"} mb-1`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5">
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                {translate("Name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={name || "Not set"}
                disabled
                className="mt-1 pl-2 pr-32 block text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                {translate("Email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={email || ""}
                disabled
                className="mt-1 pl-2 block text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-lg font-medium text-gray-700"
              >
                {translate("Address")}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 pl-2 block text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700"
              >
                {translate("Phone Number")}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 pl-2 block text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </form>
        </div>
      </div>
      {/* Title: Order Summary */}
      <h2 id="accordion-collapse-heading-2">
        <button
          onClick={handleOrder}
          type="button"
          className="flex items-center justify-between w-full p-2 font-medium border border-b-0 text-gray-900 border-gray-200 focus:ring-2 focus:ring-gray-200 gap-3"
        >
          <p className="text-lg font-bold">{translate("Order Summary")}</p>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      {/* Content */}
      <div
        id="accordion-collapse-body-2"
        className={`${orderIsOpen ? "flex border" : "hidden"} mb-1`}
        aria-labelledby="accordion-collapse-heading-2"
      >
        <div className="">
          {cartItems.length === 0 ? (
            <p>{translate("No items in the cart")}</p>
          ) : (
            <div className="space-y-4">
              <table className="sm:hidden table min-w-full text-gray-900">
                <thead className="text-left">
                  <tr className="">
                    <th className="px-1 py-1 border">{translate("Image")}</th>
                    <th className="px-1 py-1 border">{translate("Name")}</th>
                    <th className="px-1 py-1 border">{translate("Qty")}</th>
                    <th className="px-3 py-1 border">{translate("Price")}</th>
                    <th className="px-5 py-1 border">{translate("Edit")}</th>
                    <th className="py-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <CheckoutCard item={item} isMobile={true} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* Title: Total */}
      <h2 id="accordion-collapse-heading-3">
        <button
          onClick={handleTotal}
          type="button"
          className="flex items-center justify-between w-full p-2 font-medium border border-gray-200 text-gray-900 focus:ring-2 focus:ring-gray-200 gap-3"
        >
          <p className="text-lg font-bold">{translate("Total")}</p>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-3"
        className={`${totalIsOpen ? "flex border" : "hidden"} mb-1`}
        aria-labelledby="accordion-collapse-heading-3"
      >
        <div className="p-5 space-y-5 w-full">
          {/* Total */}
          <div className="flex justify-between items-center gap-3">
            <p className="text-gray-800 text-lg">{translate("Delivery cost")}: </p>
            <p className="text-orange-700">
              AED 0.00 
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-800 text-lg">{translate("Total")}</p>
            <p className="text-gray-900 text-xl font-bold">
              AED{" "}
              {cartItems
                .reduce(
                  (sum, item) => sum + item.menuItem.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <form onSubmit={(event) => handleCheckout(event)} className="w-full">
            <button
              type="submit"
              className={`w-full text-xl font-bold bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors ${orderLoading && "animate-pulse"}`}
            >
              {session 
              ?translate("Checkout")
              :translate("Sign in to checkout")
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
