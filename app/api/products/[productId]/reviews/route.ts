import clientPromise from "@/lib/database/database";
import { Product, Review } from "@/lib/database/schemas";
import { DB_NAME } from "@/lib/globals";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  try {
    const { reviewerName, rating, comment } = await request.json();

    // Validate input
    if (!reviewerName || typeof reviewerName !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing reviewerName" },
        { status: 400 }
      );
    }

    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    if (
      !comment ||
      typeof comment !== "string" ||
      comment.trim().length === 0
    ) {
      return NextResponse.json(
        { message: "Comment is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const productCollection = db.collection<Product>("products");

    // Check if the product exists
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!product) {
      return NextResponse.json(
        { message: `Product not found: ${productId}` },
        { status: 404 }
      );
    }

    // Create the review object using your schema
    const newReview: Review = {
      reviewerName,
      rating,
      comment,
      date: new Date(),
    };

    // Add the review to the product's reviews array
    await productCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $push: { reviews: newReview } }
    );

    return NextResponse.json(
      { message: "Review added successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
