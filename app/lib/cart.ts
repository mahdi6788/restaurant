import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getOrCreateCart(userId?: string) {
  let cart;
  /// If a `userId` is provided, find a cart associated with the user.
  if (userId) {
    cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { menuItem: true } } },
    });
    /// If no cart exists, a new cart is created for the user.
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: { include: { menuItem: true } } },
      });
    }
  } else {
    /// If no `userId` is provided, checks for a guest cart using a `guestCartId` cookie.
    const guestCartId = cookies().get("guestCartId")?.value;
    if (guestCartId) {
      cart = await prisma.cart.findUnique({
        where: { id: guestCartId },
        include: { items: { include: { menuItem: true } } },
      });
    }
    /// If no guest cart exists, a new cart is created and the `guestCartId` cookie is set.
    if (!cart) {
      cart = await prisma.cart.create({
        data: {},
        include: { items: { include: { menuItem: true } } },
      });
      cookies().set("guestCartId", cart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
      });
    }
  }
  return cart;
}

export async function addToCart(
  userId?: string,
  item?: { menuItemId: string; quantity: number }
) {
  const cart = await getOrCreateCart(userId);
  const existingItem = cart.items.find((i) => i.menuItemId === item?.menuItemId);
  if (existingItem) {
    await prisma.cartItem.update({
        where: {id: existingItem.id},
        data: {quantity: item?.quantity}
    })
  } else{
    if (item?.menuItemId) {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                quantity: item.quantity || 1,
                menuItemId: item.menuItemId
            }
        });
    } else {
        throw new Error("menuItemId is required to add an item to the cart.");
    }
  }
}

export async function removeFromCart(userId?:string, cartItemId?:string){
  const cart = await getOrCreateCart(userId) 
  await prisma.cartItem.delete({
      where: {id:cartItemId, cartId: cart.id}
  })
}


export async function clearCart(userId?: string) {
  try {
    const cart = await getOrCreateCart(userId)
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id}
    })
    if (!userId) {
        await prisma.cart.delete({
          where: {id: cart.id}
        })
        cookies().delete('questCartId')
    }
  } catch (error) {
    console.log("Clear cart Error: ", error)
  }
}
