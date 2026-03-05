"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/members-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/members");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Logo / back to home */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Back to Tri IQ home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/triiq-logo.png"
          alt="Tri IQ"
          className="h-7 w-auto"
          style={{ filter: "invert(1) hue-rotate(180deg)" }}
        />
      </Link>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50">

          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Lock size={24} className="text-cyan-400" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">
              Members Area
            </p>
            <h1 className="text-3xl font-black text-white mb-2">
              Welcome Back, Squad
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enter your team password to access exclusive resources, discounts,
              and the race calendar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Team password"
                required
                autoFocus
                className="w-full px-4 py-3.5 pr-12 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-800/80 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  Enter Members Area
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-600 text-xs mt-6">
            Don&apos;t have the password?{" "}
            <a
              href="mailto:coachpete@triiqcoaching.com"
              className="text-slate-400 hover:text-cyan-400 transition-colors underline-offset-2 hover:underline"
            >
              Contact your coach
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function MembersLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
