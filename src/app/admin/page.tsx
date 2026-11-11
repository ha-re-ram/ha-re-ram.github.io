"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export type AdminLoginStatus = "idle" | "submitting" | "success" | "error";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<AdminLoginStatus>("idle");
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("Firebase Auth not initialized. Check your environment variables.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStatus("success");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Failed to login");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <main
      data-auth-status={status}
      className="min-h-screen flex items-center justify-center p-6 relative z-20"
    >
      <div className="max-w-md w-full p-10 border border-white/40 rounded-[2.5rem] bg-white/30 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
        <h1 className="text-4xl font-syne font-black uppercase tracking-tighter mb-8 text-center text-[#1a1a1a]">
          Admin <span className="font-cormorant italic font-light lowercase">Login</span>
        </h1>

        {error && (
          <div
            role="alert"
            className="bg-red-500/20 text-red-700 border border-red-500/30 p-3 mb-4 rounded-xl text-xs font-syne font-bold uppercase tracking-wider text-center"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/60 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-all font-medium disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/60 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              disabled={isSubmitting}
              className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-all font-medium disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 text-[#E5D5D0] font-syne font-bold uppercase tracking-widest py-4 rounded-full transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
