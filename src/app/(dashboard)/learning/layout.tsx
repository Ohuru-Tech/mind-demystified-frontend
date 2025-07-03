import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Learning - Mind Demystified",
  description:
    "Track your learning progress and access your enrolled courses on Mind Demystified.",
};

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
