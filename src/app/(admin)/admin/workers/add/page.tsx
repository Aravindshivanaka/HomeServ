"use client";

import { useEffect, useState } from "react";
import { WorkerForm } from "@/components/admin/worker-form";
import { createWorker } from "@/lib/admin-workers";
import { fetchCategories } from "@/lib/categories";

export default function AddWorkerPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((cats) => {
        // filter out only items with db id
        const validCats = cats
          .filter((c) => c.id)
          .map((c) => ({ id: c.id!, name: c.name }));
        setCategories(validCats);
      })
      .catch((err) => {
        console.error("Failed to load categories in admin:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="py-10 text-center text-sm text-[#6B7280]">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-[#111827]">Add Worker</h2>
        <p className="text-xs text-[#6B7280]">
          Fill in the details to add a new worker
        </p>
      </div>

      <WorkerForm
        categories={categories}
        onSubmit={createWorker}
        submitLabel="Add Worker"
      />
    </div>
  );
}
