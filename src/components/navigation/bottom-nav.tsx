"use client";

import { Grid2X2, Heart, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const iconMap = {
  home: Home,
  categories: Grid2X2,
  wishlist: Heart,
  profile: User,
};

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md border-t border-[#E5E7EB] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0px_-2px_10px_rgba(17,24,39,0.08)]"
      aria-label="Main navigation"
    >
      <ul className="flex h-16 items-stretch justify-around px-1">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.id];
          const isActive =
            item.id === "home"
              ? pathname === "/"
              : item.id === "categories"
                ? pathname.startsWith("/categories") ||
                  pathname.startsWith("/category")
                : item.id === "wishlist"
                  ? pathname.startsWith("/unlocks") ||
                    pathname.startsWith("/unlock")
                  : pathname.startsWith(item.href);

          return (
            <li key={item.id} className="flex flex-1">
              <Link
                href={item.href}
                onClick={(e) => {
                  if (item.id === "profile" && !user) {
                    e.preventDefault();
                    localStorage.setItem("redirect_after_login", item.href);
                    router.push("/login");
                  }
                }}
                className={cn(
                  "flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1 text-[11px] font-medium leading-none",
                  isActive ? "text-[#2563EB]" : "text-[#6B7280]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex size-7 items-center justify-center">
                  <Icon className="size-[22px]" strokeWidth={isActive ? 2.25 : 2} aria-hidden />
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

