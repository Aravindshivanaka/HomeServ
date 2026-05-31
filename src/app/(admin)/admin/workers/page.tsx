"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Pencil, Plus, Star, Phone } from "lucide-react";

import { getAdminWorkers, type AdminWorkerRow } from "@/lib/admin-workers";
import { DeleteWorkerDialog } from "@/components/admin/delete-worker-dialog";

export default function AdminWorkersPage() {
  const [workers, setWorkers] = useState<AdminWorkerRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadWorkers() {
    setLoading(true);
    const data = await getAdminWorkers();
    setWorkers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadWorkers();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#111827]">Workers</h2>
          <p className="text-xs text-[#6B7280]">{workers.length} total</p>
        </div>
        <Link
          href="/admin/workers/add"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white active:bg-[#1D4ED8]"
        >
          <Plus className="size-4" />
          Add Worker
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <p className="py-10 text-center text-sm text-[#6B7280]">Loading…</p>
      ) : workers.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#6B7280]">
          No workers found. Add your first worker.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {workers.map((worker) => (
            <li
              key={worker.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0px_1px_4px_rgba(17,24,39,0.04)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-[#111827]">
                      {worker.name}
                    </h3>
                    {worker.verified && (
                      <BadgeCheck className="size-4 shrink-0 text-[#22C55E]" />
                    )}
                    {worker.featured && (
                      <Star className="size-3.5 shrink-0 fill-[#FACC15] text-[#FACC15]" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[#6B7280]">
                    {worker.category_name} · {worker.location || "—"}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-[#6B7280]">
                    <Phone className="size-3 shrink-0" />
                    {worker.phone || "No phone"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/admin/workers/${worker.id}/edit`}
                    className="flex size-9 items-center justify-center rounded-lg text-[#2563EB] active:bg-[#EFF6FF]"
                    aria-label="Edit worker"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <DeleteWorkerDialog
                    workerId={worker.id}
                    workerName={worker.name}
                    onDeleted={loadWorkers}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
