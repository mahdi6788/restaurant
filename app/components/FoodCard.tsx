import Image from "next/image";
import { FoodCardProps } from "../lib/types";
import { useCartContext } from "../context/CartContext";

const FoodCard = ({ food }: { food: FoodCardProps }) => {
  const { addToCart } = useCartContext();

  return (
    <div className="relative max-w-sm w-2/3 p-5 bg-white rounded-3xl shadow-lg ">
      <div className="relative h-60 w-full overflow-hidden rounded-xl">
        <Image
          src={food.image as string}
          alt={food.title || ""}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h2 className="text-lg font-semibold mt-4">{food.title}</h2>
      {/* <p className="text-gray-500 text-sm mt-2">{description}</p> */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold">Price</p>
          <p className="text-gray-500 text-sm">$ {food.price?.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
          {/* <FaHeart className="absolute right-32 size-6 mt-4" /> */}
          <button
            onClick={() => addToCart(food)}
            className="absolute -right-6 mt-4 w-32 bg-black text-white py-2 rounded-t-2xl rounded-br-2xl hover:bg-gray-800 transition "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
