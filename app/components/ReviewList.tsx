import React from "react";
import { Review } from "../types";

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview: (reviewId: number) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDeleteReview }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-2">
            <p className="font-bold">{review.comment}</p>
            <p className="text-lg font-bold text-purple-700">
              {review.rating}/10
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold italic">By {review.reviewer}</p>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => onDeleteReview(review.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
