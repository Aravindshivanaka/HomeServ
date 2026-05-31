"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setStep(2);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
    if (error) setError(error.message);
    else {
      const pending = localStorage.getItem("pending-wishlist-save");
      if (pending) {
        await supabase.from("wishlist").insert({ worker_id: pending, user_phone: email });
        localStorage.removeItem("pending-wishlist-save");
      }
      router.back();
    }
  };

  return (
    <main className="relative max-w-md mx-auto p-6 mt-10 border rounded-xl bg-white shadow-sm">
      <button 
        onClick={() => router.back()} 
        className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center focus:outline-none" 
        aria-label="Close"
      >
        <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <X className="size-4 text-gray-500" />
        </span>
      </button>
      <h1 className="text-xl font-bold mb-4 pr-8">Login with Email</h1>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {step === 1 ? (
        <form onSubmit={handleSend} className="space-y-4">
          <input className="w-full p-3 border rounded-xl" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold" type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <input className="w-full p-3 border rounded-xl" type="text" maxLength={6} placeholder="Enter OTP from email" value={otp} onChange={e => setOtp(e.target.value)} required />
          <button className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold" type="submit">Verify & Login</button>
        </form>
      )}
    </main>
  );
}
