// app/api/products/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/database";
import { DB_NAME } from "@/lib/globals";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageNumber = parseInt(url.searchParams.get("page") ?? "1", 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return NextResponse.json(
      { message: "Invalid page number" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const productCollection = db.collection("products");

    const skip = (pageNumber - 1) * 20; // 20 products per page

    const products = await productCollection
      .aggregate([
        { $skip: skip },
        { $limit: 20 }, // Limit to 20 products per page
      ])
      .toArray();

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products with reviews:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
