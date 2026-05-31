import type { Review } from "@/types/review";

export const reviews: Review[] = [
  {
    id: "rev-1",
    workerId: "plumber-sai-plumbing",
    authorName: "Anil",
    rating: 5,
    comment: "Fixed kitchen leak quickly. Very polite and fair price.",
  },
  {
    id: "rev-2",
    workerId: "plumber-sai-plumbing",
    authorName: "Priya",
    rating: 4,
    comment: "Came on time. Good work on bathroom pipes.",
  },
  {
    id: "rev-3",
    workerId: "electrician-ramesh-electricals",
    authorName: "Suresh",
    rating: 5,
    comment: "Wiring done neatly. Explained everything clearly.",
  },
  {
    id: "rev-4",
    workerId: "electrician-ramesh-electricals",
    authorName: "Lakshmi",
    rating: 5,
    comment: "Safe work and quick response during power cut.",
  },
  {
    id: "rev-5",
    workerId: "carpenter-raju-wood",
    authorName: "Ravi",
    rating: 5,
    comment: "Made a strong wooden door. Finish was excellent.",
  },
  {
    id: "rev-6",
    workerId: "ac-srinivas-repair",
    authorName: "Kiran",
    rating: 5,
    comment: "AC cooling well after gas refill. Trustworthy service.",
  },
  {
    id: "rev-7",
    workerId: "car-balaji-rentals",
    authorName: "Mohan",
    rating: 4,
    comment: "Clean car and easy booking for family trip.",
  },
];

const reviewsByWorkerId = reviews.reduce<Map<string, Review[]>>((map, review) => {
  const list = map.get(review.workerId) ?? [];
  list.push(review);
  map.set(review.workerId, list);
  return map;
}, new Map());

export function getReviewsByWorkerId(workerId: string): Review[] {
  return reviewsByWorkerId.get(workerId) ?? [];
}

export { getFallbackReviews } from "@/data/reviews/fallback";
