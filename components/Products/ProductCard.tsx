import { Product } from "@/lib/database/schemas";
import React from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

interface ProductCardProps {
  product?: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  if (!product) return null;

  // Calculate the average rating
  const totalReviews = product.reviews.length;
  const avgRating = totalReviews
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      totalReviews
    : 0;
  const roundedRating = avgRating.toFixed(1); // Keep one decimal place

  return (
    <div className="max-w-sm w-full border bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
      <div className="relative">
        <img
          src={product.images[0]}
          alt="Product"
          className="w-full h-52 object-cover"
        />
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
          <p className="text-gray-500 mt-1 truncate max-w-[80%]">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          {/* Price */}
          <div>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>

          {/* Review Stars */}
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">
              {"★".repeat(Math.floor(avgRating))}
              {"☆".repeat(5 - Math.floor(avgRating))}
            </span>
            <span className="text-sm text-gray-600 ml-2">({totalReviews})</span>
          </div>
        </div>

        {/* View Product Button */}
        <Button
          onClick={() => {
            redirect(`/products/${product._id}`);
          }}
          className="w-full bg-[#228B22] hover:bg-[#305330] text-white font-medium py-3 rounded-lg transition-colors"
        >
          View Product
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
