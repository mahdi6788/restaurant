///// Server actions /////
"use server";

import { revalidatePath } from "next/cache";
import { uploadImage } from "./upload";
import { prisma } from "./prisma";
import { MenuSchema } from "./zod";
import { MenuItem } from "@prisma/client";

//// GET FOODS ////
export async function getFoods(): Promise<{
  foods?: MenuItem[];
  message: string;
  status: number;
}> {
  try {
    const foods = await prisma.menuItem.findMany();
    return {
      foods,
      message: "Foods fetched successfully",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to get Foods", status: 500 };
  }
}

//// CREATE ////
export async function createFood(
  formData: FormData
): Promise<{ message: string; status: number }> {
  try {
    /// get image file
    const imageFile = formData.get("image") as File;
    /// validate image file
    if (!imageFile) {
      return { message: "Missing image file", status: 400 };
    }
    if (!imageFile.type.startsWith("image/")) {
      return { message: "Invalid image file", status: 400 };
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      return { message: "Image file size must be less than 5MB", status: 400 };
    }
    /// upload image to cloudinary
    const imageUrl = await uploadImage(imageFile);

    /// Extract text fields from formData
    const textFields = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category") as
        | "MainCourse"
        | "Appetizers"
        | "Drink",
    };
    /// safeParse returns an object with success, error and data properties
    const { success, data } = MenuSchema.safeParse(textFields);
    /// validate text fields
    if (!success) {
      return { message: "Invalid text fields", status: 400 };
    }
    /// destructure the data object
    const { name, description, price, category, isAvailable } = data;
    /// create food

    await prisma.menuItem.create({
      data: { name, description, price, imageUrl, category, isAvailable },
    });
    revalidatePath("/users/admin/foods", "page");
    return { message: "Food created successfully.", status: 201 };
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Create Food", status: 500 };
  }
}

//// EDIT ////
export async function editFood({
  formData,
  food,
}: {
  formData: FormData;
  food: MenuItem;
}): Promise<{ message: string; status: number }> {
  try {
    const textFields = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
    };
    const { success, data } = MenuSchema.safeParse(textFields);

    if (!success) {
      return { message: "Invalid text fields", status: 400 };
    }
    const { name, description, price, category } = data;

    /// get image file

    const imageFile = ((formData?.get("image") || null) as File) || null;
    const prevImage = formData.get("prevImage") as string;

    let imageUrl = prevImage;

    if (!imageFile && !imageUrl) {
      return { message: "Please provide an image", status: 400 };
    }

    if (imageFile && imageFile.size > 0) {
      /// validate image file
      if (!imageFile.type.startsWith("image/")) {
        return { message: "Invalid image file", status: 400 };
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        return {
          message: "Image file size must be less than 5MB",
          status: 400,
        };
      }
      /// upload image to cloudinary
      imageUrl = await uploadImage(imageFile);
    } else if (!imageUrl) {
      // No new file and no prevImage
      return { message: "Missing image file", status: 400 };
    }

    /// update MenuItem ///
    await prisma.menuItem.update({
      where: { id: food.id },
      data: { name, description, price, imageUrl, category },
    });
    revalidatePath("/users/admin/foods", "page");
    return { message: "Food updated successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Food.", status: 500 };
  }
}

//// DELETE ////
export async function deleteFood(
  id: string
): Promise<{ message: string; status: number }> {
  try {
    await prisma.menuItem.delete({
      where: { id: id },
    });
    revalidatePath("/users/admin/foods", "page");
    return { message: "Food deleted successfully.", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Delete Food.", status: 500 };
  }
}
