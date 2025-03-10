import FoodsList from "@/app/components/admin/FoodsList";
import { CreateFood } from "@/app/components/ui/buttons";
import { lusitana } from "@/app/lib/fonts";
import { FoodsListSkeleton } from "@/app/components/skeleton";
import { Suspense } from "react";

export default function page(){
    return(
        <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Foods List</h1>
      </div>
      <div className="flex items-center justify-between mt-4 gap-2 md:mt-8">
        {/* Search */}
        <CreateFood />
      </div>
      <Suspense fallback={<FoodsListSkeleton />}>
        <FoodsList />
      </Suspense>
     {/* Pagination */}
    </div>
    )
}