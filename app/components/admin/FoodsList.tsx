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
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 sm:pt-0">
          {/* Mobile Version */}
          {/* pointing to hidden in small screen into the parent tag */}
          <div className="sm:hidden">
            {menu?.map((food: MenuItem) => (
              <div
                key={food.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="flex items-center mb-2 gap-1">
                      {/* Availibility */}
                      <div className="flex items-center justify-center gap-1 peer w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                        <label htmlFor={`availability-${food.id}`}>
                          Is Availabile?{" "}
                        </label>
                        <input
                          checked={food.isAvailable ?? false}
                          onChange={() => handleAvailibility(food)}
                          type="checkbox"
                          id={`availability-${food.id}`}
                          name="availability"
                        />
                      </div>
                      {/* Image */}
                      <Image
                        src={
                          typeof food.imageUrl === "string"
                            ? food.imageUrl
                            : "/public/images/logo/LOGO.jpg"
                        }
                        alt={food.name || "Food image"}
                        className="mr-2 rounded-full object-cover"
                        width={70}
                        height={70}
                      />
                      {/* Category */}
                      <p>{food.category}</p>
                      {/* Name */}
                      <p>{food.name}</p>
                    </div>
                    {/* Description */}
                    <p className="text-sm text-gray-500">{food.description}</p>
                  </div>
                </div>
                {/* Price */}
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(food.price || 0)}
                    </p>
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
                  {/* Availibility */}
                  <td>
                    <div className="flex items-center gap-6 -ml-6">
                      <div className="flex items-center justify-center gap-1 peer w-full rounded-md py-2 pl-10 text-sm outline-2 placeholder:text-gray-500">
                        <label htmlFor={`availabilityDesktop-${food.id}`}>
                          Is Availabile?
                        </label>
                        <input
                          checked={food.isAvailable ?? false}
                          onChange={() => handleAvailibility(food)}
                          type="checkbox"
                          id={`availabilityDesktop-${food.id}`}
                          name="availability"
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
                    <p>{food.category}</p>
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
