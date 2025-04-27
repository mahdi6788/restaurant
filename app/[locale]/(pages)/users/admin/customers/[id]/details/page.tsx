"use client";
import Loading from "@/app/components/loading";
import { useOrders } from "@/app/context/OrderContext";
import {
  OrderItemWithmenuItem,
  OrderWithItems,
  ParamsType,
} from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";

export default function Details({ params }: ParamsType) {
  const { search, setSearch, sortby, setSortby, setCreatedAt, createdAt } =
    useOrders();

  const { id } = params;
  const query = new URLSearchParams({
    id,
    search,
    sortby,
  }).toString();

  const fetchOrderFn = async () => {
    const res = await fetch(`/api/order?${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("There is no user");
    const orders = await res.json();
    return orders as OrderWithItems;
  };

  const { data: selectedOrders = [], isPending: selectedOrdersLoading } =
    useQuery({
      queryKey: ["orders", search, sortby, createdAt], // these are dependencies just like useEffect dep that update the UI when changing.
      queryFn: fetchOrderFn,
    });

  useEffect(() => {
    setCreatedAt("All");
  });

  const onlyOne = selectedOrders[0] as OrderWithItems[0];

  if (selectedOrdersLoading) return <Loading />;

  return (
    <div>
      {/* Search-Filter-Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by Menu item name or Order ID"
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
        {/* Filter */}
        {/* TODO: filter(payment, address) */}
      </div>
      <div className="mt-1 flow-root">
        <div className="inline-block min-w-full align-middle">
          {/* Customer Info Table */}
          <div>
            {/* Desktop */}
            <table className="hidden sm:table min-w-full text-gray-900">
              <thead className="text-left text-sm">
                <tr>
                  <th className="p-1" scope="col"></th>
                  <th className="p-1" scope="col">
                    Name
                  </th>
                  <th className="p-1" scope="col">
                    Address
                  </th>
                  <th className="p-1" scope="col">
                    Area
                  </th>
                  <th className="p-1" scope="col">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full py-3">
                  <td className="px-1 py-1 w-12">
                    <Image
                      alt={onlyOne?.user.name ?? "User picture"}
                      src={onlyOne?.user.image ?? "/images/elements/user.png"}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-1 py-1 border">{onlyOne?.user?.name}</td>
                  <td className="px-1 py-1 border">{onlyOne?.user?.address}</td>
                  <td className="px-1 py-1 border">
                    {onlyOne?.user.area ?? ""}
                  </td>
                  <td className="px-1 py-1 border">{onlyOne?.user?.balance}</td>
                </tr>
              </tbody>
            </table>
            {/* Mobile */}
            <div className="sm:hidden min-w-full text-gray-900">
              <Image
                alt={onlyOne?.user.name ?? "User picture"}
                src={onlyOne?.user.image ?? "/images/elements/user.png"}
                width={50}
                height={50}
                className="rounded-full"
              />

              <div className="flex items-center gap-2 px-1 py-1 border mt-1">
                <p className="font-bold">Name: </p>
                <p>{onlyOne?.user?.name}</p>
              </div>

              <div className="flex gap-2 px-1 py-1 border">
                <p className="font-bold">Address: </p>
                <p>{onlyOne?.user?.address}</p>
              </div>

              <div className="flex gap-2 px-1 py-1 border">
                <p className="font-bold">Area: </p>
                <p>{onlyOne?.user.area ?? ""}</p>
              </div>

              <div className="flex gap-2 px-1 py-1 border">
                <p className="font-bold">Balance: </p>
                <p>{onlyOne?.user?.balance}</p>
              </div>
            </div>
          </div>
          {/* Custoner orders Table */}
          {selectedOrders?.map((order) => (
            <div
              key={order.id}
              className="my-2 rounded-lg bg-gray-50 p-1 sm:p-4"
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Order #{order.id.slice(0, 8)} -{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </h2>
                <p className="text-sm text-gray-600">
                  Total: AED {order.total.toFixed(2)} | Status: {order.status} |
                  Address: {order.address} | Phone: {order.phone}
                </p>
              </div>
              {/* Desktop Version */}
              <table className="hidden sm:table min-w-full text-gray-900">
                <thead className="rounded-lg text-left text-sm">
                  <tr>
                    <th className="pl-6 py-5 font-medium">Image</th>
                    <th className="pl-6 py-5 font-medium">Name</th>
                    <th className="pl-6 py-5 font-medium">Price</th>
                    <th className="pl-6 py-5 font-medium">Quantity</th>
                    <th className="pl-6 py-5 font-medium">Order Date</th>
                    <th className="pl-6 py-5 font-medium">Payment Method</th>
                    <th className="pl-6 py-5 font-medium">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {order.items?.map((orderItem) => (
                    <tr
                      key={orderItem.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td>
                        <Image
                          alt={orderItem.menuItem?.name ?? "Menu Image"}
                          src={
                            orderItem.menuItem?.imageUrl ??
                            "/images/logo/LOGO.jpg"
                          }
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">
                        {orderItem.menuItem?.name}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">
                        {orderItem?.price}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">
                        {orderItem?.quantity}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">
                        {new Date(
                          orderItem.menuItem.updatedAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">Cash</td>
                      <td className="whitespace-nowrap py-3 px-3">Paid</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Table */}
              <table className="table sm:hidden min-w-full text-gray-900">
                <thead className="rounded-lg text-left text-sm">
                  <tr>
                    <th className="pl-1 py-1 border-2 font-medium">Name</th>
                    <th className="pl-1 py-1 border-2 font-medium">Price</th>
                    <th className="pl-1 py-1 border-2 font-medium">Qty</th>
                    <th className="pl-1 py-1 border-2 font-medium">Date</th>
                    <th className="pl-1 py-1 border-2 font-medium">Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {order.items.map((orderItem: OrderItemWithmenuItem) => (
                    <tr
                      key={orderItem.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="flex items-center gap-1 whitespace-nowrap py-1 px-1">
                        {orderItem.menuItem?.name}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        AED {orderItem.price.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        {orderItem.quantity}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        {order.status === "COMPLETED" ? "Paid" : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
