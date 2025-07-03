import { Stack } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Mind Demystified",
  description:
    "Manage your profile, view your posts, and connect with the Mind Demystified community.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="column"
      width="100%"
      sx={{
        backgroundColor: "#FAF9F6",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      {children}
    </Stack>
  );
}
