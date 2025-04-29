"use client";
import { useOrders } from "@/app/context/OrderContext";
import CustomersOrders from "@/app/components/admin/CustomersOrders";
import { useEffect } from "react";
import { lusitana } from "@/app/lib/fonts";
import { useTranslations } from "next-intl";

export default function CustomersOrdersPage() {
  const translate = useTranslations("CustomersOrdersPage")
  const { setCreatedAt, selectedOrders, selectedOrdersLoading } = useOrders();

  useEffect(() => {
    setCreatedAt("All");
  });

  return (
    <div className="container mx-auto ">
      <h1
        className={`${lusitana.className} text-2xl font-bold text-orange-950`}
      >
        {translate("Orders History")}
      </h1>
      <CustomersOrders
        orders={selectedOrders}
        selectedOrdersLoading={selectedOrdersLoading}
      />
    </div>
  );
}
