"use client";

import {
  Button,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CommentCreate } from "@/models/community";
import { createCommunityComment } from "@/app/actions/community";
import { useSnackbar } from "@/contexts/SnackbarContext";

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  commentSlug: string;
  onReplyCreated?: () => void;
  commentAuthorName?: string;
}

export default function ReplyModal({
  open,
  onClose,
  commentSlug,
  onReplyCreated,
  commentAuthorName,
}: ReplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { showError, showSuccess } = useSnackbar();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentCreate>({
    defaultValues: {
      content: "",
      comment_slug: commentSlug,
    },
  });

  const watchedContent = watch("content");

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setSubmitError(null);
  };

  const handleClose = () => {
    reset();
    setSubmitError(null);
    onClose();
  };

  const onSubmit = async (data: CommentCreate) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Include the comment_slug in the form data
      const replyData = {
        ...data,
        comment_slug: commentSlug,
      };

      const result = await createCommunityComment(replyData);

      if (result.success) {
        // Reset form on successful submission
        reset();
        showSuccess("Reply posted successfully!");
        // Call the callback to refresh comments
        onReplyCreated?.();
        // Close the modal
        handleClose();
      } else {
        const errorMessage = result.error || "Failed to post reply";
        setSubmitError(errorMessage);
        showError(errorMessage);
        setShowSnackbar(true);
      }
    } catch {
      const errorMessage = "An unexpected error occurred";
      setSubmitError(errorMessage);
      showError(errorMessage);
      setShowSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <Icon icon="mdi:reply" width={24} height={24} color="#1976d2" />
            <Typography variant="h6">
              Reply to {commentAuthorName || "comment"}
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Reply Input */}
            <Controller
              name="content"
              control={control}
              rules={{
                required: "Reply is required",
                maxLength: {
                  value: 280,
                  message: "Reply cannot exceed 280 characters",
                },
              }}
              render={({ field }) => (
                <Stack width="100%">
                  <TextField
                    {...field}
                    multiline
                    rows={4}
                    variant="outlined"
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
                    justifyContent="flex-end"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography
                      variant="caption"
                      color={
                        watchedContent.length > 250
                          ? "error.main"
                          : watchedContent.length > 220
                          ? "warning.main"
                          : "text.secondary"
                      }
                    >
                      {watchedContent.length}/280
                    </Typography>
                  </Stack>
                </Stack>
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="inherit"
            sx={{
              backgroundColor: "white",
              borderRadius: "50px",
              pl: 3,
              pr: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!watchedContent.trim() || isSubmitting}
            sx={{ borderRadius: "20px", pl: 3, pr: 3 }}
          >
            {isSubmitting ? "Posting..." : "Post Reply"}
          </Button>
        </DialogActions>
      </Dialog>

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
