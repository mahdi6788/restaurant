'use client'
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import CartModal from "./CartModal";
import { MdRestaurantMenu } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const MobileBottomNav: React.FC = () => {
  const translate =  useTranslations("MobileBottomNav")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, cartItemsLoading } = useCart();
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <>
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-blue-600 text-white flex justify-around items-center py-2 shadow-lg rounded-t-xl z-50">
        {/* Home */}
        <Link href="/" className={`flex flex-col items-center justify-center ${(pathname === `/${locale}` ) && "border shadow-md shadow-yellow-200 px-1 rounded-xl"}`}>
          <FaHome size={30} />
          {translate("Home")}
        </Link>
        {/* Menu */}
        <Link href="/menu" className={`flex flex-col items-center justify-center ${pathname.includes("/menu") && "border shadow-md shadow-yellow-200 px-1 rounded-xl"}`}>
          <MdRestaurantMenu size={30} />
          {translate("Menu")}
        </Link>
        {/* cart */}
        <button onClick={() => setIsModalOpen(true)} className="relative flex flex-col items-center justify-center">
          <FaShoppingCart size={30} />
          {translate("Cart")}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cartItemsLoading
              ? "..."
              : cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0}
          </span>
        </button>
      </nav>
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MobileBottomNav;
