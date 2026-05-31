"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const ok = login(passcode);
    if (ok) {
      router.push("/admin/workers");
    } else {
      setError("Invalid passcode");
      setPasscode("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
            <Lock className="size-6" />
          </div>
          <h1 className="text-xl font-semibold text-[#111827]">
            Admin Access
          </h1>
          <p className="text-sm text-[#6B7280]">
            Enter the admin passcode to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
            autoFocus
            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#2563EB]/25"
          />

          {error && (
            <p className="text-center text-sm font-medium text-[#EF4444]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!passcode.trim()}
            className="h-12 w-full rounded-xl bg-[#2563EB] text-sm font-semibold text-white disabled:opacity-40 active:bg-[#1D4ED8]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
