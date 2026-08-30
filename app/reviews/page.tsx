import ReviewForm from '@/components/reviews/ReviewForm';
import MovingReviews from '@/components/reviews/MovingReviews';
import Container from '@/components/ui/Container';

export const metadata = {
  title: 'Reviews – Go Wild Tours',
  description: 'Read customer reviews and share your safari experience with Go Wild Tours',
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-mist)] pt-32 pb-24">
      {/* Header section */}
      <Container className="mb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-dark-deep mb-4">
          Guest Testimonials
        </h1>
        <p className="text-warm-gray text-lg max-w-2xl mx-auto">
          Discover the stories and unforgettable experiences shared by our safari guests.
        </p>
      </Container>

      {/* Moving reviews marquee spanning full width */}
      <section className="mb-16">
        <MovingReviews />
      </section>

      {/* Submission form section */}
      <Container className="max-w-2xl">
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(200, 135, 58, 0.15)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px -5px rgba(44, 26, 14, 0.08)',
          }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-dark-deep mb-2">
              Share Your Experience
            </h2>
            <p className="text-warm-gray text-sm">
              Tell us about your safari adventure and guide experience.
            </p>
          </div>
          <ReviewForm />
        </div>
      </Container>
    </main>
  );
}
