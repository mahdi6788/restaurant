import { MenuItem, Order, OrderItem, User } from "@prisma/client";

export type ParamsType = {
  params: { id: string };
};

export type OrderItemWithmenuItem = OrderItem & { menuItem: MenuItem };

export type OrderWithItems = (Order & { user: User } & {
  items: OrderItemWithmenuItem[];
})[];

export interface OrderHistoryPropsType {
  orders: OrderWithItems;
  selectedOrdersLoading: boolean;
}
