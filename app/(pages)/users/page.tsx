"use client";
import CustomersOrders from "@/app/components/admin/CustomersOrders";
import OrderHistory from "@/app/components/customers/OrderHistory";
import { useOrders } from "@/app/context/OrderContext";
import { lusitana } from "@/app/lib/fonts";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session } = useSession();

  const {
    search,
    setSearch,
    sortby,
    setSortby,
    setCreatedAt,
    selectedOrders,
    selectedOrdersLoading,
  } = useOrders();

  useEffect(()=>{
    setCreatedAt("today")
  })

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
          placeholder="Search by name or order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-2 rounded-lg "
        />
        {/* Sort */}
        <div>
          Sort by
          <select
            className="rounded-lg p-2 ml-2 w-full sm:w-fit"
            name="sortby"
            id="sortby"
            value={sortby}
            onChange={(e) => setSortby(e.target.value)}
          >
            <option value="createdAt-desc">Order Date: Newest First</option>
            <option value="createdAt-asc">Order Date: Oldest First</option>
          </select>
        </div>
        {/* <input hidden value={createdAt} readOnly/> */}
      </div>
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
