import { PopularWorkerCard } from "@/components/cards/popular-worker-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getPopularWorkers } from "@/data";
import type { PopularWorker } from "@/types";

type PopularWorkersSectionProps = {
  initialWorkers?: PopularWorker[];
};

export function PopularWorkersSection({ initialWorkers }: PopularWorkersSectionProps) {
  const workers = initialWorkers ?? getPopularWorkers();

  return (
    <section aria-labelledby="popular-workers-heading">
      <SectionHeader
        id="popular-workers-heading"
        title="Popular Near You"
        viewAllHref="/categories"
      />
      <div className="scrollbar-hide scroll-snap-x -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {workers.map((worker) => (
          <PopularWorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </section>
  );
}
