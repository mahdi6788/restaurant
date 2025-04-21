"use client";
import { useCart } from "@/hooks/useCart";
import { Order } from "@prisma/client";
import Image from "next/image";
import { OrdersSkeleton } from "../skeleton";
import {
  OrderHistoryPropsType,
  OrderItemWithmenuItem,
} from "@/app/types/types";
import { CiCirclePlus } from "react-icons/ci";

export default function OrderHistory({
  orders,
  selectedOrdersLoading,
}: OrderHistoryPropsType) {
  const { addToCart } = useCart();

  if (selectedOrdersLoading) return <OrdersSkeleton />;

  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block sm:min-w-full align-middle">
        {orders.map((order: Order & { items: OrderItemWithmenuItem[] }) => (
          <div key={order.id} className="mb-2 rounded-lg bg-gray-50 p-1 sm:p-4">
            {/* Order Header */}
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

            {/* Desktop Table */}
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
                {order.items.map((orderItem: OrderItemWithmenuItem) => (
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
                      AED {orderItem.price.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3">
                      {orderItem.quantity}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3">
                      {order.paymentId ? "Online" : "Cash"}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3">
                      {order.status === "COMPLETED" ? "Paid" : "Pending"}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3">
                      <button
                        disabled={!orderItem.menuItem.isAvailable}
                        className={`${!orderItem.menuItem.isAvailable ? "bg-red-300" : " bg-blue-300 "} p-2 rounded-md border border-b-blue-950 shadow-lg `}
                        onClick={() =>
                          addToCart({
                            menuItemId: orderItem.menuItemId,
                            quantity: 1,
                          })
                        }
                      >
                        {!orderItem.menuItem.isAvailable ? "Not Now" :"Re-order"}
                      </button>
                    </td>
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
                      <button
                        disabled={!orderItem.menuItem.isAvailable}
                        className=""
                        onClick={() =>
                          addToCart({
                            menuItemId: orderItem.menuItemId,
                            quantity: 1,
                          })
                        }
                      >
                        <CiCirclePlus size={20} color= {`${!orderItem.menuItem.isAvailable && "red"}`}/>
                      </button>
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
  );
}
