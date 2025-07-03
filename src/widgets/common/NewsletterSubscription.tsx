"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { NewsletterAPIs } from "@/utils/newsletterAPIs";

interface NewsletterSubscriptionProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "outlined" | "contained";
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: any;
}

interface NewsletterForm {
  email: string;
}

export default function NewsletterSubscription({
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest updates and insights.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  variant = "outlined",
  size = "medium",
  fullWidth = true,
  sx = {},
}: NewsletterSubscriptionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm>({
    defaultValues: {
      email: "",
    },
  });

  const newsletterAPIs = NewsletterAPIs();

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);
    setShowError(false);

    try {
      await newsletterAPIs.subscribe(data.email);
      setShowSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.email?.[0] ||
          error.response?.data?.message ||
          "Failed to subscribe. Please try again."
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
    <Box sx={sx}>
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
          Successfully subscribed to the newsletter!
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

      <Stack spacing={2}>
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}

        {description && (
          <Typography variant="body2" sx={{ color: "#666" }}>
            {description}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="flex-start"
          >
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
                  fullWidth={fullWidth}
                  placeholder={placeholder}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                  size={size}
                  sx={{ minWidth: { sm: "300px" } }}
                />
              )}
            />

            <Button
              type="submit"
              variant={variant}
              size={size}
              disabled={isSubmitting}
              sx={{
                minWidth: { xs: "100%", sm: "auto" },
                px: 3,
                py: size === "small" ? 1 : 1.5,
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                buttonText
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
