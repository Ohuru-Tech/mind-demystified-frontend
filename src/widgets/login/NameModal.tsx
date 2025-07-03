"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NameField } from "./NameField";
import { useSnackbar } from "@/contexts/SnackbarContext";

type NameForm = {
  name: string;
};

export const NameModal = ({
  open,
  onContinue,
}: {
  open: boolean;
  onContinue: (name: string) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NameForm>({
    defaultValues: {
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { showError, showSuccess } = useSnackbar();

  const onSubmit = async (data: NameForm) => {
    setIsLoading(true);
    setIsError(false);
    try {
      onContinue(data.name);
      showSuccess("Name saved successfully!");
    } catch (error) {
      setIsError(true);
      const errorMessage = "Failed to save name. Please try again.";
      setErrorMessage(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setIsError(false);
  };

  if (isLoading) {
    return (
      <Dialog open={open} maxWidth={"xs"} fullWidth disableEscapeKeyDown>
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{ paddingTop: "10px", paddingBottom: "50px" }}
          spacing={"50px"}
        >
          <Stack direction={"column"} spacing={"30px"} width={"85%"}>
            <Stack direction={"column"} spacing={"10px"} width={"100%"}>
              <Stack direction={"column"} spacing={"1px"} width={"100%"}>
                <Typography variant="h6">What should we call you?</Typography>
                <NameField
                  name="name"
                  control={control}
                  errors={errors}
                  disabled={true}
                />
              </Stack>
            </Stack>
            <CircularProgress />
          </Stack>
        </Stack>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} maxWidth={"xs"} fullWidth disableEscapeKeyDown>
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
      <Stack
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ paddingTop: "50px", paddingBottom: "50px" }}
        spacing={"50px"}
      >
        <Stack direction={"column"} spacing={"25px"} width={"85%"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} spacing={"15px"} width={"100%"}>
              <Stack direction={"column"} spacing={"1px"} width={"100%"}>
                <Typography variant="h6">What should we call you?</Typography>
                <NameField
                  name="name"
                  control={control}
                  errors={errors}
                  disabled={isLoading}
                />
              </Stack>
              {!isLoading && (
                <Button variant={"contained"} type={"submit"}>
                  Continue
                </Button>
              )}
            </Stack>
            {isLoading && <CircularProgress />}
          </form>
        </Stack>
      </Stack>
    </Dialog>
  );
};
