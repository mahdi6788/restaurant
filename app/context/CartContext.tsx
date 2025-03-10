"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FoodCardProps } from "../lib/types";

interface CartItem extends FoodCardProps {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (food: FoodCardProps) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (error) {
      console.error("Failed to parse cart from localStorage: ", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage: ", error);
    }
  }, [cart]);

  const addToCart = (food: FoodCardProps) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item?._id?.toString() === food._id?.toString()
      );
      if (existingItem) {
        return prev.map((item) =>
          item?._id?.toString() === food._id?.toString()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item?._id?.toString() !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext should be used within a CartProvider");
  return context;
}
