"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteFood } from "@/app/lib/actions";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFoodsContext } from "@/app/context/FoodsContext";

//// CREATE /////
/// transfering to the create page
export function CreateFood() {
  return (
    <Link
      href="/users/admin/foods/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Food</span>
      <CiCirclePlus className="h-5 md:ml-4" />
    </Link>
  );
}

//// UPDATE ////
/// transfering to the update page
export function UpdateFood({ id }: { id: string }) {
  return (
    <Link
      href={`/users/admin/foods/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

///// DELETE ////
/// the button and the handleDelete function is here
export function DeleteFood({ id }: { id: string }) {
  const router = useRouter();
  const {refetch} = useFoodsContext()

  async function handleDelete() {
    try {
      const result = await deleteFood(id);
      if (result.success) {
        toast.success(result.message);
        await refetch()
        router.refresh()
        router.push("/users/admin/foods");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the food.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}
