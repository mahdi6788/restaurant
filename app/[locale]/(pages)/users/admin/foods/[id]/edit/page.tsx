'use server'
import EditForm from "@/app/components/admin/EditForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getFoods } from "@/app/lib/foodActions";
import { ParamsType } from "@/app/types/types";
import { MenuItem } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function editFoodsForm({ params }: ParamsType) {
  /// await the dynamic API (params) to access its properties
  const translate = await getTranslations("editFoodsForm")
  const { id } = params;

  const breadcrumbs = [
    { href: "/users/admin/foods", label: translate("Foods") },
    {
      href: `/users/admin/foods/${id}/edit`,
      label: translate("Edit food"),
      active: true,
    },
  ];

  /// get foods
  const { foods, status } = await getFoods();
  if (status !== 200) {
    return notFound();
  }
  const selectedFood = foods?.find((food: MenuItem) => food.id === id);

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {selectedFood ? <EditForm food={selectedFood} /> : <p>{translate("Food not found")}</p>}
    </main>
  );
}
