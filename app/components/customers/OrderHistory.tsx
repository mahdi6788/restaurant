"use client";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { MenuItem, Order, OrderItem } from "@prisma/client";
import Image from "next/image";
import { OrdersSkeleton } from "../skeleton";

type OrderItemWithmenuItem = OrderItem & { menuItem: MenuItem };
type OrderWithItems = (Order & { items: OrderItemWithmenuItem[] })[];

export default function OrderHistory() {
  const { addToCart } = useCart();
  const {
    allOrders,
    allOrdersLoading,
  }: { allOrders: OrderWithItems; allOrdersLoading: boolean } = useOrders();
  
  if (allOrdersLoading) return <OrdersSkeleton />;

  if (!allOrders || allOrders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-0 sm:px-2 sm:pt-0">
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
                <th className="pl-6 py-5 font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {allOrders?.map(
                (order: Order & { items: OrderItemWithmenuItem[] }) =>
                  order.items?.map((orderItem: OrderItemWithmenuItem) => (
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
                        AED {orderItem?.price}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">
                        {orderItem?.quantity}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">
                        {new Date(orderItem.menuItem.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap py-3 px-3">Cash</td>
                      <td className="whitespace-nowrap py-3 px-3">Paid</td>
                      <td className="whitespace-nowrap py-3 px-3">
                        <button
                          className="p-2 bg-blue-300 rounded-md border border-b-blue-950 shadow-lg"
                          onClick={() =>
                            addToCart({
                              menuItemId: orderItem.menuItemId,
                              quantity: 1,
                            })
                          }
                        >
                          Re-order
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          {/* Mobile Version */}
          <table className="table sm:hidden min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm">
              <tr>
                <th className="pl-1 py-1 border-2 font-medium">Name</th>
                <th className="pl-1 py-1 border-2 font-medium">Price</th>
                <th className="pl-1 py-1 border-2 font-medium">Qty</th>
                <th className="pl-1 py-1 border-2 font-medium">Date</th>
                <th className="pl-1 py-1 border-2 font-medium">Payment </th>
                <th className="pl-1 py-1 border-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {allOrders?.map(
                (order: Order & { items: OrderItemWithmenuItem[] }) =>
                  order.items?.map((orderItem: OrderItemWithmenuItem) => (
                    <tr
                      key={orderItem.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                     
                      <td className="whitespace-nowrap py-1 px-1">
                        {orderItem.menuItem?.name}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        {orderItem?.price}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        {orderItem?.quantity}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">
                        {new Date(orderItem.menuItem.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap py-1 px-1">Paid</td>
                      <td className="whitespace-nowrap py-1 px-1">
                        <button
                          className="p-2 bg-blue-300 rounded-md border border-b-blue-950 shadow-lg"
                          onClick={() =>
                            addToCart({
                              menuItemId: orderItem.menuItemId,
                              quantity: 1,
                            })
                          }
                        >
                          Re-order
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
