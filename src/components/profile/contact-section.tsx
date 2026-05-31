import { Lock, Phone } from "lucide-react";
import Link from "next/link";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { layout } from "@/lib/layout";
import type { Worker } from "@/types";
import type { WorkerProfileDetails } from "@/types/worker-profile";

type ContactSectionProps = {
  worker: Worker;
  details: WorkerProfileDetails;
};

export function ContactSection({ worker, details }: ContactSectionProps) {
  const locked = !worker.isUnlocked;

  return (
    <ProfileSectionCard title="Contact Details">
      {locked && worker.phoneMasked ? (
        <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-3">
          <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#374151]">
            <Phone className="size-4 shrink-0 text-[#6B7280]" aria-hidden />
            <span className="tracking-wide">{worker.phoneMasked}</span>
          </p>
          <Lock
            className="size-[18px] shrink-0 text-[#6B7280]"
            strokeWidth={2.25}
            aria-hidden
          />
        </div>
      ) : null}

      {!locked && details.phoneFull ? (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#EFF6FF] px-3 py-3">
          <Phone className="size-4 shrink-0 text-[#2563EB]" aria-hidden />
          <a
            href={`tel:${details.phoneFull.replace(/\s/g, "")}`}
            className="text-sm font-semibold tracking-wide text-[#111827]"
          >
            {details.phoneFull}
          </a>
        </div>
      ) : null}

      {locked ? (
        <Link
          href={`/unlock/${worker.categorySlug}`}
          className={`inline-flex w-full ${layout.touchBtn} items-center justify-center gap-2 rounded-xl bg-[#F97316] text-[15px] font-semibold text-white shadow-[0px_2px_8px_rgba(249,115,22,0.28)] active:bg-[#EA580C]`}
        >
          <Lock className="size-4 text-white" strokeWidth={2.25} aria-hidden />
          Unlock for Rs.10
        </Link>
      ) : (
        <a
          href={details.phoneFull ? `tel:${details.phoneFull.replace(/\s/g, "")}` : undefined}
          className={`inline-flex w-full ${layout.touchBtn} items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-[15px] font-semibold text-white active:bg-[#1D4ED8]`}
        >
          <Phone className="size-4" aria-hidden />
          Call Now
        </a>
      )}

      {locked ? (
        <p className="mt-2.5 text-center text-xs leading-4 text-[#6B7280]">
          100% Verified Contact. Secure Payment.
        </p>
      ) : null}
    </ProfileSectionCard>
  );
}
