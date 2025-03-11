import { Review } from "@/lib/database/schemas";

interface ReviewListProps {
  initialReviews: Review[];
}

const ReviewList = ({ initialReviews }: ReviewListProps) => {
  return (
    <div className="mb-8 w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Customer Reviews
      </h2>

      {initialReviews.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto p-2 border border-gray-300 rounded-md bg-gray-50">
          {initialReviews.map((review, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-white shadow-md border rounded-lg"
            >
              {/* User avatar (Initials) */}
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                {review.reviewerName.slice(0, 1).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">
                    {review.reviewerName}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                {/* Star Rating */}
                <p className="text-yellow-500 text-lg">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>

                {/* Review text */}
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
};

export default ReviewList;
