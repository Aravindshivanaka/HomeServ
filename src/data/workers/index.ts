import type { CategorySlug } from "@/types/category";
import type { Worker } from "@/types/worker";

import { acRepairWorkers } from "@/data/workers/ac-repair";
import { autoRentalWorkers } from "@/data/workers/auto-rental";
import { carRentalWorkers } from "@/data/workers/car-rental";
import { carpenterWorkers } from "@/data/workers/carpenters";
import { electricianWorkers } from "@/data/workers/electricians";
import { masonWorkers } from "@/data/workers/masons";
import { painterWorkers } from "@/data/workers/painters";
import { plumberWorkers } from "@/data/workers/plumbers";
import { welderWorkers } from "@/data/workers/welders";

export const workersByCategory: Record<CategorySlug, Worker[]> = {
  plumber: plumberWorkers,
  electrician: electricianWorkers,
  carpenter: carpenterWorkers,
  "ac-repair": acRepairWorkers,
  "auto-rental": autoRentalWorkers,
  "car-rental": carRentalWorkers,
  painter: painterWorkers,
  welder: welderWorkers,
  mason: masonWorkers,
};

const workerById = new Map<string, Worker>(
  Object.values(workersByCategory)
    .flat()
    .map((w) => [w.id, w])
);

const allWorkersArray = Array.from(workerById.values());

export function getWorkersByCategory(slug: CategorySlug): Worker[] {
  return workersByCategory[slug] ?? [];
}

export function getWorkerById(id: string): Worker | undefined {
  return workerById.get(id);
}

export function getAllWorkers(): Worker[] {
  return allWorkersArray;
}

export { buildProfileDetails } from "@/data/workers/profile-details";
