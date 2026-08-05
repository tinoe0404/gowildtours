import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <h1 className="text-3xl font-bold">Reviews Management</h1>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className={review.isApproved ? 'border-gray-200' : 'border-orange-300 bg-orange-50/30'}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{review.customerName}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Tour ID: {review.tourId} • {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`text-sm font-medium ${review.isApproved ? 'text-green-600' : 'text-orange-600'}`}>
                    Status: {review.isApproved ? 'Approved (Public)' : 'Pending Review'}
                  </span>
                  
                  <ReviewActions reviewId={review.id} isApproved={review.isApproved} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
