"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteFood } from "@/app/lib/foodActions";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMenu } from "@/hooks/useMenu";

//// CREATE /////
/// transfering to the create page
export function CreateFood() {
  return (
    <Link
      href="/users/admin/foods/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Menu</span>
      <CiCirclePlus size={20} className="md:ml-4" />
    </Link>
  );
}

//// UPDATE ////
/// transfering to the update page
export function UpdateFood({ id }: { id: string }) {
  return (
    <Link
      href={`/users/admin/foods/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-100"
    >
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" color="green"/>
    </Link>
  );
}

///// DELETE ////
/// the button and the handleDelete function is here
export function DeleteFood({ id }: { id: string }) {
  const router = useRouter();
  const { menuRefetch } = useMenu();

  async function handleDelete() {
    try {
      const { message, status } = await deleteFood(id);
      if (status === 200) {
        toast.success(message);
        await menuRefetch();
        router.refresh();
        router.push("/users/admin/foods");
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the food.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border p-2 hover:bg-red-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" color="red"/>
    </button>
  );
}
