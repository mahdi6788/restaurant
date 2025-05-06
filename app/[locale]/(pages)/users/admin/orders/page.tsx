"use client";
import CustomersOrders from "@/app/components/admin/CustomersOrders";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useOrders } from "@/app/store/orderStore";

export default function CustomersOrdersPage() {
  const translate = useTranslations("CustomersOrdersPage")
  const { setCreatedAt, selectedOrders, selectedOrdersLoading } = useOrders();

  useEffect(() => {
    setCreatedAt("All");
  },[]);

  return (
    <div className="container mx-auto mb-5">
      <h1
        className="text-2xl font-bold text-orange-500`"
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
