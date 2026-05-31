"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Users, ChevronLeft } from "lucide-react";
import Link from "next/link";

import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAdmin) {
      router.replace("/admin-login");
    }
  }, [mounted, isAdmin, router]);

  if (!mounted || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-[#6B7280]">Checking access…</p>
      </div>
    );
  }

  const isWorkersList = pathname === "/admin/workers";

  return (
    <div className="mx-auto min-h-screen w-full max-w-lg bg-[#F8FAFC]">
      {/* Admin top bar */}
      <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isWorkersList && (
              <Link
                href="/admin/workers"
                className="flex size-9 items-center justify-center rounded-full text-[#6B7280] active:bg-[#F3F4F6]"
                aria-label="Back to workers"
              >
                <ChevronLeft className="size-5" />
              </Link>
            )}
            <h1 className="text-base font-semibold text-[#111827]">
              ServeHome Admin
            </h1>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace("/admin-login");
            }}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#6B7280] active:bg-[#F3F4F6]"
          >
            <LogOut className="size-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="px-4 py-3">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AdminAuthProvider>
  );
}
