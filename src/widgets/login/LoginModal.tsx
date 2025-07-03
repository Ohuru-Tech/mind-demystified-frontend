"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { AccountsAPIs } from "@/utils/accountsAPIs";
import { useEffect, useState } from "react";
import { EmailField } from "./EmailField";
import { useScript } from "@/utils/useScript";
import "@/styles/google-sign-in-styles.css";
import { googleSignIn } from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts/SnackbarContext";

type LoginForm = {
  email: string;
};

export const LoginModal = ({
  open,
  onClose,
  redirectTo,
  renderCloseButton = true,
}: {
  open: boolean;
  onClose?: () => void;
  redirectTo?: string;
  renderCloseButton?: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const fullUrl = redirectTo
      ? window.location.origin + redirectTo
      : window.location.origin + "/learning";
    setRedirectUrl(fullUrl);
  }, [redirectTo]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const router = useRouter();
  const { showError, showSuccess } = useSnackbar();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await AccountsAPIs().login(data.email, redirectUrl);
      setIsSuccess(true);
      showSuccess("Login link sent to your email!");
    } catch {
      setIsError(true);
      const errorMessage = "Failed to sign in. Please try again.";
      setErrorMessage(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setIsError(false);
  };

  const handleGoogleSignIn = async ({ credential }: { credential: string }) => {
    try {
      setIsLoading(true);
      const response = await googleSignIn(credential, redirectUrl);
      if (response.success) {
        showSuccess("Successfully signed in!");
        window.dispatchEvent(new Event("auth-state-changed"));
        router.push(response.redirect_to || redirectUrl);
        onClose?.();
      } else {
        showError(response.error || "Failed to sign in with Google");
      }
    } catch {
      showError("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const { ready: isGoogleReady, error: isGoogleError } = useScript(
    "https://accounts.google.com/gsi/client",
    {
      removeOnUnmount: true,
    }
  );

  useEffect(() => {
    if (isGoogleReady && !isGoogleError && open) {
      window.google.accounts.id.initialize({
        client_id:
          "726647153251-8ccmi672d4842babu6bneomtm488daiu.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
        ux_mode: "popup",
        use_fedcm_for_button: true,
      });
      window.google.accounts.id.prompt();
    }
  }, [isGoogleReady, isGoogleError, open]);

  useEffect(() => {
    if (isGoogleReady && !isGoogleError && open) {
      setTimeout(() => {
        const container = document.getElementById("google-signin-container");
        if (container) {
          window.google.accounts.id.renderButton(container, {
            type: "standard",
            shape: "rectangular",
            theme: "outline",
            text: "continue_with",
            width: "368",
            size: "large",
            click_listener: () => {
              setIsLoading(true);
            },
          });
        }
      }, 100);
    }
  }, [isGoogleReady, isGoogleError, open]);

  if (isSuccess) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          width={"98%"}
          mt={"10px"}
        >
          <IconButton onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </IconButton>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{ paddingTop: "10px", paddingBottom: "50px" }}
          spacing={"50px"}
        >
          <Typography variant="h4">Welcome Back</Typography>
          <Stack direction={"column"} spacing={"30px"} width={"85%"}>
            <Stack direction={"column"} spacing={"10px"} width={"100%"}>
              <Stack direction={"column"} spacing={"20px"} width={"100%"}>
                <Typography variant="body1">
                  We've sent you an email with a link to sign in.
                </Typography>
                <Typography variant="body1">
                  Didn't receive an email?
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button variant={"text"} type={"submit"}>
                    Resend email
                  </Button>
                </form>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    );
  }

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          width={"98%"}
          mt={"10px"}
        >
          <IconButton onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </IconButton>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{ paddingTop: "10px", paddingBottom: "50px" }}
          spacing={"50px"}
        >
          <Typography variant="h4">Welcome Back</Typography>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"85%"}
          >
            <CircularProgress />
          </Stack>
        </Stack>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      {renderCloseButton && (
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          width={"98%"}
          mt={"10px"}
        >
          <IconButton onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </IconButton>
        </Stack>
      )}
      <Stack
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ paddingTop: "10px", paddingBottom: "50px" }}
        spacing={"50px"}
      >
        <Typography variant="h4">Welcome Back</Typography>
        <Stack direction={"column"} spacing={"25px"} width={"85%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} spacing={"15px"} width={"100%"}>
              <Stack direction={"column"} spacing={"1px"} width={"100%"}>
                <Typography variant="h6">Email</Typography>
                <EmailField
                  name="email"
                  control={control}
                  errors={errors}
                  disabled={isLoading}
                />
              </Stack>
              {!isLoading && (
                <Button variant={"contained"} type={"submit"}>
                  Continue with Email
                </Button>
              )}
              <Divider />
              <div
                id={"google-signin-container"}
                className="google-signin-container"
                style={{ width: "100%" }}
              ></div>
            </Stack>
            {isLoading && <CircularProgress />}
          </form>
        </Stack>
      </Stack>
    </Dialog>
  );
};
