"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getAndClearRedirectUrl } from "@/lib/auth";
import { getUserByPhone, saveUserName } from "@/lib/users";

import { MobileShell } from "@/components/layout/mobile-shell";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [enteredName, setEnteredName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      localStorage.setItem("test_phone", phone);
      setStep(2);
      setError("");
    } else setError("Please enter a valid 10-digit number");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      const fullPhone = "+91" + phone;
      try {
        const userObj = await getUserByPhone(fullPhone);
        if (userObj && userObj.display_name) {
          login(fullPhone);
          localStorage.setItem("user_name", userObj.display_name);
          const redirectUrl = getAndClearRedirectUrl();
          router.push(redirectUrl);
        } else {
          setStep(3);
        }
      } catch (err) {
        console.error("Error during verification:", err);
        setStep(3);
      }
    } else setError("Wrong OTP. Use 123456 for testing");
  };

  const handleNameSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = enteredName.trim().length >= 2 ? enteredName.trim() : "Friend";
    const fullPhone = "+91" + phone;
    try {
      await saveUserName(fullPhone, finalName);
      login(fullPhone);
      localStorage.setItem("user_name", finalName);
      const redirectUrl = getAndClearRedirectUrl();
      router.push(redirectUrl);
    } catch (err) {
      console.error("Error saving name:", err);
      login(fullPhone);
      localStorage.setItem("user_name", finalName);
      const redirectUrl = getAndClearRedirectUrl();
      router.push(redirectUrl);
    }
  };

  const phoneValid = phone.length === 10;
  const isNameInvalid = enteredName.trim().length > 0 && enteredName.trim().length < 2;

  return (
    <MobileShell>
      <main className="relative max-w-md mx-auto p-6 mt-10 border rounded-xl bg-white shadow-sm">
        <button onClick={() => router.back()} className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center" aria-label="Close">
          <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"><X className="size-4 text-gray-500" /></span>
        </button>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleSend} className="space-y-4">
            <h1 className="text-xl font-bold">Login with Mobile</h1>
            <div className="flex border rounded-xl items-center px-3">
              <span className="text-gray-500 mr-2">+91</span>
              <input
                className="w-full py-3 outline-none"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                required
              />
            </div>
            <button
              className="w-full p-3 rounded-xl font-semibold text-white transition-colors"
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
        ) : step === 2 ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <h1 className="text-xl font-bold">Enter OTP</h1>
            <p className="text-sm text-gray-600">OTP sent to +91 {phone}</p>
            <div className="bg-yellow-100 text-yellow-800 p-2 text-xs rounded-lg font-medium">TEST MODE — Use OTP: 123456</div>
            <input
              className="w-full p-3 border rounded-xl"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
            />
            <button className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold" type="submit">Verify OTP</button>
            <button type="button" onClick={() => alert("OTP is 123456 (test mode)")} className="text-blue-600 text-sm block text-center w-full">Resend OTP</button>
          </form>
        ) : (
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <h1 className="text-xl font-bold">What should we call you?</h1>
            <p className="text-sm text-gray-600">Please enter your name to personalize your experience.</p>
            <input
              className="w-full p-3 border rounded-xl"
              type="text"
              maxLength={20}
              placeholder="Enter your name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
            <button
              className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              type="submit"
              disabled={isNameInvalid}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => {
                setEnteredName("Friend");
                handleNameSubmit();
              }}
              className="text-blue-600 text-sm block text-center w-full mt-2 hover:underline"
            >
              Skip for now
            </button>
          </form>
        )}
      </main>
    </MobileShell>
  );
}
