"use client";

import Image from "next/image";
import { FoodCardProps } from "../lib/types";
import { useFoodContext } from "../context/FoodContext";
import { useCartContext } from "../context/CartContext";

const MenuCards = ({ food }: { food: FoodCardProps }) => {
  const { checkedFood } = useFoodContext();
  const { addToCart } = useCartContext();
  return (
    <div className="relative bg-blue-300 opacity-85 flex flex-col items-center p-2 rounded-2xl shadow-lg text-center h-96">
      <div
        className={
          checkedFood.includes(food._id?.toString() ?? "")
            ? "bg-green-400 text-yellow-300  rounded-lg mb-1 font-bold"
            : "hidden"
        }
      >
        <p>Today Special</p>
      </div>
      <div className="w-40 h-40 md:w-36 md:h-36 relative rounded-full overflow-hidden">
        <Image
          src={food.image as string}
          alt={food.title ?? ""}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h2 className="text-lg font-bold mt-3">{food.title}</h2>
      <p className="text-gray-500 text-sm">{food.description}</p>
      <div className="flex items-center justify-arround w-full">
        <p className="absolute left-0 bottom-0 font-semibold text-yellow-300 bg-blue-600 px-4 py-1 rounded-bl-2xl rounded-tr-3xl">
          {food.price} AED
        </p>
        {/* <FaHeart className="absolute left-16 bottom-0 size-5 mt-3 ml-4 text-red-500" /> */}
        <button
          onClick={() => addToCart(food)}
          className="absolute right-0 bottom-0 font-semibold text-yellow-300 bg-blue-600 px-1 py-1 rounded-br-2xl rounded-tl-3xl"
        >
          <p>Add to Cart</p>
        </button>
      </div>
    </div>
  );
};

export default MenuCards;
