import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tri IQ Coaching | Train Smarter",
    template: "%s | Tri IQ Coaching",
  },
  description:
    "Individual, personalized, science-based triathlon coaching by certified athletes. Optimize your training time and reach your race goals with Tri IQ Coaching.",
  keywords: [
    "triathlon coaching",
    "triathlon training plan",
    "swim bike run",
    "USAT certified coach",
    "Ironman coaching",
    "personalized triathlon coaching",
  ],
  openGraph: {
    title: "Tri IQ Coaching | Train Smarter",
    description:
      "Science-based triathlon coaching for every athlete. Personalized plans, expert guidance, certified coaches.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} antialiased bg-slate-950 text-slate-50`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
