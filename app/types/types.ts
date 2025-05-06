import { CartItem, MenuItem, Order, OrderItem, User } from "@prisma/client";

export type ParamsType = {
  params: { id: string };
};

export type CartItems = (CartItem & { menuItem: MenuItem })[];

export type OrderItemWithmenuItem = OrderItem & { menuItem: MenuItem };

export type OrderWithItems = (Order & { user: User } & {
  items: OrderItemWithmenuItem[];
})[];

export interface OrderHistoryPropsType {
  orders: OrderWithItems;
  selectedOrdersLoading: boolean;
}
