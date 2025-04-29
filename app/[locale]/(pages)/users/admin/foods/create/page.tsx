"use server";
import Form from "@/app/components/admin/CreateForm";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getTranslations } from "next-intl/server";

export default async function FoodsForm() {
  const translate = await getTranslations("FoodsForm");
  const breadcrumbs = [
    { href: "/users/admin/foods", label: translate("Menu") },
    {
      href: "/users/admin/foods/create",
      label: translate("Create Menu"),
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
