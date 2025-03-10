///// TypeScript type definitions /////

export interface FoodCardProps {
  _id?: string; // MongoDB generates it automatically
  image?: string | File; // Can be either a URL string or a File object
  title?: string;
  description?: string;
  price?: number;
}

export type SideItemsProps = FoodCardProps

export type MenuProps = FoodCardProps

export interface UserType {email:string, password:string}