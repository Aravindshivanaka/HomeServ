"use client";

import { useEffect, useState } from "react";
import { User, Phone, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth-context";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { layout } from "@/lib/layout";

export default function ProfilePage() {
  const { user, logout, openLoginModal } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      openLoginModal();
    }
  }, [user, openLoginModal, mounted]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (!mounted) return null;

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        <header className="sticky top-0 z-40 -mx-4 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
          <h1 className="text-lg font-semibold leading-6 text-[#111827]">
            My Profile
          </h1>
        </header>

        <main className={`flex flex-col ${layout.sectionGap} py-4 pb-8`}>
          {!user ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="size-12 text-[#9CA3AF] mb-3" aria-hidden />
              <p className="text-sm text-[#6B7280] mb-4">Please log in to view your profile</p>
              <button 
                onClick={() => openLoginModal()}
                className={`inline-flex ${layout.touchBtn} items-center justify-center rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white active:bg-[#1D4ED8]`}
              >
                Login
              </button>
            </div>
          ) : (
            <>
              <ProfileSectionCard title="Account Details">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <User className="size-6 text-[#2563EB]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827]">{user.name}</p>
                    <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <Phone className="size-3" aria-hidden /> +91 {user.mobile}
                    </p>
                  </div>
                </div>
              </ProfileSectionCard>

              <ProfileSectionCard title="Shortcuts">
                <Link 
                  href="/unlocks" 
                  className={`flex ${layout.touchBtn} items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 text-sm font-medium text-[#111827] active:bg-[#F1F5F9]`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 fill-[#EF4444] text-[#EF4444]" aria-hidden />
                    <span>My Wishlist</span>
                  </div>
                  <span className="text-xs font-semibold text-[#2563EB]">View</span>
                </Link>
              </ProfileSectionCard>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`flex w-full ${layout.touchBtn} items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] text-sm font-semibold text-[#EF4444] active:bg-[#FEE2E2]`}
                >
                  <LogOut className="size-4" aria-hidden />
                  Logout
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </MobileShell>
  );
}
