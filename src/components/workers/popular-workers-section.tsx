import { PopularWorkerCard } from "@/components/cards/popular-worker-card";
import { SectionHeader } from "@/components/ui/section-header";
import { getPopularWorkers } from "@/data";

export function PopularWorkersSection() {
  return (
    <section aria-labelledby="popular-workers-heading">
      <SectionHeader
        id="popular-workers-heading"
        title="Popular Near You"
        viewAllHref="/categories"
      />
      <div className="scrollbar-hide scroll-snap-x -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {getPopularWorkers().map((worker) => (
          <PopularWorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </section>
  );
}
