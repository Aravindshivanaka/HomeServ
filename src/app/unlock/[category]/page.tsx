"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Home, X } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PriceSection } from "@/components/unlock/price-section";
import { TrustSection } from "@/components/unlock/trust-section";
import { UnlockFlow } from "@/components/unlock/unlock-flow";
import { UnlockHero } from "@/components/unlock/unlock-hero";
import { UnlockSummaryCard } from "@/components/unlock/unlock-summary-card";
import { getUnlockPageData } from "@/data/unlock";
import { layout } from "@/lib/layout";
import { isLoggedIn, getUserPhone } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export default function UnlockPage() {
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;
  const { login } = useAuth();

  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedInState] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);

  // Login form state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [loginStep, setLoginStep] = useState(1);
  const [loginError, setLoginError] = useState("");

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const active = isLoggedIn();
    setLoggedInState(active);
    if (active) {
      setPhone(getUserPhone());
    }
    setChecking(false);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone.length === 10) {
      localStorage.setItem("test_phone", loginPhone);
      setLoginStep(2);
      setLoginError("");
    } else {
      setLoginError("Please enter a valid 10-digit number");
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginOtp === "123456") {
      login("+91" + loginPhone);
      setLoggedInState(true);
      setPhone("+91" + loginPhone);
      setLoginError("");
    } else {
      setLoginError("Wrong OTP. Use 123456 for testing");
    }
  };

  const phoneValid = loginPhone.length === 10;

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const data = getUnlockPageData(category);

  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX} pb-24`}>
        {/* Header - ALWAYS VISIBLE */}
        <header className="sticky top-0 z-40 -mx-4 border-b border-[#E5E7EB] bg-white px-4 py-3 flex items-center gap-3">
          <button
            onClick={goBack}
            className="flex items-center justify-center size-11 rounded-full hover:bg-gray-50 active:scale-95 transition-all text-gray-700 focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft className="size-6 text-[#2563EB]" />
          </button>
          <h1 className="text-lg font-semibold text-[#111827]">
            {data ? `Unlock ${data.category.name}` : "Unlock"}
          </h1>
        </header>

        {/* Floating Escape Home Button */}
        <button
          onClick={() => router.push("/")}
          className="fixed bottom-[80px] right-4 z-[999] size-12 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-transform focus:outline-none"
          aria-label="Home"
        >
          <Home className="size-5" />
        </button>

        <main className={`flex flex-col ${layout.sectionGap} py-3 pb-4`}>
          {!data ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm text-gray-500 font-medium">Category not found</p>
              <button
                onClick={goBack}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
              >
                Go Back
              </button>
            </div>
          ) : !loggedIn ? (
            /* Direct Login Form if not logged in */
            <div className="relative w-full max-w-md mx-auto p-6 mt-8 border border-[#E5E7EB] rounded-2xl bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.04)]">
              {/* X Close Button */}
              <button
                onClick={goBack}
                className="absolute top-3 right-3 size-11 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 focus:outline-none"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              {loginError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl font-medium mb-4 border border-red-100">
                  {loginError}
                </div>
              )}

              {loginStep === 1 ? (
                <form onSubmit={handleSend} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Login with Mobile</h2>
                    <p className="text-xs text-gray-500 mt-1">Verify your number to view contact details</p>
                  </div>
                  
                  <div className="flex border border-[#E5E7EB] rounded-xl items-center px-3 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 transition-colors">
                    <span className="text-gray-500 mr-2 font-medium">+91</span>
                    <input
                      className="w-full py-3.5 bg-transparent outline-none text-base text-gray-900"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter mobile number"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      required
                    />
                  </div>
                  
                  <button
                    className="w-full h-12 rounded-xl font-bold text-white transition-all shadow-sm active:scale-98"
                    type="submit"
                    disabled={!phoneValid}
                    style={{
                      backgroundColor: phoneValid ? "#2563EB" : "#9CA3AF",
                      opacity: phoneValid ? 1 : 0.5,
                      cursor: phoneValid ? "pointer" : "not-allowed",
                    }}
                  >
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Enter OTP</h2>
                    <p className="text-sm text-gray-600 mt-1">OTP sent to +91 {loginPhone}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 text-amber-800 p-3 text-xs rounded-xl font-semibold text-center">
                    TEST MODE — Use OTP: 123456
                  </div>

                  <input
                    className="w-full p-3.5 border border-[#E5E7EB] rounded-xl outline-none focus:border-blue-500 bg-gray-50 focus:bg-white text-center text-lg font-bold tracking-widest text-gray-900 transition-colors"
                    type="tel"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                  />

                  <button
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-98"
                    type="submit"
                  >
                    Verify OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("OTP is 123456 (test mode)")}
                    className="text-blue-600 text-sm font-semibold block text-center w-full mt-2 hover:underline"
                  >
                    Resend OTP
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Regular unlock flow content */
            <>
              <UnlockHero />
              <UnlockSummaryCard data={data} />
              <PriceSection feeInr={data.feeInr} categoryName={data.category.name} />
              <UnlockFlow categoryName={data.category.name} />
              <TrustSection points={data.trustPoints} />
            </>
          )}
        </main>
      </div>
    </MobileShell>
  );
}
