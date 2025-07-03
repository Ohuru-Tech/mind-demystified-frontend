import { Box, Container } from "@mui/material";
import { LoginModal } from "@/widgets/login/LoginModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Mind Demystified",
  description:
    "Sign in to your Mind Demystified account to access your courses, therapy sessions, and community.",
};

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <Box>
      <Container
        sx={{
          backgroundImage: "url(/hero_bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: { xs: "90vh", md: "120vh" },
        }}
        maxWidth={"xl"}
      ></Container>
      <LoginModal
        open={true}
        redirectTo={redirect || "/learning"}
        renderCloseButton={false}
      />
    </Box>
  );
}
