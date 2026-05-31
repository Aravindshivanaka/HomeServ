"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, X, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

const BUCKET = "worker-images";
const MAX_SIZE_MB = 2;
const ACCEPTED = "image/jpeg,image/png,image/webp";

function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // reset input so same file can be re-selected
    e.target.value = "";

    // validate size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB}MB`);
      return;
    }

    // validate type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPG, PNG, or WebP allowed");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // unique filename: timestamp + random suffix
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError(uploadError.message || "Upload failed");
        setUploading(false);
        return;
      }

      const publicUrl = getPublicUrl(fileName);
      onChange(publicUrl);
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    onChange("");
    setError("");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#374151]">
        Worker Image
      </span>

      {/* Preview or upload button */}
      {value ? (
        <div className="relative w-fit">
          <img
            src={value}
            alt="Worker"
            className="size-20 rounded-xl border border-[#E5E7EB] object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-sm active:bg-[#DC2626]"
            aria-label="Remove image"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-20 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-[#F9FAFB] text-sm font-medium text-[#6B7280] active:border-[#2563EB] active:text-[#2563EB] disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Camera className="size-5" />
              Tap to upload photo
            </>
          )}
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        onChange={handleFile}
        className="hidden"
      />

      {/* Error */}
      {error && (
        <p className="flex items-center gap-1 text-xs font-medium text-[#EF4444]">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
