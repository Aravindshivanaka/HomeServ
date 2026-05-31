import type { Review } from "@/types/review";
import type { Worker } from "@/types/worker";

const fallbackComments = [
  "Arrived on time and finished the work neatly. Would call again for local jobs.",
  "Polite service and clear explanation. Good experience for our home repair.",
  "Trustworthy local worker. Fair behaviour and proper work completion.",
];

const fallbackNames = ["Amit", "Priya", "Suresh", "Lakshmi", "Ravi", "Kiran"];

export function getFallbackReviews(worker: Worker, count = 2): Review[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `fallback-${worker.id}-${i}`,
    workerId: worker.id,
    authorName: fallbackNames[(worker.id.length + i) % fallbackNames.length],
    rating: i === 0 ? 5 : 4,
    comment: fallbackComments[(worker.id.length + i) % fallbackComments.length],
  }));
}
