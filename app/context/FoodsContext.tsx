"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FoodCardProps, SideItemsProps } from "../lib/types";

type FoodsContextType = {
  foods: FoodCardProps[];
  sideItems: SideItemsProps[];
  loading: boolean;
  refetch: () => Promise<void>;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export default function FoodsProvider({ children }: { children: ReactNode }) {
  const [foods, setFoods] = useState<FoodCardProps[]>([]);
  const [sideItems, setSideItems] = useState<SideItemsProps[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await fetch("/api/menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch food data");
      const data = await res.json();
      setFoods(data.foods);
      setSideItems(data.sideItems);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <FoodsContext.Provider
      value={{ foods, sideItems, loading, refetch: fetchFoods }}
    >
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoodsContext() {
  const context = useContext(FoodsContext);
  if (!context)
    throw new Error("useFoodContext must be used within a FoodProvider");
  return context;
}
