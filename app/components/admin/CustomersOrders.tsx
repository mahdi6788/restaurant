'use client'
import {
  OrderHistoryPropsType,
  OrderItemWithmenuItem,
} from "@/app/types/types";
import { OrdersSkeleton } from "../skeleton";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export default function CustomersOrders({
  orders: selectedOrders,
  selectedOrdersLoading,
}: OrderHistoryPropsType) {
  const translate =  useTranslations("CustomersOrders")
  const locale = useLocale()

  if (selectedOrdersLoading) return <OrdersSkeleton />;

  if (!selectedOrders || selectedOrders.length === 0) {
    return <div>{translate("No orders found")}</div>;
  }

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        {selectedOrders?.map((order) => (
          <div key={order.id} className="mb-2 rounded-lg bg-gray-50 dark:dark-mode p-1 sm:p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {translate("Customer name")}: {order.user.name}
              </h2>
              <h2 className="flex items-center text-lg font-semibold">
                <span>{translate("Order")}</span> :
                <span>{order.id.slice(0, 8)}</span>  -{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              <p className="text-sm ">
                {translate("Total")}: AED {order.total.toFixed(2)} | {translate("Status")}: {order.status} |
                {translate("Address")}: {order.address} | {translate("Phone")}: {order.phone}
              </p>
            </div>
            {/* Desktop Version */}
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
                </tr>
              </thead>
              <tbody className="">
                {order.items?.map((orderItem) => (
                  <tr
                    key={orderItem.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none"
                  >
                    <td>
                      <Image
                        alt={orderItem.menuItem?.englishName ?? "Menu Image"}
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
                      {locale === "fa" ? orderItem.menuItem?.farsiName : orderItem.menuItem?.englishName}
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
            <table className="table sm:hidden w-full max-w-[100%] table-fixed border-collapse border border-gray-300 mb-10">
              <thead className="rounded-lg text-left text-sm">
                <tr>
                  <th className="pl-1 py-1 border-2 font-medium">{translate("Name")}</th>
                  <th className="pl-1 py-1 border-2 font-medium text-center">{translate("Price")}</th>
                  <th className="pl-1 py-1 border-2 font-medium text-center w-[10%]">{translate("Qty")}</th>
                  <th className="pl-1 py-1 border-2 font-medium text-center">{translate("Date")}</th>
                  <th className="pl-1 py-1 border-2 font-medium text-center">{translate("Payment")}</th>
                </tr>
              </thead>
              <tbody className="">
                {order.items.map((orderItem: OrderItemWithmenuItem) => (
                  <tr
                    key={orderItem.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="flex items-center gap-1 whitespace-normal py-1 px-1">
                      {locale === "fa" ? orderItem.menuItem?.farsiName : orderItem.menuItem?.englishName}
                    </td>
                    <td className="whitespace-normal py-1 px-1 text-center">
                      AED {orderItem.price.toFixed(2)}
                    </td>
                    <td className="whitespace-normal py-1 px-1 text-center w-[10%]">
                      {orderItem.quantity}
                    </td>
                    <td className="whitespace-normal py-1 px-1 text-center">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-normal py-1 px-1 text-center">
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
