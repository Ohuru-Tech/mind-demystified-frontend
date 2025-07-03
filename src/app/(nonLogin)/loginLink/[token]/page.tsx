"use client";

import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { login } from "@/app/actions/login";
import { NameModal } from "@/widgets/login/NameModal";
import { AccountsAPIs } from "@/utils/accountsAPIs";

export default function LoginLink() {
  const searchParams = useSearchParams();
  const { token } = useParams();
  const redirectTo = searchParams.get("redirect") as string;
  const router = useRouter();

  const [requiresName, setRequiresName] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const performLogin = async (token: string) => {
    const response = await login(token);
    if (response.success) {
      setRequiresName(response.requires_name);
      setAccessToken(response.access);
      if (!response.requires_name) {
        router.push(redirectTo || "/learning");
      }
    }
  };

  const handleContinue = async (name: string) => {
    await AccountsAPIs().updateProfile(accessToken as string, { name });
    // Dispatch event to notify other components (like NavBar) to refetch profile
    window.dispatchEvent(new CustomEvent("auth-state-changed"));
    router.push(redirectTo || "/learning");
  };

  useEffect(() => {
    if (token) {
      performLogin(token as unknown as string);
    }
  }, [token]);

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        backgroundImage: "url(/hero_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        {!requiresName && (
          <Stack
            direction={"row"}
            spacing={"50px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress size={64} />
            <Typography variant="h1">Logging you in ...</Typography>
          </Stack>
        )}
      </Stack>
      <NameModal open={requiresName} onContinue={handleContinue} />
    </Container>
  );
}
