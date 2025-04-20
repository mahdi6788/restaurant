"use client";

import { AddToCartInput } from "@/app/lib/zod";
import { CartItem, MenuItem } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/// Fetch cart function
export type CartItems = (CartItem & { menuItem: MenuItem })[]

const fetchCartFn = async (): Promise<CartItems> => {
  const res = await fetch("/api/cart", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  const cart = await res.json();
  return cart.items as CartItems;
};
/// Add to cart function
const addToCartFn = async ({ menuItemId, quantity }: AddToCartInput) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "aplication/json" },
    body: JSON.stringify({ menuItemId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};
/// remove item from cart function
const removeFromCartFn = async (cartItemId: string) => {
  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId }),
    });
    if (!res.ok) throw new Error("Failed to remove from cart");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
/// Clear cart function
const clearCartFn = async () => {
  try {
    const res = await fetch("/api/cart/clearCart", {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to clear cart");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};


/// useQuery & useMutation

export function useCart() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /// GET
  const {
    data: cartItems = [],
    isLoading: cartItemsLoading,
    error: cartItemsError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartFn,
  });

  /// ADD
  const {
    mutate: addToCart,
    isPending: addToCartPending,
    error: addToCartError,
  } = useMutation({
    mutationFn: addToCartFn,
    onSuccess: () => {
      // invalidate cart query to refetch
      toast.success("Item add to cart successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error adding to cart: ", error);
      toast.error("Failed to add to cart");
    },
  });

  /// REMOVE
  const {
    mutate: removeFromCart,
    isPending: removeFromCartPending,
    error: removeFromCartError,
  } = useMutation({
    mutationFn: removeFromCartFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart successfully");
    },
    onError: (error) => {
      console.log("Error removing from cart: ", error);
      toast.error("Failed to remove from cart");
    },
  });

  /// CLEAR
  const {
    mutate: clearCart,
    isPending: clearCartPending,
    error: clearCartError,
  } = useMutation({
    mutationFn: clearCartFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared successfully");
      router.push("/");
    },
    onError: (error) => {
      console.log("Error clearing the cart: ", error);
      toast.error("Failed to clear the cart");
    },
  });

  return {
    cartItems,
    cartItemsLoading,
    cartItemsError,
    addToCart,
    addToCartPending,
    addToCartError,
    removeFromCart,
    removeFromCartPending,
    removeFromCartError,
    clearCart,
    clearCartPending,
    clearCartError,
  };
}
