"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import UserAvatar from "./UserAvatar";
import { CommentCreate } from "@/models/community";
import { createCommunityComment } from "@/app/actions/community";

interface CommentFormProps {
  postSlug?: string;
  commentSlug?: string;
  profile: any;
  onCommentCreated?: () => void;
  placeholder?: string;
}

export default function CommentForm({
  postSlug,
  commentSlug,
  profile,
  onCommentCreated,
  placeholder = "Post your reply...",
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentCreate>({
    defaultValues: {
      content: "",
      post_slug: postSlug,
      comment_slug: commentSlug,
    },
  });

  const watchedContent = watch("content");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setSubmitError(null);
  };

  const onSubmit = async (data: CommentCreate) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Include the appropriate slug in the form data
      const commentData = {
        ...data,
        post_slug: postSlug,
        comment_slug: commentSlug,
      };

      const result = await createCommunityComment(commentData);

      if (result.success) {
        // Reset form on successful submission
        reset();
        // Call the callback to refresh comments
        onCommentCreated?.();
      } else {
        setSubmitError(result.error);
        setShowSnackbar(true);
      }
    } catch {
      const errorMessage = "An unexpected error occurred";
      setSubmitError(errorMessage);
      setShowSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
            mt: 2,
            mb: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            sx={{ p: 1 }}
          >
            <UserAvatar
              name={profile?.profile?.name}
              profileImage={profile?.profile?.image}
              size={40}
            />
            <Stack
              direction="column"
              spacing={1}
              width="100%"
              alignItems="flex-start"
            >
              <Controller
                name="content"
                control={control}
                rules={{
                  required: "Comment is required",
                  maxLength: {
                    value: 280,
                    message: "Comment cannot exceed 280 characters",
                  },
                }}
                render={({ field }) => (
                  <Stack width="100%">
                    <TextField
                      {...field}
                      multiline
                      placeholder={placeholder}
                      variant={"standard"}
                      sx={{ width: "100%" }}
                      error={!!errors.content}
                      helperText={errors.content?.message}
                      slotProps={{
                        input: {
                          inputProps: { maxLength: 280 },
                        },
                      }}
                    />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 0.5 }}
                    >
                      <Typography
                        variant="caption"
                        color={
                          watchedContent.length > 450
                            ? "error.main"
                            : watchedContent.length > 400
                            ? "warning.main"
                            : "text.secondary"
                        }
                      >
                        {watchedContent.length}/280
                      </Typography>
                      <Button
                        sx={{ borderRadius: "20px", pl: 3, pr: 3 }}
                        variant={"contained"}
                        color={"primary"}
                        onClick={handleSubmit(onSubmit)}
                        disabled={!watchedContent.trim() || isSubmitting}
                        size="small"
                      >
                        {isSubmitting ? "Posting..." : "Post Reply"}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              />
            </Stack>
          </Stack>
        </Box>
        {/* Error Snackbar (unchanged) */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {submitError}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        width={"100%"}
        sx={{
          borderColor: "divider",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "2%",
          borderRadius: "12px",
          backgroundColor: "white",
          mt: 2,
          mb: 2,
        }}
      >
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <UserAvatar
            name={profile?.profile?.name}
            profileImage={profile?.profile?.image}
            size={40}
          />
          <Stack
            direction={"column"}
            spacing={1}
            width={"100%"}
            alignItems={"flex-start"}
          >
            {/* Text Input */}
            <Controller
              name="content"
              control={control}
              rules={{
                required: "Comment is required",
                maxLength: {
                  value: 280,
                  message: "Comment cannot exceed 280 characters",
                },
              }}
              render={({ field }) => (
                <Stack width="100%">
                  <TextField
                    {...field}
                    multiline
                    placeholder={placeholder}
                    variant={"standard"}
                    sx={{ width: "100%" }}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    slotProps={{
                      input: {
                        inputProps: {
                          maxLength: 280,
                        },
                      },
                    }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography
                      variant="caption"
                      color={
                        watchedContent.length > 450
                          ? "error.main"
                          : watchedContent.length > 400
                          ? "warning.main"
                          : "text.secondary"
                      }
                    >
                      {watchedContent.length}/280
                    </Typography>
                    <Button
                      sx={{ borderRadius: "20px", pl: 3, pr: 3 }}
                      variant={"contained"}
                      color={"primary"}
                      onClick={handleSubmit(onSubmit)}
                      disabled={!watchedContent.trim() || isSubmitting}
                      size="small"
                    >
                      {isSubmitting ? "Posting..." : "Post Reply"}
                    </Button>
                  </Stack>
                </Stack>
              )}
            />
          </Stack>
        </Stack>
      </Stack>

      {/* Error Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {submitError}
        </Alert>
      </Snackbar>
    </>
  );
}
