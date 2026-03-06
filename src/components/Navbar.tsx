"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Bike, Waves, MapPin } from "lucide-react";

const navLinks = [
  { href: "/coaching", label: "Services" },
  { href: "/coaches", label: "Coaches" },
  { href: "/members", label: "Members" },
];

const eventLinks = [
  {
    href: "/events/indoor-training",
    label: "Indoor Training",
    desc: "Discord-based group trainer rides",
    icon: Bike,
  },
  {
    href: "/events/swim-clinic",
    label: "TriCLE Swim Clinic",
    desc: "Technique clinic + drill resources",
    icon: Waves,
  },
  {
    href: "/events/im-oh-preview",
    label: "IMOH 70.3 Preview Ride",
    desc: "Course preview — June 20, 2026",
    icon: MapPin,
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false); // desktop dropdown
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false); // mobile accordion
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileEventsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEventsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isEventsActive = eventLinks.some((e) => pathname.startsWith(e.href));

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

          {/* ── Events Dropdown ── */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setEventsOpen((o) => !o)}
              className={`flex items-center gap-1 text-sm font-semibold transition-colors relative pb-0.5 ${
                isEventsActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
              }`}
            >
              Events
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${eventsOpen ? "rotate-180" : ""}`}
              />
              {isEventsActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                />
              )}
            </button>

            <AnimatePresence>
              {eventsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-3 w-64 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                >
                  <div className="p-2">
                    {eventLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setEventsOpen(false)}
                        className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all group ${
                          pathname === item.href
                            ? "bg-cyan-500/10"
                            : "hover:bg-slate-800/70"
                        }`}
                      >
                        <div className={`shrink-0 mt-0.5 p-1.5 rounded-lg ${
                          pathname === item.href
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors"
                        }`}>
                          <item.icon size={14} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold leading-tight ${
                            pathname === item.href ? "text-cyan-400" : "text-white"
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact"
            className="ml-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
          >
            Get Started
          </Link>

          {/* ── Social Icons ── */}
          <div className="flex items-center gap-3 ml-1 pl-4 border-l border-slate-700/60">
            <a
              href="https://www.instagram.com/triiqcoaching/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TriIQ on Instagram"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/triiqcoaching"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TriIQ on Facebook"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="https://discord.gg/2k9FGxmFg4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TriIQ on Discord"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
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

              {/* ── Mobile Events Accordion ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="border-b border-slate-800/50"
              >
                <button
                  onClick={() => setMobileEventsOpen((o) => !o)}
                  className={`flex items-center justify-between w-full py-3.5 text-base font-semibold transition-colors ${
                    isEventsActive ? "text-cyan-400" : "text-slate-300"
                  }`}
                >
                  Events
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileEventsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileEventsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-2 flex flex-col gap-1">
                        {eventLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-colors ${
                              pathname === item.href
                                ? "text-cyan-400 bg-cyan-500/10"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <item.icon size={15} className="shrink-0" />
                            <span className="text-sm font-semibold">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-5"
              >
                <Link
                  href="/contact"
                  className="block text-center py-3.5 bg-cyan-500 text-slate-950 font-bold rounded-full text-base"
                >
                  Get Started Today
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="flex justify-center gap-6 mt-5 pt-4 border-t border-slate-800"
              >
                <a
                  href="https://www.instagram.com/triiqcoaching/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TriIQ on Instagram"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/triiqcoaching"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TriIQ on Facebook"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://discord.gg/2k9FGxmFg4"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TriIQ on Discord"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.034.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
