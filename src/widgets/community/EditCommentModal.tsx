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
import { updateCommunityComment } from "@/app/actions/community";
import { useSnackbar } from "@/contexts/SnackbarContext";

interface EditCommentModalProps {
  open: boolean;
  onClose: () => void;
  comment: any;
  onCommentUpdated?: () => void;
}

export default function EditCommentModal({
  open,
  onClose,
  comment,
  onCommentUpdated,
}: EditCommentModalProps) {
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
  } = useForm({
    defaultValues: {
      content: comment?.content || "",
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

  const onSubmit = async (data: { content: string }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateCommunityComment(comment.slug, data.content);

      if (result.success) {
        reset();
        showSuccess("Comment updated successfully!");
        onCommentUpdated?.();
        handleClose();
      } else {
        const errorMessage = result.error || "Failed to update comment";
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
            <Icon icon="mdi:pencil" width={24} height={24} color="#1976d2" />
            <Typography variant="h6">Edit Comment</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
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
                    rows={4}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    error={!!errors.content}
                    helperText={errors.content?.message?.toString()}
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
            {isSubmitting ? "Updating..." : "Update Comment"}
          </Button>
        </DialogActions>
      </Dialog>

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
