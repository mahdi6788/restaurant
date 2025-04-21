"use client";
import OrderHistory from "@/app/components/customers/OrderHistory";
import { useOrders } from "@/app/context/OrderContext";
import { lusitana } from "@/app/lib/fonts";
import { useSession } from "next-auth/react";

export default function OrderPage() {
  const {
    search,
    setSearch,
    sortby,
    setSortby,
    selectedOrders,
    selectedOrdersLoading,
  } = useOrders();
  
  const {data: session} = useSession()

  if (!session?.user?.id) {
    return <div>Please log in to view your order history.</div>;
  }

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <h1
          className={`${lusitana.className} text-2xl font-bold text-orange-950`}
        >
          Order History
        </h1>
        {/* Search */}
        <input
          type="text"
          placeholder="Search by menu item name or order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 rounded-lg "
        />
        {/* Sort */}
        <div>
          Sort by
          <select
            className="rounded-lg p-2 ml-2 w-full sm:w-fit"
            name="sortby"
            id="sortby"
            value={sortby}
            onChange={(e) => setSortby(e?.target?.value)}
          >
            <option value="createdAt-desc">Order Date: Newest First</option>
            <option value="createdAt-asc">Order Date: Oldest First</option>
          </select>
        </div>
      </div>
      <OrderHistory
        orders={selectedOrders}
        selectedOrdersLoading={selectedOrdersLoading}
      />
    </div>
  );
}
