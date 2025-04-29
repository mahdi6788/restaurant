'use client'
import {
  OrderHistoryPropsType,
  OrderItemWithmenuItem,
} from "@/app/types/types";
import { OrdersSkeleton } from "../skeleton";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CustomersOrders({
  orders: selectedOrders,
  selectedOrdersLoading,
}: OrderHistoryPropsType) {
  const translate =  useTranslations("CustomersOrders")

  if (selectedOrdersLoading) return <OrdersSkeleton />;

  if (!selectedOrders || selectedOrders.length === 0) {
    return <div>{translate("No orders found")}</div>;
  }

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        {selectedOrders?.map((order) => (
          <div key={order.id} className="mb-2 rounded-lg bg-gray-50 p-1 sm:p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {translate("Customer name")}: {order.user.name}
              </h2>
              <h2 className="text-lg font-semibold">
                {translate("Order")} #{order.id.slice(0, 8)} -{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-600">
                {translate("Total")}: AED {order.total.toFixed(2)} | {translate("Status")}: {order.status} |
                {translate("Address")}: {order.address} | {translate("Phone")}: {order.phone}
              </p>
            </div>
            {/* Desktop Version */}
            <table className="hidden sm:table min-w-full text-gray-900">
              <thead className="rounded-lg text-left text-sm">
                <tr>
                  <th className="pl-6 py-5 font-medium">{translate("Image")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Name")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Price")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Quantity")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Order Date")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Payment Method")}</th>
                  <th className="pl-6 py-5 font-medium">{translate("Payment Status")}</th>
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
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Name")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Price")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Qty")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Date")}</th>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Payment")}</th>
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
  );
}
