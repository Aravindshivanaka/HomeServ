import type { Worker } from "@/types/worker";
import type { Review } from "@/types/review";

export type WorkerGalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type WorkerProfileDetails = {
  about: string;
  services: string[];
  gallery: WorkerGalleryImage[];
  galleryMoreCount: number;
  /** Full number when worker is unlocked */
  phoneFull?: string;
};

export type WorkerProfile = {
  worker: Worker;
  details: WorkerProfileDetails;
  reviews: Review[];
};
