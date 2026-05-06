import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our recent travelers have to say about their unforgettable experiences with GoWild Tours.
          </p>
        </div>

        <div className="mb-16">
          <ReviewList />
        </div>

        <div className="max-w-2xl mx-auto">
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
