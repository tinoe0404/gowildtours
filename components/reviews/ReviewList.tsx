import { Star } from "lucide-react";
import reviewsData from "../../data/reviews.json";

interface Review {
  name: string;
  rating: number;
  message: string;
  country?: string;
  approved: boolean;
  date: string;
}

export default function ReviewList() {
  // Read the JSON file directly via import
  const allReviews: Review[] = reviewsData as Review[];

  // Filter approved and sort by newest first
  const approvedReviews = allReviews
    .filter((review) => review.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (approvedReviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {approvedReviews.map((review, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
        >
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          
          <p className="text-gray-700 mb-6 flex-grow italic">
            "{review.message}"
          </p>
          
          <div className="mt-auto">
            <h4 className="font-semibold text-gray-900">{review.name}</h4>
            {review.country && (
              <p className="text-sm text-gray-500">{review.country}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
