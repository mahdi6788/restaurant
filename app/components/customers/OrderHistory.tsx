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
import { useTranslations } from "next-intl";

export default function OrderHistory({
  orders,
  selectedOrdersLoading,
}: OrderHistoryPropsType) {
  const translate = useTranslations("OrderHistory")
  const { addToCart } = useCart();

  if (selectedOrdersLoading) return <OrdersSkeleton />;

  if (!orders || orders.length === 0) {
    return <div>{translate("No orders found")}</div>;
  }
  
  const total = orders.reduce((sum,item) => sum + item.total, 0)

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block sm:min-w-full align-middle">
        <div className="text-lg font-semibold">
        {translate("Total")}: <span>AED {total}</span>
        </div>
        {orders.map((order: Order & { items: OrderItemWithmenuItem[] }) => (
          <div key={order.id} className="mb-2 rounded-lg bg-gray-50 dark:dark-mode p-1 sm:p-4">
            {/* Order Header */}
            <div className="mb-4">
              <h2 className="flex items-center text-lg font-semibold">
                <span>{translate("Order")}</span> :
                <span>{order.id.slice(0, 8)}</span>  -{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              <p className="text-sm">
                {translate("Total")}: AED {order.total.toFixed(2)} | {translate("Status")}: {order.status} |
                {translate("Address")}: {order.address} | {translate("Phone")}: {order.phone}
              </p>
            </div>

            {/* Desktop Table */}
            <table className="hidden sm:table">
              <thead className="rounded-lg text-left text-sm">
                <tr>
                  <th className="pl-6 py-5 font-medium">{translate("Image")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Name")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Price")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Quantity")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Order Date")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Payment Method")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Payment Status")}</th>
                  <th className="pl-6 py-5 font-medium"></th>
                </tr>
              </thead>
              <tbody className="">
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
                        className={`${!orderItem.menuItem.isAvailable ? "bg-red-400" : " bg-blue-400 "} p-2 rounded-md border shadow-lg `}
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
            <table className="table sm:hidden">
              <thead className="rounded-lg text-left text-sm">
                <tr>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Name")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Price")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Qty")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Date")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Payment")}</th>
                </tr>
              </thead>
              <tbody className="">
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
