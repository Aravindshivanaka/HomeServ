"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteWorker } from "@/lib/admin-workers";

type DeleteWorkerDialogProps = {
  workerId: string;
  workerName: string;
  onDeleted: () => void;
};

export function DeleteWorkerDialog({
  workerId,
  workerName,
  onDeleted,
}: DeleteWorkerDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteWorker(workerId);
    setDeleting(false);

    if (result.success) {
      setOpen(false);
      onDeleted();
    } else {
      alert(result.error || "Failed to delete worker.");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-9 items-center justify-center rounded-lg text-[#EF4444] active:bg-[#FEF2F2]"
        aria-label="Delete worker"
      >
        <Trash2 className="size-4" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-lg">
        <h3 className="text-base font-semibold text-[#111827]">
          Delete Worker?
        </h3>
        <p className="mt-1.5 text-sm text-[#6B7280]">
          Are you sure you want to delete <strong>{workerName}</strong>? This
          action cannot be undone.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={deleting}
            className="flex-1 rounded-xl border border-[#E5E7EB] bg-white py-2.5 text-sm font-medium text-[#374151] active:bg-[#F3F4F6]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 rounded-xl bg-[#EF4444] py-2.5 text-sm font-semibold text-white disabled:opacity-50 active:bg-[#DC2626]"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
