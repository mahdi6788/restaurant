import { prisma } from "./prisma";

export async function createOrder({
  phone,
  address,
  total,
  userId,
  paymentMethod,
  status
}: {
  phone: string;
  address: string;
  total: number;
  userId: string;
  paymentMethod: "COD" | "ONLINE",
  status:"PENDING" | "COMPLETED"
}) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { menuItem: true } } },
    });

    if (!cart || cart.items.length === 0) return "Cart is empty";

    /// if the cart exists, convert cart to order
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        phone,
        total,
        status,
        paymentMethod,
        items: {
          create: cart.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.menuItem.price,
          })),
        },
      },
      include: { items: { include: { menuItem: true } } },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
  return "Internal server error";
}
