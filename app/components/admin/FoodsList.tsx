"use client";

import { useFoodContext } from "@/app/context/FoodContext";
import { useFoodsContext } from "@/app/context/FoodsContext";
import { FALLBACK_IMAGE } from "@/app/lib/constants";
import { FoodCardProps } from "@/app/lib/types";
import { formatCurrency } from "@/app/lib/utils";
import { DeleteFood, UpdateFood } from "@/app/components/ui/buttons";
import Image from "next/image";

export default function FoodsList() {
  const { checkedFood, handleCheckbox } = useFoodContext();
  const { foods, loading } = useFoodsContext();

  if (loading) return <p>Loading...</p>;
  if (!foods.length) return <p>No foods available.</p>;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 sm:pt-0">
          {/* Mobile Version */}
          {/* pointing to hidden in small screen into the parent tag */}
          <div className="sm:hidden">
            {foods?.map((food: FoodCardProps) => (
              <div
                key={food._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="flex items-center mb-2 gap-">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckbox(e, food)}
                        checked={checkedFood.includes(food._id ?? "")}
                        className="size-4"
                      />
                      <Image
                        src={
                          typeof food.image === "string"
                            ? food.image
                            : FALLBACK_IMAGE
                        }
                        alt={food.title || "Food image"}
                        className="mr-2 rounded-full object-cover"
                        width={70}
                        height={70}
                      />
                      <p>{food.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{food.description}</p>
                  </div>
                  {/* food statuse may be needed in future */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(food.price || 0)}
                    </p>
                    {/* <p>{formatDateToLocal(food.date)} </p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateFood id={food?._id ?? ""} />
                    <DeleteFood id={food?._id ?? ""} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop Version */}
          {/* when pointing to hidden and sm:table in advance, no need to point the screen size for other tags  */}
          <table className="hidden min-w-full text-gray-900 sm:table">
            <thead className="rounded-lg text-left text-sm">
              <tr>
                <th className="pl-6 py-5 font-medium" scope="col">
                  Title
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  Description
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  Price
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {foods?.map((food: FoodCardProps) => (
                <tr
                  key={food._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-6 -ml-6 x">
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckbox(e, food)}
                          checked={checkedFood.includes(food._id ?? "")}
                          className="size-4"
                        />
                        <Image
                          alt={food.title || "Food image"}
                          src={
                            typeof food.image === "string"
                              ? food.image
                              : FALLBACK_IMAGE
                          }
                          className="rounded-full object-cover"
                          width={70}
                          height={70}
                        />
                      </div>
                      <p>{food.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    {food.description}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    {formatCurrency(food.price || 0)}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex justify-end gap-3">
                      <UpdateFood id={food._id ?? ""} />
                      <DeleteFood id={food._id ?? ""} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
