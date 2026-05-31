"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WorkerForm } from "@/components/admin/worker-form";
import {
  getAdminWorkerById,
  updateWorker,
  type AdminWorkerRow,
  type WorkerFormData,
} from "@/lib/admin-workers";
import { fetchCategories } from "@/lib/categories";

export default function EditWorkerPage() {
  const params = useParams<{ id: string }>();
  const [worker, setWorker] = useState<AdminWorkerRow | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [w, cats] = await Promise.all([
          getAdminWorkerById(params.id),
          fetchCategories(),
        ]);
        if (!w) {
          setNotFound(true);
        } else {
          setWorker(w);
        }
        // filter out only items with db id
        const validCats = cats
          .filter((c) => c.id)
          .map((c) => ({ id: c.id!, name: c.name }));
        setCategories(validCats);
      } catch (err) {
        console.error("Failed to load edit worker page data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return <p className="py-10 text-center text-sm text-[#6B7280]">Loading…</p>;
  }

  if (notFound || !worker) {
    return (
      <p className="py-10 text-center text-sm text-[#EF4444]">
        Worker not found.
      </p>
    );
  }

  const initialData: WorkerFormData = {
    name: worker.name,
    phone: worker.phone,
    category_id: worker.category_id,
    location: worker.location,
    experience: worker.experience,
    services: worker.services,
    description: worker.description,
    image_url: worker.image_url,
    featured: worker.featured,
    verified: worker.verified,
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-[#111827]">Edit Worker</h2>
        <p className="text-xs text-[#6B7280]">{worker.name}</p>
      </div>

      <WorkerForm
        initialData={initialData}
        categories={categories}
        onSubmit={(data) => updateWorker(worker.id, data)}
        submitLabel="Save Changes"
      />
    </div>
  );
}
