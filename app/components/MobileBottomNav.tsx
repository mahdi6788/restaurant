// components/BottomNav.tsx
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import CartModal from "./CartModal";
import { MdRestaurantMenu } from "react-icons/md";

const MobileBottomNav: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, cartItemsLoading } = useCart();

  return (
    <>
      <nav className="sm:hidden fixed bottom-8 left-0 right-0 bg-blue-600 text-white flex justify-around items-center py-2 shadow-lg rounded-t-xl z-50">
        {/* Home */}
        <Link href="/">
          <FaHome size={30}/>
        </Link>
        {/* Menu */}
        <Link href="/menu">
          <MdRestaurantMenu size={30} />
        </Link>
        {/* cart */}
        <button onClick={() => setIsModalOpen(true)} className="relative">
          <FaShoppingCart size={30}/>
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
