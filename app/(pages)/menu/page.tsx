"use client";

import { MenuItem } from "@prisma/client";
import MenuCards from "../../components/MenuCards";
import { useMenu } from "@/hooks/useMenu";
import Loading from "@/app/components/loading";

export default function Menu() {
  /// fetch foods using hook contaning use query
  const { menu, menuLoading } = useMenu();

  const mainCourse = menu?.filter((food:MenuItem) => food.category === "MainCourse");
  
  const appetizers = menu?.filter((food:MenuItem) => food.category === "Appetizers");

  if(menuLoading) return <Loading />

  return (
    <div className=" flex items-center justify-center bg-cover bg-center w-full max-w-screen-2xl mx-auto min-h-screen bg-[url('/images/BG/bg3.jpg')] pt-20">
      <div className="fixed z-0 inset-0 backdrop-blur-sm bg-black/20"></div>
      <div className="relative pb-10 px-1">
        {/* Menu */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {mainCourse.map((food:MenuItem) => (
              <MenuCards key={food?.id} food={food} />
            ))}
          </div>
        </section>
        {/* Appetizers */}
        <section className="my-20">
          <div className="flex flex-wrap gap-6 justify-center">
            {appetizers.map((item:MenuItem) => (
              <MenuCards key={item.id} food={item}/>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
