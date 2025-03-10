"use client";

import Image from "next/image";
import { useCartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, clearCart, removeFromCart } = useCartContext();
  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className="bg-slate-950">
      {cart.map((item) => (
        <div key={item._id} className="relative max-w-sm w-2/3 p-5 bg-gray-300 rounded-3xl shadow-lg mb-2">
          <div className="relative h-60 w-full overflow-hidden rounded-xl">
            <Image
              src={item.image as string}
              alt={item.title || ""}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <h2 className="text-lg font-semibold mt-4">{item.title}</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">Price</p>
              <p className="text-gray-500 text-sm">
                $ {item.price?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => removeFromCart(item._id ?? "")}
                className="absolute -right-6 mt-4 w-32 bg-black text-white py-2 rounded-t-2xl rounded-br-2xl hover:bg-gray-800 transition "
              >
                Remove from cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          >
            Clear Cart
          </button>
    </div>
  );
}
