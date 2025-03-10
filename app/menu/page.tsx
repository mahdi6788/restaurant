'use client'

import Link from "next/link";
import MenuCards from "../components/MenuCards";
import { FaSignInAlt } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { useCartContext } from "../context/CartContext";
import { useFoodsContext } from "../context/FoodsContext";

// Fetch Data in a Server Component using MongoDB
// use direct database queries and no need to use API route
export default function Menu() {
  const {foods, sideItems} = useFoodsContext()
  const { cart } = useCartContext();

  return (
    <div
      style={{ backgroundImage: "url('/images/bg8.webp')" }}
      className=" flex items-center justify-center bg-cover bg-center w-full max-w-screen-2xl mx-auto"
    >
      <div className="relative pb-10 px-1">
        {/* Header */}
        <header className="flex items-center justify-around text-center mb-10 opacity-85 rounded-b-xl">
          <h1 className="text-xl font-bold bg-orange-300 text-blue-800 px-2 rounded-b-lg ">
            Menu
          </h1>
          <div className="flex items-center justify-end gap-5 bg-orange-300 text-blue-800 px-2 rounded-b-lg font-bold text-lg">
            <Link href="/cart" className="relative">
              🛒{" "}
              <span className="absolute top-0 right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            </Link>
            <Link
              href={"/login"}
              className="flex items-center justify-between gap-2"
            >
              <FaSignInAlt className="md:hidden" />
              <p className="hidden md:flex">Log In</p>
            </Link>
            <Link href={"/"}>
              <CiHome className="md:hidden" />
              <p className="hidden md:flex">Home</p>
            </Link>
          </div>
        </header>
        {/* Menu */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {foods.map((food) => (
              <MenuCards
                key={food?._id?.toString()} // Convert ObjectId to string
                food={food}
              />
            ))}
          </div>
        </section>

        {/* Side Items */}
        <section className="my-20">
          <h2 className="text-xl font-bold text-blue-200 mb-2">Side Items</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {sideItems.map((item) => (
              <MenuCards key={item._id?.toString()} food={item} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="absolute bottom-10 right-1/2 text-center text-gray-300 ">
          <p>Contact Us</p>
        </footer>
      </div>
    </div>
  );
}

/*
/// If we need to fetch data in client component to use hooks and event listners:

"use client";

import { useEffect, useState } from "react";
import { MenuProps } from "../lib/types";

export default function ModernMenu() {
  /// fetch data
  /// here is a client component because of the existance of the hook,
  /// so we must use API route to fetch data.
  /// as we want to rerender the UI when data fetch, we use useEffect
  /// as the data fetching is a async/await process, so use async callback function in useEffect
  /// when using useEffect, we need to use useState to store the fetched date

  const [allFoods, setAllFoods] = useState<MenuProps[]>([]);
  const [selectedFood, setSelectedFood] = useState<MenuProps>(allFoods[0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/menu");
        /// Checks response status before parsing JSON
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const { foods } = await res.json();
        /// Stores fetched data
        setAllFoods(foods);
      } catch (error) {
        // log the error instead of throwing an error
        console.error("Error fetching foods:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>modern</div>
  );
}

*/
