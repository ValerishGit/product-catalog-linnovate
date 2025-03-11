// lib/insertProducts.ts

import { generateReviews } from "../generateReview";
import { DB_NAME } from "../globals";
import clientPromise from "./database";

const sampleProductJson = [
  {
    name: "Cosiena Brukat Peplum Mini Dress ",
    price: 29.99,
    description:
      "Jacket in sweatshirt fabric with a lined drawstring hood, zip down the front, side pockets and ribbing at the cuffs and hem. Regular fit.",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://placeimg.com/640/480/people",
  },
  {
    name: "Cosiena Brukat Peplum High Dress",
    price: 29.99,
    description:
      "Jacket in sweatshirt fabric with a lined drawstring hood, zip down the front, side pockets and ribbing at the cuffs and hem. Regular fit.",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://placeimg.com/640/480/people",
  },
  {
    name: "Cosiena Brukat Peplum High Dress",
    price: 29.99,
    description:
      "Jacket in sweatshirt fabric with a lined drawstring hood, zip down the front, side pockets and ribbing at the cuffs and hem. Regular fit.",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://placeimg.com/640/480/people",
  },
  {
    name: "Cosiena Brukat Peplum High Dress",
    price: 29.99,
    description:
      "Jacket in sweatshirt fabric with a lined drawstring hood, zip down the front, side pockets and ribbing at the cuffs and hem. Regular fit.",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://placeimg.com/640/480/people",
  },
  {
    name: "Womens High-Waisted Jeans",
    price: 29.99,
    description:
      "Jacket in sweatshirt fabric with a lined drawstring hood, zip down the front, side pockets and ribbing at the cuffs and hem. Regular fit.",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://placeimg.com/640/480/people",
  },
  {
    name: "Unisex Hoodie",
    price: 29.99,
    description:
      "Soft and cozy hoodie perfect for chilly weather. Available in a range of sizes and colors.",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://placeimg.com/640/480/people",
  },
  // Add more products as needed
];

export async function insertProducts() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const productCollection = db.collection("products");
    const mockData = await (
      await fetch("https://dummyjson.com/products")
    ).json();

    const result = await productCollection.insertMany(mockData.products);
    console.log(`${result.insertedCount} products inserted successfully`);
    return result;
  } catch (error) {
    console.error("Error inserting products:", error);
    throw new Error("Failed to insert products");
  }
}

export async function insertReviews() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const reviewCollection = db.collection("reviews");
    const randomReviews = generateReviews("67cebb4cb455de907ef42146");
    const result = await reviewCollection.insertMany(randomReviews);

    console.log(`${result.insertedCount} reviews inserted successfully`);

    return result;
  } catch (error) {
    console.error("Error inserting reviews:", error);
    throw new Error("Failed to insert reviews");
  }
}
