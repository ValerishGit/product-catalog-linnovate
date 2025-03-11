"use client";
import CustomLoader from "@/components/CustomLoader";
import AddReview from "@/components/Reviews/AddReview";
import ReviewList from "@/components/Reviews/ReviewList";

import useProductStore from "@/stores/useProductStore";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { productId } = useParams(); // Access the productId from the URL
  const { product, fetchProduct } = useProductStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
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

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-64 md:h-80 rounded-lg bg-gray-300 mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.images[0]}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <div className="flex gap-x-2 items-center">
              <Link href={"/"}>
                <ChevronLeft />
              </Link>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {product.title}
              </h2>
            </div>

            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600">${product.price}</span>
              </div>
            </div>
          </div>
        </div>
        <ReviewList initialReviews={product.reviews} />
        <AddReview productId={product._id} />
      </div>
    </div>
  );
}
