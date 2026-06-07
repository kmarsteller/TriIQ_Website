import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Question",
  description:
    "Have a quick question for your Tri IQ coach? Send it over and we'll get back to you within 24–48 hours.",
};

export default function AskQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
