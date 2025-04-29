"use client";

import Image from "next/image";
import { MenuItem } from "@prisma/client";
import { CiCircleChevUp, CiCircleChevDown } from "react-icons/ci";
import { useOrderButton } from "@/hooks/useOrderButton";
import { useTranslations } from "next-intl";

export default function FoodCard({ food }: { food: MenuItem }) {
  const translate = useTranslations("FoodCard")
  const {quantity, handleAdd, handleDec} = useOrderButton(food)

  return (
    <div className="relative max-w-sm w-2/3 p-5 pb-1 bg-stone-50 dark:bg-stone-400 dark:text-stone-100 rounded-3xl shadow-lg ">
      <div className="relative h-60 w-full overflow-hidden rounded-xl">
        <Image
          src={food.imageUrl as string}
          alt={food.name || ""}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h2 className="text-lg font-semibold mt-4">{food.name}</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm w-36">{food.description}</p>
          <p className="text-yellow-900 dark:text-yellow-200  text-sm">AED {food.price?.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
          {quantity > 0 ? (
            <div className="absolute bottom-0 -right-8 mt-4 w-32 bg-black text-white py-2 rounded-t-2xl rounded-br-2xl ">
              <div className="flex items-center justify-between px-2 ">
                <div className="flex items-center justify-between w-full mr-5 ">
                  <CiCircleChevDown
                    onClick={handleDec}
                    className="w-7 h-7 hover:cursor-pointer text-orange-600"
                  />
                  <CiCircleChevUp
                    onClick={handleAdd}
                    className="w-7 h-7 hover:cursor-pointer text-emerald-500 "
                  />
                </div>
                <div className=" px-2">{quantity}</div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!food.isAvailable}
              className="absolute bottom-0 -right-8 mt-4 w-32 bg-black text-white py-2 rounded-t-2xl rounded-br-2xl hover:bg-gray-800 transition "
            >
              <p> {translate("Order now")} </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
