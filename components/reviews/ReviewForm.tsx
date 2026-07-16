"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";

export default function ReviewForm() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      country: formData.get("country"),
      rating,
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      toast.success("Thank you! Your review has been submitted for approval.");
      (e.target as HTMLFormElement).reset();
      setRating(0);
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'var(--color-earth)',
          marginBottom: 'var(--space-6)',
        }}
      >
        Share Your Experience
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Rating */}
        <div className="form-field" style={{ marginBottom: 0 }}>
          <label className="form-label">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
                style={{
                  transition: 'transform 0.2s ease',
                  transform: star <= (hoveredRating || rating) ? 'scale(1.15)' : 'scale(1)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: '2px',
                }}
              >
                <Star
                  style={{
                    width: '28px', height: '28px',
                    fill: star <= (hoveredRating || rating) ? 'var(--color-savanna)' : 'transparent',
                    color: star <= (hoveredRating || rating) ? 'var(--color-savanna)' : 'var(--color-border)',
                    transition: 'fill 0.2s, color 0.2s',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label htmlFor="review-name" className="form-label">Your Name *</label>
            <input
              type="text"
              id="review-name"
              name="name"
              required
              maxLength={50}
              className="form-input"
              placeholder="John Doe"
            />
          </div>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label htmlFor="review-country" className="form-label">Country (Optional)</label>
            <input
              type="text"
              id="review-country"
              name="country"
              maxLength={50}
              className="form-input"
              placeholder="e.g. United Kingdom"
            />
          </div>
        </div>

        {/* Message */}
        <div className="form-field" style={{ marginBottom: 0 }}>
          <label htmlFor="review-message" className="form-label">Your Review *</label>
          <textarea
            id="review-message"
            name="message"
            required
            maxLength={500}
            rows={4}
            className="form-textarea"
            placeholder="Tell us about your safari experience..."
          />
          <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Max 500 characters
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn--primary btn--lg"
          style={{
            width: '100%',
            gap: 'var(--space-2)',
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Review
              <Send style={{ width: '18px', height: '18px' }} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
