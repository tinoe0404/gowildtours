import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import ReviewActions from './ReviewActions';

export const dynamic = 'force-dynamic';

export default async function AdminReviews() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review.id} className={`p-6 rounded-xl border shadow-sm ${review.isApproved ? 'border-gray-200 bg-white' : 'border-orange-300 bg-orange-50/50'}`}>
              <div className="pb-4 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{review.customerName}</h3>
                  <p className="text-sm text-gray-500">
                    Tour ID: {review.tourId} • {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center text-yellow-500 mt-2 md:mt-0 bg-white px-2 py-1 rounded-md border border-gray-100 shadow-sm">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
                
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100/50">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${review.isApproved ? 'bg-green-100 text-green-700' : 'bg-orange-200 text-orange-800'}`}>
                    {review.isApproved ? 'Approved (Public)' : 'Pending Review'}
                  </span>
                  
                  <ReviewActions reviewId={review.id} isApproved={review.isApproved} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
