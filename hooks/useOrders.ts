"use client";
import { MenuItem, Order, OrderItem } from "@prisma/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

type OrderItemWithmenuItem = OrderItem & { menuItem: MenuItem };
type OrderWithItems = (Order & {items:OrderItemWithmenuItem[]})[];

const fetchOrderFn = async ():Promise<OrderWithItems> => {
  const res = await fetch("/api/order", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("There is not any order");
  const orders = await res.json();
  return orders as OrderWithItems;
};

const deleteOrderFn = async (orderItemId: string) => {
  await fetch("/api/order", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderItemId }),
  });
};

export function useOrders() {
  const queryClient = useQueryClient();
  
  /// Get orders
  const { data: allOrders = [], isPending: allOrdersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderFn,
  });

  /// Delete order
  const { mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderFn,
    mutationKey: ["orders"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      console.log("Error removing from cart: ", error);
      toast.error("Failed to remove order");
    },
  });

  return { allOrders, deleteOrder, allOrdersLoading };
}
