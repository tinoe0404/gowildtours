'use client';

import { useState, useEffect } from 'react';
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
    <div className="bg-white p-8 rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h3 className="font-display text-2xl font-bold text-dark-deep">Traveler Reviews</h3>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="mt-4 md:mt-0 font-accent font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-dark-deep px-6 py-2 rounded-full transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-light rounded-xl border border-[var(--color-border)] space-y-4">
          <h4 className="font-semibold text-lg mb-2 text-dark-deep">Leave your feedback</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-dark-deep mb-2 block uppercase tracking-wide">Your Name</label>
              <input 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe" 
                className="w-full h-12 px-4 rounded-lg border border-[var(--color-border)] bg-white focus:ring-2 focus:ring-accent outline-none text-dark-deep transition-shadow"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-dark-deep mb-2 block uppercase tracking-wide">Rating</label>
              <div className="flex items-center gap-2 h-12">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-7 w-7 cursor-pointer transition-colors ${star <= rating ? 'fill-[#C8832A] text-[#C8832A]' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <label className="text-sm font-bold text-dark-deep mb-2 block uppercase tracking-wide">Your Review</label>
            <textarea 
              required 
              rows={4} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Tell us about your experience..." 
              className="w-full p-4 rounded-lg border border-[var(--color-border)] bg-white focus:ring-2 focus:ring-accent outline-none text-dark-deep transition-shadow resize-y"
            />
          </div>
          <div className="flex gap-4 justify-end pt-2">
            <button 
              type="button" 
              className="px-6 py-2 rounded-full font-bold text-warm-gray hover:bg-gray-200 transition-colors" 
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2 rounded-full bg-[#C8832A] hover:bg-[#A66920] text-white font-bold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-warm-gray py-8 text-center animate-pulse">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-warm-gray py-12 text-center italic border-y border-dashed border-[var(--color-border)]">No reviews yet for this tour. Be the first to share your experience!</p>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-[var(--color-border)] pb-8 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg text-dark-deep">{review.customerName}</span>
                <span className="text-sm font-medium text-warm-gray bg-gray-100 px-3 py-1 rounded-full">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-[#C8832A] mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-dark-deep/80 leading-relaxed whitespace-pre-wrap">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
