"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
import CartModal from "./CartModal";
import Dropdown from "./Dropdown";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { data: session } = useSession();
  const { cartItems, cartItemsLoading } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="hidden sm:flex fixed top-0 left-28 rounded-b-lg shadow-lg text-white bg-emerald-600 border border-emerald-300 z-50 pl-2 py-2 w-[calc(100vw-10rem)]">
      <div className="container max-w-screen-2xl mx-auto px-1">
        {/* Desktop */}
        <nav className="hidden sm:flex items-center justify-between space-x-4 ">
          {/* Left: signIn / signOut / register / Welcome */}
          <ul className="flex items-center space-x-4">
            {session ? (
              <li>
                <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
              </li>
            ) : (
              <>
                <span>Join us for a delicious experience 😊</span>
                <li>
                  <Link
                    href="/login"
                    className="hidden md:flex items-center justify-center gap-1"
                  >
                    {/* <FaSignInAlt /> */}
                    LogIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hidden md:flex items-center justify-center gap-1"
                  >
                    {/* <GiArchiveRegister /> */}
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative px-4 py-2 text-white rounded hover:text-green-300"
              >
                <FaShoppingCart size={30} />
                <span className="absolute top-0 right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                  {cartItemsLoading
                    ? "..."
                    : cartItems.reduce((sum, item) => sum + item.quantity, 0) ||
                      0}
                </span>
              </button>
            </li>
            <li>
              <Link
                href="/checkout"
                className=" hidden md:flex items-center justify-center gap-1 mr-1"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
        <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </header>
  );
}
