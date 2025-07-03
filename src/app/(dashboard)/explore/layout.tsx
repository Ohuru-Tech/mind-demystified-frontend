import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Courses - Mind Demystified",
  description:
    "Discover and explore our comprehensive catalog of mental health and wellness courses.",
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
