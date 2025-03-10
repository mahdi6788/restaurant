///// Server actions /////

"use server";
import { z } from "zod";
import { deleteOneFood, getFoods, postFoods, updateFood } from "./data";
import { revalidatePath } from "next/cache";
import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";

///// Define a schema that matches the shape of the form object /////
const FormSchema = z.object({
  id: z.string(),
  title: z.string({ invalid_type_error: "Please type a title." }),
  description: z.string({ invalid_type_error: "Please type a description." }),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }), // use coerce, when converting the type (e.g. from string to number)
  image: z.instanceof(File, { message: "Please provide an image." }),
});

//// CREATE ////
const Food = FormSchema.omit({ id: true });
export async function createFood(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const { title, description, price } = Food.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      image: formData.get("image"),
    });

    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      return { success: false, message: "Please provide an image" };
    }

    await postFoods(title, description, price, imageFile);
    revalidatePath("/users/admin/foods", "page");
    revalidatePath("/users", "page");
    return {
      success: true,
      message: "Food was successfully created.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to Create Food.",
    };
  }
}

//// EDIT ////
/// since the id was already passed separately in editFood and define its type, no need to parse it from formData
const UpdateFood = FormSchema.omit({ id: true });
export async function editFood(
  formData: FormData,
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { title, description, price } = UpdateFood.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      image: formData.get("image"),
    });

    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      return { success: false, message: "Please provide an image" };
    }

    await updateFood(id, title, description, price, imageFile);
    // Force a cache revalidation of the entire page
    revalidatePath("/users/admin/foods", "page");
    // Also revalidate the users page
    revalidatePath("/users", "page");
    return { success: true, message: "Food updated successfully." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to Update Food.",
    };
  }
}

//// DELETE ////
export async function deleteFood(id: string) {
  try {
    await deleteOneFood(id);
    // Force a cache revalidation of the entire page
    revalidatePath("/users/admin/foods", "page");
    // Also revalidate the users page
    revalidatePath("/users", "page");
    return { success: true, message: "Food deleted successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete food." };
  }
}

/// select food for today
export async function checkboxAction(formData: FormData) {
  const { foods } = await getFoods();
  const foodId = formData.get("id");
  const foodWithId = foods.find((food) => food._id === foodId);
  const { id, title, description, price, image } = FormSchema.parse({
    id: formData.get("id"),
    title: foodWithId?.title,
    description: foodWithId?.description,
    price: foodWithId?.price,
    image: foodWithId?.image,
  });
  try {
    await updateFood(id, title, description, price, image);
    revalidatePath("/menu");
    revalidatePath("/");
    // redirect("/");
  } catch (error) {
    console.error(error);
  }
}

//// Authentication
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
