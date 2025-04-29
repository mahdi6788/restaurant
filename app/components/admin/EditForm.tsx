"use client";

import toast from "react-hot-toast";
import { Link } from "@/i18n/navigation";
import Button from "../ui/Button";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { MdDescription } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { editFood } from "@/app/lib/foodActions";
import { ImageUploader } from "./ImageUploader";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { MenuItem } from "@prisma/client";
import { useMenu } from "@/hooks/useMenu";
import { useTranslations } from "next-intl";

export default function EditForm({ food }: { food: MenuItem }) {
  const translate = useTranslations("EditForm");
  const { menuRefetch } = useMenu();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      if (!food.id) return;
      const { message, status } = await editFood({ formData, food });

      if (status === 200) {
        toast.success(message);
        // Force a client-side refresh before navigation
        router.refresh();
        router.push("/users/admin/foods");
        await menuRefetch();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the food.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4 relative">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose a Name
          </label>
          <input
            defaultValue={food.name}
            type="text"
            id="name"
            name="name"
            placeholder="Food Name"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <BiFoodMenu className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Description */}
        <div className="mb-4 relative">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            {translate("Description")}
          </label>
          <input
            defaultValue={food.description ?? ""}
            type="text"
            id="description"
            name="description"
            placeholder="Describe the food"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <MdDescription className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Price */}
        <div className="mb-4 relative">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            {translate("Price")}
          </label>
          <input
            defaultValue={food.price}
            type="number"
            id="price"
            name="price"
            placeholder="Enter AED amount"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Category */}
        <div className="mb-4 relative">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            {translate("Category")}
          </label>
          <select
            defaultValue={food.category}
            id="category"
            name="category"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="MainCourse">{translate("MainCourse")}</option>
            <option value="Appetizers">{translate("Appetizers")}</option>
            <option value="Drinks">{translate("Drinks")}</option>
          </select>
        </div>
        {/* Image */}
        <ImageUploader prevImage={food.imageUrl ?? ""} />
      </div>
      <div className="flex justify-end mt-6 gap-4 ">
        <Link
          href="/users/admin/foods"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {translate("Cancel")}
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? translate("Editing") : translate("Edit")}
        </Button>
      </div>
    </form>
  );
}
