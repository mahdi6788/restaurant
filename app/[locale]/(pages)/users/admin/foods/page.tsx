'use server'
import FoodsList from "@/app/components/admin/FoodsList";
import { CreateFood } from "@/app/components/ui/buttons";
import { lusitana } from "@/app/lib/fonts";
import { getTranslations } from "next-intl/server";

export default async function updateMenuPage() {
  const translate = await getTranslations("updateMenuPage")
  return (
    <div className="w-full mt-1 sm:mt-16 ">
      <div className="flex items-center justify-between gap-2">
        <h1
          className={`${lusitana.className} text-2xl font-bold text-orange-950`}
        >
          {translate("Menu Items")}
        </h1>
        {/* TODO: Add Search, Filter and Sort */}
        <CreateFood />
      </div>
      <FoodsList />
    </div>
  );
}
