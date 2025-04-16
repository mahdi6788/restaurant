/// TODO: grouped table displaying name of customer
/// TODO: search and filter options

import { prisma } from "@/app/lib/prisma";
import Image from "next/image";

export default async function CustomersList() {
  const allOrders = await prisma.order.findMany({
    where: { items: { some: {} } },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { menuItem: true } } },
  });
  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 sm:pt-0">
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
                <th className="pl-6 py-5 font-medium">Customer</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {allOrders?.map((order) =>
                order.items?.map((orderItem) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

///table : which menu? name, address, phone? status of payment?
