import useProductStore from "@/stores/useProductStore";
import React, { useState } from "react";

interface AddReviewProps {
  productId: string;
}

function AddReview({ productId }: AddReviewProps) {
  const { fetchProduct } = useProductStore();
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewerName,
          rating,
          comment: review,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchProduct(productId);
        setMessage({ type: "success", text: "Review added successfully!" });
        setReview("");
        setRating(1);
        setReviewerName("");
      } else {
        throw new Error(data.message || "Failed to submit review");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Write a Review
      </h2>

      {message && (
        <div
          className={`p-2 mb-4 text-white rounded-md ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="reviewerName">
            Your Name
          </label>
          <input
            type="text"
            id="reviewerName"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="rating">
            Rating (1 to 5)
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="review">
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            required
            className="w-full p-2 border border-gray-300 rounded-md h-32"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default AddReview;
