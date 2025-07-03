import { Box, Container } from "@mui/material";
import { LoginModal } from "@/widgets/login/LoginModal";

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
