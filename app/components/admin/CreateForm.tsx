"use client";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { MdDescription } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { createFood } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImageUploader } from "@/app/components/admin/ImageUploader";
import { useFoodsContext } from "@/app/context/FoodsContext";
import { useState } from "react";

export default function Form() {
  const router = useRouter();
  const { refetch } = useFoodsContext();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await createFood(formData);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
        router.push("/users/admin/foods");
        await refetch();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while editing the food!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleCreate}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4 relative">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Choose a Name
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            placeholder="Food Name"
            aria-describedby="title-error"
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
            Description
          </label>
          <input
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
            Price
          </label>
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Enter AED amount"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Image */}
        <ImageUploader />
      </div>
      {/* buttons */}
      <div className="flex justify-end mt-6 gap-4">
        <Link
          href="/users/admin/foods"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
}
