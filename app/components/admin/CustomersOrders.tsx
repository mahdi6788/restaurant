import { OrderHistoryPropsType } from "@/app/types/types";
import { OrdersSkeleton } from "../skeleton";
import Image from "next/image";

export default function CustomersOrders({
  orders: selectedOrders,
  selectedOrdersLoading,
}: OrderHistoryPropsType) {
  if (selectedOrdersLoading) return <OrdersSkeleton />;
  
  if (!selectedOrders || selectedOrders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        {selectedOrders?.map((order) => (
          <div key={order.id} className="mb-2 rounded-lg bg-gray-50 p-1 sm:p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                Customer name: {order.user.name}
              </h2>
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
          </div>
        ))}
      </div>
    </div>
  );
}
