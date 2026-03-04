"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/coaching", label: "Services" },
  { href: "/coaches", label: "Coaches" },
  { href: "/members", label: "Members" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/92 backdrop-blur-2xl border-b border-slate-800/70 shadow-2xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center group shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/triiq-logo.png"
            alt="Tri IQ Coaching — Train Smarter"
            className="h-8 md:h-10 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors relative pb-0.5 ${
                pathname === link.href
                  ? "text-cyan-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                />
              )}
            </Link>
          ))}
          <a
            href="mailto:coachpete@triiqcoaching.com"
            className="ml-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
          >
            Get Started
          </a>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden p-2 -mr-1 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800/60"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {/* Logo in drawer */}
              <div className="flex justify-center mb-4 pb-4 border-b border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/triiq-logo.png"
                  alt="Tri IQ Coaching"
                  className="h-10 w-auto"
                  style={{ filter: "invert(1) hue-rotate(180deg)" }}
                />
              </div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center py-3.5 text-base font-semibold border-b border-slate-800/50 transition-colors ${
                      pathname === link.href
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-5"
              >
                <a
                  href="mailto:coachpete@triiqcoaching.com"
                  className="block text-center py-3.5 bg-cyan-500 text-slate-950 font-bold rounded-full text-base"
                >
                  Get Started Today
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
