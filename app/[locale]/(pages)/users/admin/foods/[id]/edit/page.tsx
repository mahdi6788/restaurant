import EditForm from "@/app/[locale]/components/admin/EditForm";
import Breadcrumbs from "@/app/[locale]/components/Breadcrumbs";
import { getFoods } from "@/app/lib/foodActions";
import { ParamsType } from "@/app/types/types";
import { MenuItem } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function editFoodsForm({ params }: ParamsType) {
  /// await the dynamic API (params) to access its properties
  const { id } = params;

  const breadcrumbs = [
    { href: "/users/admin/foods", label: "Foods" },
    {
      href: `/users/admin/foods/${id}/edit`,
      label: "Edit food",
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
      {selectedFood ? <EditForm food={selectedFood} /> : <p>Food not found</p>}
    </main>
  );
}
