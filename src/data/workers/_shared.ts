import type { CategorySlug } from "@/types/category";
import type { Worker } from "@/types/worker";

type WorkerSeed = Omit<Worker, "categorySlug" | "categoryLabel" | "categoryDisplay">;

export function defineWorkers(
  categorySlug: CategorySlug,
  categoryLabel: string,
  categoryDisplay: string,
  seeds: WorkerSeed[]
): Worker[] {
  return seeds.map((seed) => ({
    ...seed,
    categorySlug,
    categoryLabel,
    categoryDisplay,
  }));
}

export function maskPhone(lastDigits: string): string {
  return `+91 ${lastDigits} *****`;
}
