import { useDebounce } from "use-debounce";
import { create } from "zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { OrderWithItems } from "../types/types";

interface OrderState {
  search: string;
  setSearch: (search: string) => void;
  sortby: string;
  setSortby: (sortby: string) => void;
  createdAt: string;
  setCreatedAt: (createdAt: string) => void
}

interface OrderHookReturn extends OrderState {
  selectedOrders: OrderWithItems, 
  selectedOrdersLoading: boolean
}

export const useOrderStore = create<OrderState>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  sortby: "createdAt-desc",
  setSortby: (sortby: string) => set({ sortby }),
  createdAt: "All",
  setCreatedAt: (createdAt: string) => set({ createdAt })
}));

export function useOrders():OrderHookReturn {
  const { search, setSearch, createdAt, setCreatedAt, sortby, setSortby } = useOrderStore();
  const queryClient = useQueryClient();
  const [debouncedSearch] = useDebounce(search, 300); // Debounce search input by 300ms
  // Get selected orders
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

  return { search, setSearch, createdAt, setCreatedAt, sortby, setSortby, selectedOrders, selectedOrdersLoading };
}
