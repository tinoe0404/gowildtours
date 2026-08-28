import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewList from '@/components/reviews/ReviewList';

export const metadata = {
  title: 'Reviews – Go Wild Tours',
  description: 'Read and submit customer reviews for our safaris',
};

export default function ReviewsPage() {
  return (
    <div className="reviews-page" style={containerStyle}>
      <h1 style={headerStyle}>Customer Reviews</h1>
      <section style={sectionStyle}>
        <ReviewForm />
      </section>
      <section style={sectionStyle}>
        <ReviewList />
      </section>
    </div>
  );
}

// Inline premium glass‑morphism styling (fallback if CSS file not yet added)
const containerStyle: React.CSSProperties = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: 'var(--space-8)',
  background: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(12px)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-card)',
};

const headerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--color-savanna)',
  textAlign: 'center',
  marginBottom: 'var(--space-8)',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-12)',
};
