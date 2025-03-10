/// CRUD operations for the database (foods, sideItems, users) 

import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { FoodCardProps, SideItemsProps } from "./types";
import { uploadImage } from "./upload";

/// connect to MongoDB
const client = await clientPromise;
/// select the database
const FoodDatabase = client.db("FoodDatabase");

///// get foods from database ///////
/// define type of function that return an object also it is async function so need Promise
export async function getFoods(): Promise<{
  foods: FoodCardProps[];
  sideItems: SideItemsProps[];
}> {
  /// make delay to check the skeleton
  // await new Promise(resolve => setTimeout(resolve,2000))

  /// fetch collections separately
  const foods = await FoodDatabase.collection("foods").find({}).toArray();
  const sideItems = await FoodDatabase.collection("sideItems")
    .find({})
    .toArray();
  return {
    // after fetching data we should convert the _id type to string from ObjectId that is its default type,
    // so we define all again
    foods: foods.map((food) => ({
      _id: food._id.toString(), // Convert ObjectId to string
      image: food.image,
      title: food.title,
      description: food.description,
      price: food.price,
    })),
    sideItems: sideItems.map((sideItem) => ({
      _id: sideItem._id.toString(), // Convert ObjectId to string
      image: sideItem.image,
      title: sideItem.title,
      description: sideItem.description,
      price: sideItem.price,
    })),
  };
}

///// post foods to database ///////
export async function postFoods(
  title: string,
  description: string,
  price: number,
  image: File
) {
  // upload the image
  // 1. Upload the image to a storage service (Cloudinary)
  // 2. Get back a URL
  // 3. Save the URL along with other data
  const imageUrl = await uploadImage(image);

  // Then save to database
  const food = await FoodDatabase.collection("foods").insertOne({
    title,
    description,
    price,
    image: imageUrl,
  });
  return {
    id: food.insertedId.toString(),
    title,
    description,
    price,
    image: imageUrl,
  };
}

///// post side foods to database ///////
export async function postSideFoods(
  title: string,
  description: string,
  price: number,
  image: File
) {
  const imageUrl = await uploadImage(image);

  const sideFood = await FoodDatabase.collection("foods").insertOne({
    title,
    description,
    price,
    image: imageUrl,
  });
  return {
    id: sideFood.insertedId.toString(),
    title,
    description,
    price,
    image: imageUrl,
  };
}

///// update food from database ///////
export async function updateFood(
  id: string,
  newTitle: string,
  newDescription: string,
  newPrice: number,
  newImage: File,
  newToday?: boolean
) {
  const imageUrl = await uploadImage(newImage);

  await FoodDatabase.collection("foods").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: newTitle,
        description: newDescription,
        price: newPrice,
        image: imageUrl,
        today: newToday,
      },
    }
  );
}

///// delete food from database ///////
export async function deleteOneFood(id: string) {
  await FoodDatabase.collection("foods").deleteOne({ _id: new ObjectId(id) });
}

///// get user from database ///////
export async function getUser(inputEmail: string) {
  try {
    const client = await clientPromise;
    const UsersDatabase = client.db("UsersDatabase");
    const user = await UsersDatabase.collection("users")
      .find({ email: inputEmail })
      .toArray();
    return user[0];
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}
