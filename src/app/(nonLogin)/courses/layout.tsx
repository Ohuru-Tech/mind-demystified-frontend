import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses - Mind Demystified",
  description:
    "Explore our curated catalog of transformative spiritual courses and certifications for holistic wellness.",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
