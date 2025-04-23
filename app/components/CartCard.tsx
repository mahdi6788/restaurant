import { useCart } from "@/hooks/useCart";
import { useOrderButton } from "@/hooks/useOrderButton";
import { CartItem, MenuItem } from "@prisma/client";
import Image from "next/image";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

export function CartCard({
  item,
}: {
  item: CartItem & { menuItem: MenuItem };
}) {
  const { quantity, handleAdd, handleDec } = useOrderButton(item.menuItem);
  const { removeFromCart } = useCart();

  return (
    <>
      <div className="relative h-32 w-full overflow-hidden rounded-xl">
        <Image
          src={item?.menuItem.imageUrl as string}
          alt={item.menuItem.name || ""}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h2 className="text-sm font-semibold mt-1 text-blue-900 w-36">
        {item.menuItem.name ?? ""}
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1 ">
            AED {item?.menuItem.price?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center text-sm">
          <button
            onClick={() => removeFromCart(item?.id)}
            className="absolute bottom-0 left-0 w-full bg-black text-white hover:bg-gray-800 transition"
          >
            Remove from cart
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 right-4 ">
        <div className="flex items-center justify-between px-1 w-full ">
          <CiCircleChevDown
            onClick={handleDec}
            className="w-6 h-6 hover:cursor-pointer text-orange-600"
          />
          <div className=" px-2">{quantity}</div>
          <CiCircleChevUp
            onClick={handleAdd}
            className="w-6 h-6 hover:cursor-pointer text-emerald-500 "
          />
        </div>
      </div>
    </>
  );
}
