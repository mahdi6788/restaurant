"use client";
import OrderHistory from "@/app/components/customers/OrderHistory";
import { useOrders } from "@/app/context/OrderContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function OrderPage() {
  const {
    setCreatedAt,
    selectedOrders,
    selectedOrdersLoading,
  } = useOrders();

  const { data: session } = useSession();

   useEffect(()=>{
      setCreatedAt("All")
    })


  if (!session?.user?.id) {
    return <div>Please log in to view your order history.</div>;
  }

  return (
    <div className="container mx-auto ">
      <OrderHistory
        orders={selectedOrders}
        selectedOrdersLoading={selectedOrdersLoading}
      />
    </div>
  );
}
