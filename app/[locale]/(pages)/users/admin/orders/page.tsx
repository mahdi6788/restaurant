"use client";
import { useOrders } from "@/app/context/OrderContext";
import CustomersOrders from "@/app/[locale]/components/admin/CustomersOrders";
import { useEffect } from "react";
import { lusitana } from "@/app/lib/fonts";

export default function CustomersOrdersPage() {
  const { setCreatedAt, selectedOrders, selectedOrdersLoading } = useOrders();

  useEffect(() => {
    setCreatedAt("All");
  });

  return (
    <div className="container mx-auto ">
      <h1
        className={`${lusitana.className} text-2xl font-bold text-orange-950`}
      >
        Orders History
      </h1>
      <CustomersOrders
        orders={selectedOrders}
        selectedOrdersLoading={selectedOrdersLoading}
      />
    </div>
  );
}
