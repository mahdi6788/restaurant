"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import { OrderWithItems } from "../types/types";


interface OrderContextType {
  search: string;
  setSearch: (search: string) => void;
  sortby: string;
  setSortby: (sortby: string) => void;
  createdAt: string;
  setCreatedAt: (createdAt: string) => void;
  selectedOrders: OrderWithItems;
  selectedOrdersLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export default function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300); // Debounce search input by 300ms
  const [sortby, setSortby] = useState<string>("createdAt-desc");
  const [createdAt, setCreatedAt] = useState("All");

  const queryClient = useQueryClient();

  /// Get selected orders
  const fetchOrderFn = async () => {
    const query = new URLSearchParams({
      search: debouncedSearch,
      sortby,
      createdAt,
    }).toString();

    const res = await fetch(`/api/order?${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("There is not any order");
    const orders = await res.json();
    return orders;
  };

  const { data: selectedOrders = [], isPending: selectedOrdersLoading } =
    useQuery({
      queryKey: ["orders", debouncedSearch, sortby, createdAt], // these are dependencies just like useEffect dep that update the UI when changing.
      queryFn: fetchOrderFn,
    });

  /// DELETE
  const deleteOrderFn = async (orderItemId: string) => {
    await fetch("/api/order", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderItemId }),
    });
  };

  /// Delete order
  useMutation({
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

  return (
    <OrderContext.Provider
      value={{
        search,
        setSearch,
        sortby,
        setSortby,
        createdAt,
        setCreatedAt,
        selectedOrders,
        selectedOrdersLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrder must be used within an OrderProvider");
  return context;
}
