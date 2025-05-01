"use client";

import { Link } from "@/i18n/navigation";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { MdCategory, MdDescription } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { createFood } from "@/app/lib/foodActions";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { useMenu } from "@/hooks/useMenu";
import { useTranslations } from "next-intl";

export default function Form() {
  const translate = useTranslations("Form");
  const router = useRouter();
  const { menuRefetch } = useMenu();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      const { message, status } = await createFood(formData);
      if (status === 201) {
        toast.success(message);
        router.refresh();
        router.push("/users/admin/foods");
        await menuRefetch();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the food!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreate} className="rounded-lg bg-slate-100 dark:dark-mode p-2">
      <div className="mb-6 p-4 sm:p-6 sm:mb-1">
        {/* Farsi Name */}
        <div className="mb-4 relative">
          <label htmlFor="farsiName" className="mb-2 block text-sm font-medium">
            {translate("Farsi Name")}
          </label>
          <input
            required
            type="text"
            id="farsiName"
            name="farsiName"
            placeholder="Food Name in Farsi"
            aria-describedby="name-error"
            className="text-blue-950 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 "
          />
          <BiFoodMenu className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900 text-blue-950" />
        </div>
        {/* Farsi Description */}
        <div className="mb-4 relative">
          <label
            htmlFor="farsiDescription"
            className="mb-2 block text-sm font-medium"
          >
            {translate("Farsi Description")}
          </label>
          <input
            type="text"
            id="farsiDescription"
            name="farsiDescription"
            placeholder="Describe the food in Farsi"
            className="text-blue-950 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 "
          />
          <MdDescription className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 text-blue-950" />
        </div>

        {/* English Name */}
        <div className="mb-4 relative">
          <label htmlFor="englishName" className="mb-2 block text-sm font-medium">
            {translate("English Name")}
          </label>
          <input
            required
            type="text"
            id="englishName"
            name="englishName"
            placeholder="Food Name in English"
            aria-describedby="name-error"
            className="text-blue-950 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 "
          />
          <BiFoodMenu className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900 text-blue-950" />
        </div>
        {/* English Description */}
        <div className="mb-4 relative">
          <label
            htmlFor="englishDescription"
            className="mb-2 block text-sm font-medium"
          >
            {translate("English Description")}
          </label>
          <input
            type="text"
            id="englishDescription"
            name="englishDescription"
            placeholder="Describe the food in English"
            className="text-blue-950 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 "
          />
          <MdDescription className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900 text-blue-950" />
        </div>
        {/* Price */}
        <div className="mb-4 relative">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            {translate("Price")}
          </label>
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Enter AED amount"
            className="text-blue-950 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 "
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-900 text-blue-950" />
        </div>
        {/* Category */}
        <div className="mb-4 relative">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            {translate("Category")}
          </label>
          <select
            id="category"
            name="category"
            className="text-blue-950 peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 "
          >
            <option value="MainCourse">{translate("MainCourse")}</option>
            <option value="Appetizers">{translate("Appetizers")}</option>
            <option value="Drink">{translate("Drink")}</option>
          </select>
          <MdCategory className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2  text-blue-950" />
        </div>
        {/* Image */}
        <ImageUploader prevImage="" />

        {/* buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/users/admin/foods"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            {translate("Cancel")}
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? translate("Creating") : translate("Create")}
          </Button>
        </div>
      </div>
    </form>
  );
}
