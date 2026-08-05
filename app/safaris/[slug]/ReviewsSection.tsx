'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export default function ReviewsSection({ tourId }: { tourId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [tourId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews/${tourId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId, customerName: name, rating, content }),
      });

      if (res.ok) {
        toast.success('Review submitted successfully! It will appear once approved.');
        setShowForm(false);
        setName('');
        setRating(5);
        setContent('');
      } else {
        toast.error('Failed to submit review');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[var(--radius-card)] shadow-sm border border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h3 className="font-display text-2xl font-bold text-dark-deep">Traveler Reviews</h3>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} variant="outline" className="mt-4 md:mt-0">
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-border space-y-4">
          <h4 className="font-semibold text-lg mb-2">Leave your feedback</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Your Name</label>
              <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Rating</label>
              <div className="flex items-center gap-1 h-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Your Review</label>
            <Textarea required rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tell us about your experience..." />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Review'}</Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-gray-500 py-4 text-center">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 py-4 text-center italic border-y border-dashed border-gray-200">No reviews yet for this tour. Be the first to share your experience!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-dark-deep">{review.customerName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-yellow-500 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
