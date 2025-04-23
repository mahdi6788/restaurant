"use client";
import CustomersOrders from "@/app/components/admin/CustomersOrders";
import OrderHistory from "@/app/components/customers/OrderHistory";
import { useOrders } from "@/app/context/OrderContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session } = useSession();

  const { setCreatedAt, selectedOrders, selectedOrdersLoading } = useOrders();

  useEffect(() => {
    setCreatedAt("today");
  });

  return (
    <div className="container mx-auto ">
      {session?.user.role === "ADMIN" ? (
        <CustomersOrders
          orders={selectedOrders}
          selectedOrdersLoading={selectedOrdersLoading}
        />
      ) : (
        <OrderHistory
          orders={selectedOrders}
          selectedOrdersLoading={selectedOrdersLoading}
        />
      )}
    </div>
  );
}
