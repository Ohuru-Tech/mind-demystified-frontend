import { Stack } from "@mui/material";

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
