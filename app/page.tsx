"use client";

import FoodCard from "./components/FoodCard";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { FoodCardProps } from "./lib/types";
import { useFoodContext } from "./context/FoodContext";
import { useFoodsContext } from "./context/FoodsContext";
import { useCartContext } from "./context/CartContext";

export default function TodayFood() {
  const { checkedFood } = useFoodContext();

  const { cart } = useCartContext();

  const { foods, loading } = useFoodsContext();

  if (loading) return <p>Loading...</p>;
  // if (!foods.length) return <p>No foods available.</p>;

  const todayFoods = foods.filter((food) =>
    checkedFood.includes(food._id ?? "")
  );

  return (
    <div
      style={{ backgroundImage: "url('/images/bg3.jpeg')" }}
      className=" flex items-center justify-center bg-cover bg-center md:h-screen w-full max-w-screen-2xl mx-auto"
    >
      <div className=" w-3/4 pb-10 bg-emerald-600 opacity-75 rounded-xl ">
        <div className="flex items-center justify-between">
          <div className=" flex items-center justify-between gap-2 text-stone-100 font-bold bg-slate-600 w-fit h-fit p-2 rounded-br-lg rounded-tl-xl shadow-xl">
            <p className="hidden md:flex">Log In</p>
            <FaSignInAlt />
          </div>
          {/* when show login, cart is hidden */}
          <div className="hidden">
            <Link href="/cart" className="relative">
              🛒
              <span className="absolute top-0 right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            </Link>
          </div>
          <div className="text-stone-800 font-bold bg-slate-100 rounded-b-lg w-fitt h-fit p-2 px-10">
            <Link href="/menu">
              <p>Menu</p>
            </Link>
          </div>
          <div className="flex gap-2 items-center justify-between text-stone-100 font-bold bg-slate-600 w-fit h-fit p-2 rounded-bl-lg rounded-tr-xl shadow-xl">
            <p className="hidden md:flex">Sign up</p>
            <GiArchiveRegister />
          </div>
        </div>
        <div className=" mt-20">
          <p className="font-bold text-center mb-2 text-emerald-100">
            Special foods for today
          </p>
          <div
            className={
              todayFoods.length === 1
                ? "flex-1"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2"
            }
          >
            {todayFoods.map((todayFood: FoodCardProps) => (
              <div
                key={todayFood._id}
                className="flex flex-col items-center justify-center"
              >
                <FoodCard food={todayFood} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
