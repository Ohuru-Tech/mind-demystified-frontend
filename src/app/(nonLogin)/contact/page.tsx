"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  TextField,
  Button,
  Grid,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { ContactAPIs } from "@/utils/contactAPIs";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactAPIs = ContactAPIs();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setShowError(false);

    try {
      await contactAPIs.submitContact(data);
      setShowSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
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
    <Box
      sx={{ py: { xs: 4, md: 8 }, minHeight: "100vh", mt: { xs: 12.5, md: 4 } }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
        >
          Contact Us
        </Typography>

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
            Thank you for your message. We'll get back to you soon!
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

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                height: "fit-content",
                borderRadius: "20px",
                borderColor: "divider",
                borderWidth: "1px",
                borderStyle: "solid",
                elevation: 0,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Get in Touch
              </Typography>

              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Icon icon="mdi:email" width={24} height={24} color="#666" />
                  <Box>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      hello@minddemystified.com
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <Icon icon="mdi:phone" width={24} height={24} color="#666" />
                  <Box>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <Icon icon="mdi:clock" width={24} height={24} color="#666" />
                  <Box>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Support Hours
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Mon-Fri: 9AM-6PM EST
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <Icon
                    icon="mdi:map-marker"
                    width={24}
                    height={24}
                    color="#666"
                  />
                  <Box>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      123 Wellness Street
                      <br />
                      Mindful City, MC 12345
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #eee" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Follow Us
                </Typography>
                <Box display="flex" gap={2}>
                  <Icon
                    icon="mdi:facebook"
                    width={24}
                    height={24}
                    color="#666"
                  />
                  <Icon
                    icon="mdi:instagram"
                    width={24}
                    height={24}
                    color="#666"
                  />
                  <Icon
                    icon="mdi:twitter"
                    width={24}
                    height={24}
                    color="#666"
                  />
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "20px",
                borderColor: "divider",
                borderWidth: "1px",
                borderStyle: "solid",
                elevation: 0,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Send us a Message
              </Typography>

              <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
                Have a question or need support? Fill out the form below and
                we'll get back to you as soon as possible.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Full Name"
                          variant="outlined"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
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
                          label="Email"
                          type="email"
                          variant="outlined"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name="subject"
                      control={control}
                      rules={{
                        required: "Subject is required",
                        minLength: {
                          value: 3,
                          message: "Subject must be at least 3 characters",
                        },
                        maxLength: {
                          value: 255,
                          message: "Subject is too long",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Subject"
                          variant="outlined"
                          error={!!errors.subject}
                          helperText={errors.subject?.message}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name="message"
                      control={control}
                      rules={{
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message:
                            "Message must be at least 10 characters long",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Message"
                          multiline
                          rows={6}
                          variant="outlined"
                          error={!!errors.message}
                          helperText={errors.message?.message}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
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
                          <span>Sending...</span>
                        </Stack>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
