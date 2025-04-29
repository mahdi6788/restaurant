"use client";
import OrderHistory from "@/app/components/customers/OrderHistory";
import { useOrders } from "@/app/context/OrderContext";
import { lusitana } from "@/app/lib/fonts";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function OrderPage() {
  const translate = useTranslations("OrderPage")
  const { setCreatedAt, selectedOrders, selectedOrdersLoading } = useOrders();

  const { data: session } = useSession();

  useEffect(() => {
    setCreatedAt("All");
  });

  if (!session?.user?.id) {
    return <div>{translate("Please log in to view your order history")}</div>;
  }

  return (
    <div className="container mx-auto ">
      <h1
        className={`${lusitana.className} text-2xl font-bold text-orange-950`}
      >
        {translate("Orders History")}
      </h1>
      <OrderHistory
        orders={selectedOrders}
        selectedOrdersLoading={selectedOrdersLoading}
      />
    </div>
  );
}
