"use client";

import { ShieldCheck } from "lucide-react";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { layout } from "@/lib/layout";
import { getUserPhone } from "@/lib/auth";

type UnlockFlowProps = {
  categoryName: string;
};

export function UnlockFlow({ categoryName }: UnlockFlowProps) {
  const phone = getUserPhone();

  function handlePay() {
    // Frontend-only — Razorpay integration later
  }

  return (
    <div className="flex flex-col gap-3">
      <ProfileSectionCard title="Verified Account">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="size-4 text-[#16A34A]" aria-hidden />
          <span className="text-sm font-semibold text-[#111827]">
            Logged in as {phone}
          </span>
        </div>
        <p className="text-xs text-[#6B7280] leading-4">
          Your mobile number is verified. Proceed to pay and unlock {categoryName} workers.
        </p>
      </ProfileSectionCard>

      <ProfileSectionCard title="Payment">
        <button
          type="button"
          onClick={handlePay}
          className={`inline-flex w-full ${layout.touchBtn} items-center justify-center gap-2 rounded-xl bg-[#F97316] text-[15px] font-semibold text-white shadow-[0px_2px_8px_rgba(249,115,22,0.28)] active:bg-[#EA580C]`}
        >
          <ShieldCheck className="size-4 text-white" strokeWidth={2.25} aria-hidden />
          Pay Securely with Razorpay
        </button>
        <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-xs font-semibold tracking-wide text-[#16A34A] uppercase">
          <ShieldCheck className="size-3.5" aria-hidden />
          100% Secure Payment
        </p>
        <p className="mt-2 text-center text-xs leading-4 text-[#6B7280]">
          UPI, Google Pay, PhonePe, Paytm &amp; cards supported via Razorpay.
        </p>
      </ProfileSectionCard>
    </div>
  );
}
