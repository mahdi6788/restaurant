import Form from "@/app/components/admin/CreateForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function FoodsForm() {
  const breadcrumbs = [
    { href: "/users/admin/foods", label: "Foods" },
    {
      href: "/users/admin/foods/create",
      label: "Create food",
      active: true,
    },
  ];

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form />
    </main>
  );
}
