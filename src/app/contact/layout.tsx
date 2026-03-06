import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact a Coach",
  description:
    "Get started with Tri IQ Coaching. Fill out our intake form and Coach Pete will follow up within 24–48 hours to discuss your goals.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
