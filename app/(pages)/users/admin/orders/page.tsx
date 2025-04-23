"use client";
import { useOrders } from "@/app/context/OrderContext";
import CustomersOrders from "@/app/components/admin/CustomersOrders";
import { useEffect } from "react";

export default function CustomersOrdersPage() {
  const {
    setCreatedAt,
    selectedOrders,
    selectedOrdersLoading,
  } = useOrders();

  useEffect(() => {
    setCreatedAt("All");
  });

  return (
    <div className="container mx-auto ">
      <CustomersOrders
        orders={selectedOrders}
        selectedOrdersLoading={selectedOrdersLoading}
      />
    </div>
  );
}
