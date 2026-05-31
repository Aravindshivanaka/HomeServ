import { WorkerListCard } from "@/components/workers/worker-list-card";
import type { Worker } from "@/types";

type WorkerListProps = {
  workers: Worker[];
};

export function WorkerList({ workers }: WorkerListProps) {
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
