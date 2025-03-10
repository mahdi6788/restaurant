import { getFoods } from "@/app/lib/data";
import EditForm from "@/app/components/admin/EditForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default async function editFoodsForm({
  params,
}: {
  params: { id: string };
}) {
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
  const { foods } = await getFoods();
  const selectedFood = foods.find((food) => food._id === id);

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {selectedFood ? <EditForm food={selectedFood} /> : <p>Food not found</p>}
    </main>
  );
}
