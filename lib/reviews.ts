import reviewsData from "@/data/reviews.json";

export interface Review {
  name: string;
  rating: number;
  message: string;
  country?: string;
  approved: boolean;
  date: string;
  tourSlug?: string;
}

export const reviews = reviewsData as Review[];

export function getApprovedReviews(tourSlug?: string) {
  return reviews
    .filter((review) => review.approved && (!tourSlug || review.tourSlug === tourSlug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getReviewSummary(tourSlug: string) {
  const tourReviews = getApprovedReviews(tourSlug);
  const average = tourReviews.length
    ? tourReviews.reduce((total, review) => total + review.rating, 0) / tourReviews.length
    : 0;

  return { count: tourReviews.length, average };
}
