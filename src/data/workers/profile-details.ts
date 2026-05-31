import type { CategorySlug } from "@/types/category";
import type { Worker } from "@/types/worker";
import type { WorkerProfileDetails } from "@/types/worker-profile";

import { servicesByCategory } from "@/data/workers/services-by-category";

const aboutByCategory: Record<CategorySlug, (name: string, area: string, years: number) => string> = {
  plumber: (name, area, years) =>
    `${name} has served families in ${area} and nearby areas for over ${years} years. We handle everyday plumbing problems with clear communication, neat work, and honest local pricing. Call directly for quick help with leaks, fittings, and bathroom repairs.`,
  electrician: (name, area, years) =>
    `${name} is a trusted local electrician in ${area} with ${years} years of hands-on experience. We focus on safe wiring, neat installations, and reliable repairs for homes and small shops. Same-day help available for urgent electrical issues.`,
  carpenter: (name, area, years) =>
    `${name} provides dependable carpentry work across ${area} and surrounding localities. With ${years} years of experience, we build and repair doors, furniture, and wooden fittings with careful finishing and fair local service.`,
  "ac-repair": (name, area, years) =>
    `${name} offers reliable AC and cooling repair in ${area}. Our ${years} years of local experience covers gas refill, general service, and cooling complaints for homes and small offices. We explain the issue clearly before starting work.`,
  "auto-rental": (name, area, years) =>
    `${name} helps local customers in ${area} with clean autos and polite drivers for daily travel. For ${years} years we have supported market trips, school drops, and short outstation rides with simple booking and fair rates.`,
  "car-rental": (name, area, years) =>
    `${name} provides local car rental support in ${area} for family trips, functions, and outstation travel. With ${years} years of service, we keep bookings simple and vehicles well maintained for safe local journeys.`,
  painter: (name, area, years) =>
    `${name} offers neat painting and finishing work across ${area}. With ${years} years of local experience, we handle interior and exterior jobs with clean preparation and reliable completion.`,
  welder: (name, area, years) =>
    `${name} provides welding and iron fabrication in ${area}. Our ${years} years of work covers gates, grills, and repair jobs with strong finishing and practical local pricing.`,
  mason: (name, area, years) =>
    `${name} supports masonry and plaster work in ${area} and nearby areas. With ${years} years of experience, we take up wall, flooring support, and small construction jobs with dependable workmanship.`,
};

function galleryForCategory(slug: CategorySlug) {
  return [1, 2, 3].map((n) => ({
    id: `${slug}-gallery-${n}`,
    src: `/gallery/${slug}-${n}.svg`,
    alt: "Service work photo",
  }));
}

function fullPhoneFromWorker(worker: Worker): string {
  const segment = worker.phoneMasked?.match(/\+91 (\d+)/)?.[1] ?? "98765";
  return `+91 ${segment} 43210`;
}

const detailsCache = new Map<string, WorkerProfileDetails>();

export function buildProfileDetails(worker: Worker): WorkerProfileDetails {
  const cacheKey = `${worker.id}-${worker.isUnlocked}`;
  const cached = detailsCache.get(cacheKey);
  if (cached) return cached;

  const aboutFn = aboutByCategory[worker.categorySlug];
  const details = {
    about: aboutFn(worker.name, worker.area, worker.yearsExperience),
    services: servicesByCategory[worker.categorySlug].slice(0, 4),
    gallery: galleryForCategory(worker.categorySlug),
    galleryMoreCount: 4,
    phoneFull: worker.isUnlocked ? fullPhoneFromWorker(worker) : undefined,
  };

  detailsCache.set(cacheKey, details);
  return details;
}
