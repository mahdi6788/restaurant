"use client";

import { useCart } from "@/hooks/useCart";
import { CartItem, MenuItem } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { CartCard } from "./CartCard";
import { IoIosCloseCircle } from "react-icons/io";
import { useTranslations } from "next-intl";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const translate = useTranslations("CartModal");
  const { clearCart, cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity * cartItem.menuItem.price,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-emerald-500 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{translate("Your Cart")}</h2>
          <button onClick={onClose}>
            <IoIosCloseCircle size={30} color="red" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">
            {translate("Your cart is empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cartItems.map((item: CartItem & { menuItem: MenuItem }) => (
              <div
                key={item?.id}
                className="relative p-5 bg-gray-300 text-blue-950 dark:dark-mode rounded-3xl shadow-lg"
              >
                <CartCard item={item} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => clearCart()}
            className="px-4 py-3 bg-gray-800 text-orange-500 rounded"
          >
            {translate("Clear Cart")}
          </button>
          <Link
            href="/checkout"
            className="px-4 py-3 bg-gray-800 text-green-500 rounded"
            onClick={onClose}
          >
            {translate("Total: AED")} {total.toFixed(2)} -{" "}
            {translate("Checkout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
