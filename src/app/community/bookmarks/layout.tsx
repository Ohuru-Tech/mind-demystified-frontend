import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks - Mind Demystified",
  description:
    "Access your saved posts and articles in the Mind Demystified community.",
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
