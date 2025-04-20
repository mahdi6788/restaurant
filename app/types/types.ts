import { MenuItem, Order, OrderItem } from "@prisma/client";


export type OrderItemWithmenuItem = OrderItem & { menuItem: MenuItem };
export type OrderWithItems = (Order & { items: OrderItemWithmenuItem[] })[];