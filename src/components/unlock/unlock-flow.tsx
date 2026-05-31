"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { layout } from "@/lib/layout";

type UnlockFlowProps = {
  categoryName: string;
};

export function UnlockFlow({ categoryName }: UnlockFlowProps) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const mobileValid = mobile.replace(/\D/g, "").length === 10;
  const otpValid = otp.replace(/\D/g, "").length >= 4;
  const canVerify = mobileValid && !otpStep;
  const canPay = otpStep && otpValid;

  function handleVerifyContinue() {
    if (!canVerify) return;
    setOtpStep(true);
  }

  function handlePay() {
    if (!canPay) return;
    // Frontend-only — Razorpay integration later
  }

  return (
    <div className="flex flex-col gap-3">
      <ProfileSectionCard title="Login to Proceed">
        <p className="mb-3 text-sm leading-5 text-[#6B7280]">
          We will send an OTP to verify your mobile number before payment for{" "}
          {categoryName}.
        </p>

        <label className="mb-3 block">
          <span className="mb-1.5 block text-xs font-medium text-[#6B7280]">
            Mobile Number
          </span>
          <div
            className={`flex ${layout.touchBtn} items-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-white`}
          >
            <span className="border-r border-[#E5E7EB] px-3 text-sm font-medium text-[#111827]">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter mobile number"
              maxLength={10}
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </label>

        {otpStep ? (
          <label className="mb-3 block">
            <span className="mb-1.5 block text-xs font-medium text-[#6B7280]">
              OTP
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 4-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className={`flex ${layout.touchBtn} w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-[#2563EB]/25`}
            />
          </label>
        ) : null}

        <button
          type="button"
          onClick={handleVerifyContinue}
          disabled={!canVerify}
          className={`inline-flex w-full ${layout.touchBtn} items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-sm font-semibold text-white active:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Verify &amp; Continue
        </button>
      </ProfileSectionCard>

      <ProfileSectionCard title="Payment">
        <button
          type="button"
          onClick={handlePay}
          disabled={!canPay}
          className={`inline-flex w-full ${layout.touchBtn} items-center justify-center gap-2 rounded-xl bg-[#F97316] text-[15px] font-semibold text-white shadow-[0px_2px_8px_rgba(249,115,22,0.28)] active:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50`}
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
