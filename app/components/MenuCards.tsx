"use client";
import Image from "next/image";
import { MenuItem } from "@prisma/client";
import { useOrderButton } from "@/hooks/useOrderButton";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { useLocale, useTranslations } from "next-intl";

const MenuCards = ({ food }: { food: MenuItem }) => {
  const translate = useTranslations("MenuCards")
  const { quantity, handleAdd, handleDec } = useOrderButton(food);
  const locale = useLocale()

  return (
    <div className="relative bg-stone-100 dark:dark-mode flex flex-col items-center p-2 rounded-2xl shadow-lg text-center h-96">
      {/* <div
        className={
          food.isAvailable
            ? "bg-green-400 text-yellow-300 rounded-lg mb-1 font-bold"
            : "hidden"
        }
      >
        <p>Today Special</p>
      </div> */}
      <div className="h-60 w-full relative rounded-xl overflow-hidden">
        <Image
          src={food.imageUrl as string}
          alt={food.englishName ?? ""}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h2 className="text-lg font-bold mt-3">{locale=== "fa" ? food.farsiName : food.englishName}</h2>
      <p className=" text-sm">{locale=== "fa" ? food.farsiDescription : food.englishDescription}</p>
      <div className="flex items-center justify-arround w-full">
        <p className="absolute left-0 bottom-0 font-semibold text-yellow-200 bg-blue-600 px-2 py-1 rounded-bl-2xl rounded-tr-3xl">
          AED {food.price}
        </p>
        {quantity > 0 ? (
          <div className="absolute right-0 bottom-0 font-semibold text-yellow-300 bg-blue-600 py-1 rounded-br-2xl rounded-tl-3xl">
            <div className="flex items-center justify-between px-1 w-full ">
              <CiCircleChevDown
                onClick={handleDec}
                className="w-7 h-7 hover:cursor-pointer text-orange-600"
              />
              <div className=" px-2">{quantity}</div>
              <CiCircleChevUp
                onClick={handleAdd}
                className="w-7 h-7 hover:cursor-pointer text-emerald-500 "
              />
            </div>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            disabled={!food.isAvailable}
            className="absolute right-0 bottom-0 font-semibold text-yellow-300 bg-blue-600 px-2 py-1 rounded-br-2xl rounded-tl-3xl"
          >
            {food.isAvailable ? (
              <p className="text-green-400">{translate("Order")}</p>
            ) : (
              <p className="text-orange-400">{translate("Not Now")}</p>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCards;
