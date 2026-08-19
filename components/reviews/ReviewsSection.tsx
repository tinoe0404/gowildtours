import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

interface ReviewsSectionProps {
  tourSlug?: string;
  tourTitle?: string;
}

export default function ReviewsSection({ tourSlug, tourTitle }: ReviewsSectionProps) {
  return (
    <section
      style={{
        padding: 'var(--space-24) 0',
        background: 'var(--color-mist)',
      }}
    >
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="section-header__label">Testimonials</span>
          <h2 className="section-header__title">What Our Guests Say</h2>
          <p className="section-header__subtitle">
            Hear from travellers who have experienced the magic of Africa with Go Wild Tours.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <ReviewList tourSlug={tourSlug} />
        </div>

        {/* Review Form */}
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <ReviewForm tourSlug={tourSlug} tourTitle={tourTitle} />
        </div>
      </div>
    </section>
  );
}
