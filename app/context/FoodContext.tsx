"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FoodCardProps } from "../lib/types";

interface FoodContextType {
  checkedFood: string[];
  handleCheckbox: (
    e: React.ChangeEvent<HTMLInputElement>,
    food: FoodCardProps
  ) => void;
}

// Create the context
const FoodContext = createContext<FoodContextType | undefined>(undefined);

// Provider component
export function FoodProvider({ children }: { children: ReactNode }) {
  const [checkedFood, setCheckedFood] = useState<string[]>([]);

  useEffect(() => {
    setCheckedFood(JSON.parse(localStorage.getItem("checkedFoods") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedFoods", JSON.stringify(checkedFood));
  }, [checkedFood]);

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    food: FoodCardProps
  ) => {
    if (!food?._id?.toString()) return; /// ensures _id is never undefined when modifying checkedFood.

    setCheckedFood((prev) => {
      if (e.target.checked) {
        return [...prev, food._id?.toString() ?? ""];
      } else {
        return prev.filter((id) => id !== food._id?.toString()); /// remove from the array
      }
    });
  };

  return (
    <FoodContext.Provider value={{ checkedFood, handleCheckbox }}>
      {children}
    </FoodContext.Provider>
  );
}

/// custom hook for easier usage
export function useFoodContext() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
}
