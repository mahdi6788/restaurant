"use client";

import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils";
import { MenuItem } from "@prisma/client";
import { DeleteFood, UpdateFood } from "../ui/buttons";
import { FoodsListSkeleton } from "../skeleton";
import { useMenu } from "@/hooks/useMenu";

export default function FoodsList() {
  /// fetch foods using hook contaning use query
  const { menu, menuLoading, menuRefetch } = useMenu();

  /// use skeleton for loading time
  if (menuLoading) return <FoodsListSkeleton />;

  const handleAvailibility = async (food: MenuItem) => {
    const response = await fetch("/api/foods", {
      method: "PUT",
      body: JSON.stringify({ ...food, isAvailable: !food.isAvailable }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await menuRefetch(); // Refresh the context data after update
    } else {
      console.error("Failed to update availability");
    }
  };

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block sm:bg-stone-50 min-w-full align-middle">
        <div className="rounded-lg sm:p-2">
          {/* Mobile Version */}
          {/* pointing to hidden in small screen into the parent tag */}
          <div className="sm:hidden">
            {menu?.map((food: MenuItem) => (
              <div
                key={food.id}
                className="relative bg-stone-100 opacity-85 flex flex-col p-2 rounded-2xl shadow-lg h-96 my-2"
              >
                {/* Image */}
                <div className="h-60 w-full relative rounded-xl overflow-hidden">
                  <Image
                    src={food.imageUrl ?? "/public/images/logo/LOGO.jpg"}
                    alt={food.name || "Food image"}
                    layout="fill"
                    placeholder="empty"
                    objectFit="cover"
                  />
                </div>

                {/* Category / Name / Description */}
                <div className="space-y-1 flex flex-col items-start text-sm rounded-lg border border-gray-800 shadow-md shadow-gray-600 text-white bg-gray-800 p-1 mt-1 w-full">
                  <div
                    className={`${food.category === "MainCourse" ? "text-green-500" : "text-yellow-500"}`}
                  >
                    {food.category}
                  </div>
                  <h2 className="">{food.name}</h2>
                  <p className="w-full text-sm">{food.description}</p>
                </div>

                <p className="absolute left-0 bottom-0 font-semibold text-yellow-300 bg-blue-600 px-2 py-1 rounded-bl-2xl rounded-tr-3xl">
                  AED {food.price}
                </p>
                <div className="flex w-full items-center justify-end gap-2 p-1 ">
                  {/* Availability */}
                  <div className="flex items-center gap-1">
                    <label htmlFor={`availability-${food.id}`}>Available</label>
                    <input
                      checked={food.isAvailable ?? false}
                      onChange={() => handleAvailibility(food)}
                      type="checkbox"
                      id={`availability-${food.id}`}
                      name="availability"
                      className="size-4"
                    />
                  </div>
                  {/* Update/Delete */}
                  <div className="flex justify-end gap-2">
                    <UpdateFood id={food.id} />
                    <DeleteFood id={food.id} />
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
                  Availibility
                </th>
                <th>Image</th>
                <th className="pl-6 py-5 font-medium" scope="col">
                  Category
                </th>
                <th className="pl-3 py-5 font-medium" scope="col">
                  Name
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
              {menu?.map((food: MenuItem) => (
                <tr
                  key={food.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {/* Availability */}
                  <td>
                    <div className="flex items-center gap-6 -ml-6">
                      <div className="flex items-center justify-center gap-1 peer w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                        <label htmlFor={`availabilityDesktop-${food.id}`}>
                          Available
                        </label>
                        <input
                          checked={food.isAvailable ?? false}
                          onChange={() => handleAvailibility(food)}
                          type="checkbox"
                          id={`availabilityDesktop-${food.id}`}
                          name="availability"
                          className="size-4"
                        />
                      </div>
                    </div>
                  </td>
                  {/* Image */}
                  <td>
                    <Image
                      alt={food.name || "Food image"}
                      src={
                        typeof food.imageUrl === "string"
                          ? food.imageUrl
                          : "/public/images/logo/LOGO.jpg"
                      }
                      className="rounded-full object-cover"
                      width={70}
                      height={70}
                    />
                  </td>
                  {/* Category */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div
                      className={`${food.category === "MainCourse" ? "text-green-500" : "text-yellow-500"}`}
                    >
                      {food.category}
                    </div>
                  </td>
                  {/* Name */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <p>{food.name}</p>
                  </td>
                  {/* Description */}
                  <td className="whitespace-nowrap py-3 px-3">
                    {food.description}
                  </td>
                  {/* Price */}
                  <td className="whitespace-nowrap py-3 px-3">
                    {formatCurrency(food.price || 0)}
                  </td>
                  {/* Update/Delete */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex justify-end gap-3">
                      <UpdateFood id={food.id} />
                      <DeleteFood id={food.id} />
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
