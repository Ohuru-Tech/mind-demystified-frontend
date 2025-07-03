"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { NewsletterAPIs } from "@/utils/newsletterAPIs";

interface UnsubscribeForm {
  email: string;
}

export default function Unsubscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnsubscribeForm>({
    defaultValues: {
      email: "",
    },
  });

  const newsletterAPIs = NewsletterAPIs();

  const onSubmit = async (data: UnsubscribeForm) => {
    setIsSubmitting(true);
    setShowError(false);

    try {
      await newsletterAPIs.unsubscribe(data.email);
      setShowSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to unsubscribe. Please try again."
      );
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully unsubscribed from the newsletter.
          </Alert>
        </Snackbar>

        <Snackbar
          open={showError}
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

        <Paper sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            Unsubscribe from Newsletter
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 4, color: "#666", maxWidth: 400, mx: "auto" }}
          >
            We're sorry to see you go! Enter your email address below to
            unsubscribe from our newsletter.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} alignItems="center">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isSubmitting}
                    sx={{ maxWidth: 400 }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#323232",
                  color: "#FAF9F6",
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#1a1a1a" },
                  "&:disabled": { backgroundColor: "#ccc" },
                }}
              >
                {isSubmitting ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} color="inherit" />
                    <span>Unsubscribing...</span>
                  </Stack>
                ) : (
                  "Unsubscribe"
                )}
              </Button>

              <Typography variant="body2" sx={{ color: "#888", mt: 2 }}>
                Changed your mind?{" "}
                <Typography
                  component="a"
                  href="/"
                  sx={{
                    color: "#323232",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Return to home
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
