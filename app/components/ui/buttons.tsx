"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/navigation";
import { deleteFood } from "@/app/lib/foodActions";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { useMenu } from "@/hooks/useMenu";
import { useTranslations } from "next-intl";

//// CREATE /////
/// transfering to the create page
export function CreateFood() {
  const translate = useTranslations("CreateFood")
  return (
    <Link
      href="/users/admin/foods/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{translate("Create Menu")}</span>
      <CiCirclePlus size={20} className="md:ml-4" />
    </Link>
  );
}

//// UPDATE ////
/// transfering to the update page
export function UpdateFood({ id }: { id: string }) {
  const translate = useTranslations("UpdateFood")
  return (
    <Link
      href={`/users/admin/foods/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-100"
    >
      <span className="sr-only">{translate("Edit")}</span>
      <PencilIcon className="w-5" color="green" />
    </Link>
  );
}

///// DELETE ////
/// the button and the handleDelete function is here
export function DeleteFood({ id }: { id: string }) {
  const translate = useTranslations("DeleteFood")
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
      <span className="sr-only">{translate("Delete")}</span>
      <TrashIcon className="w-5" color="red" />
    </button>
  );
}
