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

export default function MovingReviews() {
  const approvedReviews: Review[] = (reviewsData as Review[])
    .filter((review) => review.approved);

  if (approvedReviews.length === 0) return null;

  // Split reviews into two groups for two separate moving rows
  const midIndex = Math.ceil(approvedReviews.length / 2);
  const row1 = approvedReviews.slice(0, midIndex);
  const row2 = approvedReviews.slice(midIndex);

  // Duplicate items to ensure a seamless infinite loop
  const row1Items = [...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2];

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Keyframe animations and styles */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-33.33%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          gap: 24px;
        }
        .marquee-left {
          animation: marqueeLeft 50s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 50s linear infinite;
        }
        .marquee-wrap:hover .marquee-container {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative background blur shapes for ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-savanna/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sunset/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mask to fade out edge cards */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 hidden md:block"
        style={{
          background: 'linear-gradient(to right, var(--color-mist) 0%, transparent 8%, transparent 92%, var(--color-mist) 100%)'
        }}
      />

      <div className="flex flex-col gap-8">
        {/* Row 1: Leftwards movement */}
        <div className="flex overflow-hidden w-full relative marquee-wrap">
          <div className="marquee-container marquee-left">
            {row1Items.map((review, idx) => (
              <ReviewCard key={`row1-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightwards movement */}
        <div className="flex overflow-hidden w-full relative marquee-wrap">
          <div className="marquee-container marquee-right">
            {row2Items.map((review, idx) => (
              <ReviewCard key={`row2-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="relative flex flex-col justify-between w-[320px] md:w-[380px] p-6 rounded-2xl border flex-shrink-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(8px)',
        borderColor: 'rgba(200, 135, 58, 0.15)',
        boxShadow: '0 4px 20px -2px rgba(44, 26, 14, 0.05)',
      }}
    >
      {/* Quote Icon Background watermark */}
      <Quote className="absolute right-4 top-4 w-12 h-12 text-savanna opacity-5 pointer-events-none" />

      <div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              style={{
                fill: i < review.rating ? 'var(--color-savanna)' : 'transparent',
                color: i < review.rating ? 'var(--color-savanna)' : '#cbd5e1',
              }}
            />
          ))}
        </div>

        <p className="text-dark-deep font-semibold text-xs font-accent mb-2 uppercase tracking-wider line-clamp-1">
          {review.country || "General Safari"}
        </p>

        <p className="text-warm-gray text-[14px] leading-relaxed italic mb-4 line-clamp-3">
          &ldquo;{review.message}&rdquo;
        </p>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div>
          <h4 className="font-bold text-dark-deep text-sm">{review.name}</h4>
          <span className="text-[11px] text-warm-gray">
            {new Date(review.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
