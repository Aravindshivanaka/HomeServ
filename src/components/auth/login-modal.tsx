"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { layout } from "@/lib/layout";

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login, onLoginSuccessCallback } = useAuth();
  const [mobile, setMobile] = useState("");

  if (!isLoginModalOpen) return null;

  const isValid = mobile.replace(/\D/g, "").length === 10;

  function handleContinue() {
    if (!isValid) return;
    
    // Perform mock login
    login(mobile);
    
    // Execute auto-save callback if triggered from wishlist heart
    if (onLoginSuccessCallback) {
      onLoginSuccessCallback();
    }
    
    closeLoginModal();
    setMobile(""); // Reset for next time
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className={`w-full max-w-sm ${layout.roundedCard} bg-white p-5 ${layout.cardShadowMd}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111827]">Login to Continue</h2>
          <button
            type="button"
            onClick={closeLoginModal}
            className="rounded-full p-1 text-[#6B7280] hover:bg-[#F3F4F6] active:bg-[#E5E7EB]"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mb-4 text-sm leading-5 text-[#6B7280]">
          Enter your mobile number to access your profile and saved wishlist workers.
        </p>

        <label className="mb-5 block">
          <span className="mb-1.5 block text-xs font-medium text-[#6B7280]">
            Mobile Number
          </span>
          <div
            className={`flex ${layout.touchBtn} items-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]`}
          >
            <span className="border-r border-[#E5E7EB] px-3 text-sm font-medium text-[#111827]">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter 10-digit number"
              maxLength={10}
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              autoFocus
            />
          </div>
        </label>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isValid}
          className={`inline-flex w-full ${layout.touchBtn} items-center justify-center rounded-xl bg-[#2563EB] text-[15px] font-semibold text-white active:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
