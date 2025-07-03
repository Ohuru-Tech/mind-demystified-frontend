import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Followers & Following - Mind Demystified",
  description:
    "Manage your followers and following connections in the Mind Demystified community.",
};

export default function FollowersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
