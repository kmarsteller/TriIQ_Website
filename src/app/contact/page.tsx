"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Flag,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  fitnessLevel: string;
  goalRace: string;
  targetDate: string;
  referral: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  interest?: string;
  fitnessLevel?: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  fitnessLevel: "",
  goalRace: "",
  targetDate: "",
  referral: "",
  notes: "",
};

// ── Field components ──────────────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-slate-300 mb-2">
      {children}
      {required && <span className="text-cyan-400 ml-1">*</span>}
    </label>
  );
}

function InputWrapper({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-slate-800 transition-all";

const inputErrorClass =
  "w-full bg-slate-800/60 border border-red-500/50 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-red-400/60 transition-all";

// ── Main component ────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) {
      e.email = "Your email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.interest) e.interest = "Please select a coaching type.";
    if (!form.fitnessLevel) e.fitnessLevel = "Please select your fitness level.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Let&apos;s Build Your{" "}
            <span className="text-cyan-400">Race Plan</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Fill out the form below and Coach Pete will follow up within 24–48 hours to
            talk about your goals and how Tri IQ can help.
          </p>
        </div>
      </section>

      {/* ── Form / Success ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/15 border border-cyan-500/30 mb-6">
                  <CheckCircle2 size={36} className="text-cyan-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-3">You&apos;re all set!</h2>
                <p className="text-slate-400 text-base leading-relaxed max-w-md mx-auto mb-8">
                  Coach Pete will review your information and reach out within{" "}
                  <span className="text-white font-semibold">24–48 hours</span>. Keep an eye
                  on your inbox — including spam, just in case.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/coaching"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
                  >
                    Explore Coaching Plans
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-semibold rounded-full text-sm transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-6"
                noValidate
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputWrapper error={errors.name}>
                    <Label required>Full Name</Label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Jane Athlete"
                        className={`${errors.name ? inputErrorClass : inputClass} pl-10`}
                        autoComplete="name"
                      />
                    </div>
                  </InputWrapper>

                  <InputWrapper error={errors.email}>
                    <Label required>Email Address</Label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="jane@email.com"
                        className={`${errors.email ? inputErrorClass : inputClass} pl-10`}
                        autoComplete="email"
                      />
                    </div>
                  </InputWrapper>
                </div>

                {/* Phone */}
                <div>
                  <Label>Phone Number <span className="text-slate-500 font-normal">(optional)</span></Label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="(555) 000-0000"
                      className={`${inputClass} pl-10`}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Coaching Interest + Fitness Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputWrapper error={errors.interest}>
                    <Label required>Coaching Interest</Label>
                    <div className="relative">
                      <select
                        value={form.interest}
                        onChange={(e) => set("interest", e.target.value)}
                        className={`${errors.interest ? inputErrorClass : inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="" disabled>Select type…</option>
                        <option value="Triathlon Coaching">Triathlon Coaching</option>
                        <option value="Run Coaching">Run Coaching</option>
                      </select>
                      <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </InputWrapper>

                  <InputWrapper error={errors.fitnessLevel}>
                    <Label required>Current Fitness Level</Label>
                    <div className="relative">
                      <select
                        value={form.fitnessLevel}
                        onChange={(e) => set("fitnessLevel", e.target.value)}
                        className={`${errors.fitnessLevel ? inputErrorClass : inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="" disabled>Select level…</option>
                        <option value="Beginner">Beginner — new to the sport</option>
                        <option value="Intermediate">Intermediate — a few races under my belt</option>
                        <option value="Advanced">Advanced — competitive age-grouper</option>
                      </select>
                      <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                  </InputWrapper>
                </div>

                {/* Goal Race + Target Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Goal Race or Event <span className="text-slate-500 font-normal">(optional)</span></Label>
                    <div className="relative">
                      <Flag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input
                        type="text"
                        value={form.goalRace}
                        onChange={(e) => set("goalRace", e.target.value)}
                        placeholder="e.g. IRONMAN 70.3 Steelhead"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Target Race Date <span className="text-slate-500 font-normal">(optional)</span></Label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input
                        type="text"
                        value={form.targetDate}
                        onChange={(e) => set("targetDate", e.target.value)}
                        placeholder="e.g. June 2026"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* How did you hear */}
                <div>
                  <Label>How did you hear about Tri IQ? <span className="text-slate-500 font-normal">(optional)</span></Label>
                  <div className="relative">
                    <select
                      value={form.referral}
                      onChange={(e) => set("referral", e.target.value)}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="">Select…</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend or Family">Friend or Family</option>
                      <option value="Google">Google</option>
                      <option value="At a Race">At a Race</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label>Anything else to share? <span className="text-slate-500 font-normal">(optional)</span></Label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-3.5 top-4 text-slate-500 pointer-events-none" />
                    <textarea
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Training history, injury history, scheduling constraints, questions…"
                      rows={4}
                      className={`${inputClass} pl-10 resize-none`}
                    />
                  </div>
                </div>

                {/* Server error */}
                {serverError && (
                  <p className="text-sm text-red-400 font-medium bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
                    {serverError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-base transition-all hover:shadow-xl hover:shadow-cyan-500/30 active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send My Intake Form
                      <Send size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-600">
                  <span className="text-cyan-400">*</span> Required fields.
                  Your info is only shared with your coach — never sold or marketed.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
