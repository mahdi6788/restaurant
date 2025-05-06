"use client";
import CustomersOrders from "@/app/components/admin/CustomersOrders";
import OrderHistory from "@/app/components/customers/OrderHistory";
import { useOrders } from "@/app/store/orderStore";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HomePage() {
  const translate = useTranslations("HomePage");
  const { data: session } = useSession();

  const { setCreatedAt, selectedOrders, selectedOrdersLoading } = useOrders();

  useEffect(() => {
    setCreatedAt("today");
  },[]);

  return (
    <div className="container mx-auto mb-5">
      <h1
        className="text-2xl font-bold text-orange-500"
      >
        {translate("Today Orders")}
      </h1>
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
