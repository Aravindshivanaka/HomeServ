export type {
  Category,
  CategoryIcon,
  CategoryListing,
  CategorySlug,
  HomeCategory,
} from "@/types/category";
export type { PopularWorker, Worker } from "@/types/worker";
export type {
  WorkerGalleryImage,
  WorkerProfile,
  WorkerProfileDetails,
} from "@/types/worker-profile";
export type { Review } from "@/types/review";
export {
  UNLOCK_DURATION_DAYS,
  UNLOCK_FEE_INR,
  type UnlockPageData,
  type UserUnlock,
} from "@/types/unlock";

export type BannerSlide = {
  id: string;
  tagline: string;
  title: string;
  ctaLabel: string;
};

export type NavItem = {
  id: "home" | "categories" | "wishlist" | "profile";
  label: string;
  href: string;
};

/** @deprecated Use Worker */
export type CategoryWorker = import("@/types/worker").Worker;
