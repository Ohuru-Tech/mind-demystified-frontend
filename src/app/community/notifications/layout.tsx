import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications - Mind Demystified",
  description:
    "Stay updated with your community activity and notifications on Mind Demystified.",
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
