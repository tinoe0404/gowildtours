"use client";

import { Star, Quote } from "lucide-react";
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
  const allReviews: Review[] = reviewsData as Review[];

  const approvedReviews = allReviews
    .filter((review) => review.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (approvedReviews.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
        <p>No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {approvedReviews.map((review, index) => (
        <div
          key={index}
          className="relative flex flex-col h-full overflow-hidden"
          style={{
            background: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-8)',
            transition: 'box-shadow 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'rgba(200,135,58,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          {/* Decorative gold top bar */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, var(--color-savanna), var(--color-savanna-light), var(--color-savanna))',
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            }}
          />

          {/* Quote icon */}
          <Quote
            className="mb-4"
            style={{
              width: '32px', height: '32px',
              color: 'var(--color-savanna)',
              opacity: 0.25,
            }}
          />

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                style={{
                  width: '18px', height: '18px',
                  fill: star <= review.rating ? 'var(--color-savanna)' : 'transparent',
                  color: star <= review.rating ? 'var(--color-savanna)' : 'var(--color-border)',
                  transition: 'color 0.2s',
                }}
              />
            ))}
          </div>

          {/* Review text */}
          <p
            className="flex-grow"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: 'var(--space-6)',
            }}
          >
            &ldquo;{review.message}&rdquo;
          </p>

          {/* Reviewer info */}
          <div
            className="mt-auto"
            style={{
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--color-earth)',
              }}
            >
              {review.name}
            </h4>
            {review.country && (
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {review.country}
              </p>
            )}
            <p style={{ fontSize: '0.72rem', color: 'var(--color-savanna)', marginTop: '4px', fontWeight: 500 }}>
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
