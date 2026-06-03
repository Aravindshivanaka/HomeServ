"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { layout } from "@/lib/layout";
import { isLoggedIn, getUserPhone, logout } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const loggedIn = isLoggedIn();
  const phone = getUserPhone();

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        {/* Header Bar */}
        <header className="sticky top-0 z-40 -mx-4 border-b border-[#E2E8F0] bg-white p-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center size-11 rounded-xl hover:bg-gray-50 active:scale-95 transition-all focus:outline-none"
            aria-label="Home"
          >
            <Home className="size-[22px] text-[#2563EB]" />
          </button>
          
          <h1 className="text-lg font-semibold text-[#111827] absolute left-1/2 -translate-x-1/2">
            My Profile
          </h1>
          
          {/* Spacer to keep title centered */}
          <div className="size-11 pointer-events-none" aria-hidden="true" />
        </header>

        <main className="flex flex-col gap-4 py-4 pb-8">
          {!loggedIn ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="size-12 text-[#9CA3AF] mb-3" aria-hidden />
              <p className="text-sm text-[#6B7280] mb-4">Please log in to view your profile</p>
              <Link href="/login" className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
                Login
              </Link>
            </div>
          ) : (
            <>
              <ProfileSectionCard title="Account Details">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <User className="size-6 text-[#2563EB]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827]">Trusted User</p>
                    <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <Phone className="size-3" aria-hidden /> {phone}
                    </p>
                  </div>
                </div>
              </ProfileSectionCard>

              <button
                onClick={logout}
                className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] text-sm font-semibold text-[#EF4444] active:bg-[#FEE2E2]"
              >
                <LogOut className="size-4" aria-hidden />
                Logout
              </button>
            </>
          )}
        </main>
      </div>
    </MobileShell>
  );
}
