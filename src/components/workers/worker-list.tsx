import { WorkerListCard } from "@/components/workers/worker-list-card";
import type { Worker } from "@/types";

type WorkerListProps = {
  workers: Worker[];
};

export function WorkerList({ workers }: WorkerListProps) {
  if (!workers || workers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white py-12 px-4 text-center">
        <p className="text-sm font-semibold text-[#111827]">No workers available</p>
        <p className="mt-1 text-xs text-[#6B7280]">Try searching for other categories or check back later.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {workers.map((worker) => (
        <li key={worker.id}>
          <WorkerListCard worker={worker} />
        </li>
      ))}
    </ul>
  );
}
