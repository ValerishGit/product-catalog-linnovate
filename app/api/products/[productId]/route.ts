import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/database";
import { DB_NAME } from "@/lib/globals";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const productCollection = db.collection("products");

    // Fetch the product by ID from the database
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found " + productId },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
