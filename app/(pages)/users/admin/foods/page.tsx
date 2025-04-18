import FoodsList from "@/app/components/admin/FoodsList";
import { CreateFood } from "@/app/components/ui/buttons";
import { lusitana } from "@/app/lib/fonts";

export default function page() {
  return (
    <div className="w-full mt-16">
      <div className="flex items-center justify-between gap-2">
        <h1
          className={`${lusitana.className} text-2xl font-bold text-orange-950`}
        >
          MENU
        </h1>
        {/* TODO: Add Search, Filter and Sort */}
        <CreateFood />
      </div>
        <FoodsList />
    </div>
  );
}
