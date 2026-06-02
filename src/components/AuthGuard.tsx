"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export function AuthGuard({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      if (redirectTo) {
        localStorage.setItem("redirect_after_login", redirectTo);
      }
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router, redirectTo]);

  if (!ready) return null;
  return <>{children}</>;
}
