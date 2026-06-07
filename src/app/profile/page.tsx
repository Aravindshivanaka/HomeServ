"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileSectionCard } from "@/components/profile/profile-section-card";
import { layout } from "@/lib/layout";
import { isLoggedIn, getUserPhone, logout } from "@/lib/auth";
import { saveUserName } from "@/lib/users";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    setMounted(true);
    const name = localStorage.getItem("user_name") || "";
    setUserName(name);
    setEditValue(name);
  }, []);

  const saveName = async () => {
    if (editValue.trim().length < 2) return;
    const phone = localStorage.getItem("user_phone") || "";
    await saveUserName(phone, editValue.trim());
    localStorage.setItem("user_name", editValue.trim());
    setUserName(editValue.trim());
    setEditing(false);
  };

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
                    <p className="font-semibold text-[#111827]">{userName || "Trusted User"}</p>
                    <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <Phone className="size-3" aria-hidden /> {phone}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">
                    Your Name
                  </p>
                  {!editing ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#111827] font-medium">
                        {userName || "Friend"}
                      </span>
                      <button
                        onClick={() => {
                          setEditValue(userName);
                          setEditing(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                        aria-label="Edit name"
                      >
                        ✏️
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 mt-1">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full text-sm text-[#111827] outline-none"
                        style={{
                          border: "1px solid #DBEAFE",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveName}
                          disabled={editValue.trim().length < 2}
                          className="text-sm font-semibold transition-colors disabled:opacity-50"
                          style={{
                            backgroundColor: "#22C55E",
                            color: "white",
                            borderRadius: "8px",
                            padding: "8px 16px",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className="text-sm font-semibold transition-colors"
                          style={{
                            backgroundColor: "#F1F5F9",
                            color: "#374151",
                            borderRadius: "8px",
                            padding: "8px 16px",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
