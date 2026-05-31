"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
  label?: string;
  /** Fallback href if there is no browser history (e.g. direct link) */
  fallback?: string;
};

export function BackButton({
  className = "flex size-10 shrink-0 items-center justify-center rounded-full text-[#111827] active:bg-[#F3F4F6]",
  label,
  fallback = "/",
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    // If there is real browser history, go back; otherwise navigate to fallback
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button type="button" onClick={handleBack} className={className} aria-label="Go back">
      <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
      {label ? <span>{label}</span> : null}
    </button>
  );
}
