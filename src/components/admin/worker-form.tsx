"use client";

import { useState } from "react";
import type { WorkerFormData } from "@/lib/admin-workers";
import { ImageUpload } from "@/components/admin/image-upload";

type WorkerFormProps = {
  initialData?: WorkerFormData;
  categories: { id: string; name: string }[];
  onSubmit: (data: WorkerFormData) => Promise<{ success: boolean; error?: string }>;
  submitLabel: string;
};

const EMPTY_FORM: WorkerFormData = {
  name: "",
  phone: "",
  category_id: "",
  location: "",
  experience: 0,
  services: "",
  description: "",
  image_url: "",
  featured: false,
  verified: false,
};

export function WorkerForm({
  initialData,
  categories,
  onSubmit,
  submitLabel,
}: WorkerFormProps) {
  const [form, setForm] = useState<WorkerFormData>(initialData ?? EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update<K extends keyof WorkerFormData>(key: K, value: WorkerFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.phone.trim() || !form.category_id) {
      setError("Name, phone, and category are required.");
      return;
    }

    setSubmitting(true);
    const result = await onSubmit(form);
    setSubmitting(false);

    if (result.success) {
      setSuccess("Saved successfully!");
      if (!initialData) setForm(EMPTY_FORM);
    } else {
      setError(result.error || "Something went wrong.");
    }
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#2563EB]/25";
  const labelClass = "text-xs font-semibold text-[#374151] uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Worker Name *</span>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Sai Plumbing Works"
          className={inputClass}
          required
        />
      </label>

      {/* Phone */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Phone *</span>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="e.g. 9876543210"
          className={inputClass}
          required
        />
      </label>

      {/* Category */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Category *</span>
        {categories.length === 0 ? (
          <div className="flex h-11 w-full items-center rounded-xl border border-[#EF4444] bg-[#FEF2F2] px-3 text-sm font-medium text-[#EF4444]">
            Unable to load categories
          </div>
        ) : (
          <select
            value={form.category_id}
            onChange={(e) => update("category_id", e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </label>

      {/* Location */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Location</span>
        <input
          type="text"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="e.g. Jagtial"
          className={inputClass}
        />
      </label>

      {/* Experience */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Experience (years)</span>
        <input
          type="number"
          min={0}
          max={50}
          value={form.experience}
          onChange={(e) => update("experience", Number(e.target.value))}
          className={inputClass}
        />
      </label>

      {/* Services */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Services</span>
        <textarea
          value={form.services}
          onChange={(e) => update("services", e.target.value)}
          placeholder="e.g. Pipe Repair, Bathroom Fittings"
          rows={2}
          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#2563EB]/25"
        />
      </label>

      {/* Description */}
      <label className="flex flex-col gap-1">
        <span className={labelClass}>Description</span>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Short worker description"
          rows={3}
          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#2563EB]/25"
        />
      </label>

      {/* Worker Image */}
      <ImageUpload
        value={form.image_url}
        onChange={(url) => update("image_url", url)}
      />

      {/* Toggles */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="size-4 rounded accent-[#2563EB]"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-[#374151]">
          <input
            type="checkbox"
            checked={form.verified}
            onChange={(e) => update("verified", e.target.checked)}
            className="size-4 rounded accent-[#22C55E]"
          />
          Verified
        </label>
      </div>

      {/* Status messages */}
      {error && (
        <p className="rounded-lg bg-[#FEF2F2] px-3 py-2 text-sm font-medium text-[#EF4444]">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-lg bg-[#F0FDF4] px-3 py-2 text-sm font-medium text-[#22C55E]">
          {success}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-xl bg-[#2563EB] text-sm font-semibold text-white disabled:opacity-50 active:bg-[#1D4ED8]"
      >
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
