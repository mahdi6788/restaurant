"use client";

import Link from "next/link";
import { MenuItem } from "@prisma/client";
import { useSession } from "next-auth/react";
import FoodCard from "./components/FoodCard";
import { useMenu } from "@/hooks/useMenu";
import { HomeSkeleton } from "./components/skeleton";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import CartModal from "./components/CartModal";
import { useState } from "react";
import Dropdown from "./components/Dropdown";
import { FaShoppingCart } from "react-icons/fa";

export default function HomePage() {
  const { data: session } = useSession();
  const { menu, menuLoading } = useMenu();
  const { cartItems, cartItemsLoading } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (menuLoading) return <HomeSkeleton />;

  const todayFoods = menu.filter((food: MenuItem) => food.isAvailable);

  return (
    <div className="relative flex flex-col items-center justify-center bg-cover bg-center min-h-screen w-full mx-auto bg-[url('/images/BG/bgHome.jpg')] sm:bg-[url('/images/BG/bg2.jpg')] ">
      <div className="fixed inset-0 z-0 bg-black/20 backdrop-blur-[2px] sm:backdrop-blur-sm supports-[backdrop-filter]:bg-black/10"></div>
      {/* Body */}
      <div className="relative z-10 w-full max-w-7xl sm:px-6 lg:px-8">
        {/* DESKTOP Header Section */}
        <div className=" hidden sm:flex fixed top-0 left-28 z-50 w-[calc(100vw-10rem)]">
          <div className="flex items-center justify-between py-4">
            {/* User Actions */}
            <div className="flex items-center gap-4 text-stone-100 font-bold">
              {session ? (
                <div className="flex items-center gap-3">
                  {/* Dashboard / Logout */}
                  <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="flex items-center gap-1 hover:text-green-300"
                  >
                    LogIn
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center pl-2 hover:text-green-300"
                  >
                    Register
                  </Link>
                </div>
              )}
              {/* cart */}
              <button
                onClick={() => setIsModalOpen(true)}
                className=" relative p-2 text-white rounded  hover:text-green-300"
              >
                <FaShoppingCart size={30} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItemsLoading
                    ? "..."
                    : cartItems.reduce((sum, item) => sum + item.quantity, 0) ||
                      0}
                </span>
              </button>
            </div>
            {/* Today's Menu Title */}
            <div className="absolute top-0 right-1/3 text-stone-800 font-bold bg-slate-100 rounded-b-lg p-2 px-16 shadow-2xl shadow-sky-200">
              {todayFoods.length === 0
                ? "No food available"
                : "Today’s Specials"}
            </div>
          </div>
        </div>

        {/* mobile header */}
        <div className="sm:hidden absolute top-0 left-1/4 text-stone-800 font-bold bg-slate-100 rounded-b-lg p-2 px-10 shadow-2xl shadow-sky-200">
          {todayFoods.length === 0 ? "No food available" : "Today’s Specials"}
        </div>

        {/* Products */}
        <div className="mt-20 relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-20">
          <div
            className={
              todayFoods.length === 1
                ? "flex-1"
                : "grid grid-cols-1 sm:grid-cols-autofit gap-y-2"
            }
          >
            {todayFoods.map((todayFood: MenuItem) => (
              <div
                key={todayFood.id}
                className="flex flex-col items-center justify-center"
              >
                <FoodCard food={todayFood} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Menu */}
      <div className="hidden sm:block absolute top-3 right-0 w-1/12 z-30">
        <Link href="/menu">
          <div className=" flex items-center justify-center">
            <Image
              alt="Menu"
              src="/images/elements/menu.jpg"
              width={85}
              height={80}
              className="opacity-80 rounded-full hover:opacity-100 transition-opacity"
              priority
            />
          </div>
        </Link>
      </div>
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
