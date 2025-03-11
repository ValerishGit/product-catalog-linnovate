"use client";
import CustomLoader from "@/components/CustomLoader";
import AddReview from "@/components/Reviews/AddReview";
import ReviewList from "@/components/Reviews/ReviewList";

import useProductStore from "@/stores/useProductStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { productId } = useParams(); // Access the productId from the URL
  const { product, fetchProduct } = useProductStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (!productId) return;
        await fetchProduct(productId.toString());
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  if (loading) return <CustomLoader />;

  if (!product) {
    return <div>Problem with the product</div>;
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Product Image, Title, Price, and Description */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {product.title}
        </h1>
        <p className="text-xl text-gray-700 mb-4">${product.price}</p>
        <p className="text-base text-gray-600">{product.description}</p>
      </div>
      {/* Reviews Section */}
      <ReviewList initialReviews={product.reviews}></ReviewList>

      {/* Write a New Review */}
      <AddReview productId={product._id} />
    </div>
  );
}
