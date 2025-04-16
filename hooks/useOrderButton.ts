'use client'
import { MenuItem } from "@prisma/client";
import { useCart } from "./useCart";
import { useEffect, useState } from "react";

export function useOrderButton(food:MenuItem) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const item = cartItems.find((cartItem) => cartItem.menuItem.id === food.id);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(item?.quantity ?? 0);
  }, [item]);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({ menuItemId: food?.id, quantity: newQuantity });
  };

  const handleDec = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (newQuantity !== 0) {
      addToCart({ menuItemId: food?.id, quantity: newQuantity });
    }
    if (item && newQuantity === 0) removeFromCart(item?.id as string);
  };

  return {quantity, handleAdd, handleDec}
}
