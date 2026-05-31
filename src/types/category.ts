import type { Worker } from "@/types/worker";

export type CategorySlug =
  | "plumber"
  | "electrician"
  | "carpenter"
  | "ac-repair"
  | "auto-rental"
  | "car-rental"
  | "painter"
  | "welder"
  | "mason";

export type CategoryIcon =
  | "wrench"
  | "zap"
  | "hammer"
  | "snowflake"
  | "car"
  | "car-front"
  | "palette"
  | "flame"
  | "brick-wall";

export type Category = {
  id?: string;
  slug: CategorySlug;
  name: string;
  titlePlural: string;
  label: string;
  workerCount: number;
  icon: CategoryIcon;
  iconBg: string;
  iconColor: string;
};

export type CategoryListing = {
  slug: CategorySlug;
  titlePlural: string;
  workerCount: number;
  freeUnlocksRemaining: number;
  workers: Worker[];
};

/** @deprecated Use Category */
export type HomeCategory = Category & { id: CategorySlug };
