"use client";

import React from "react";
import {
  Box,
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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateCommunityPost } from "@/app/actions/community";

interface EditPostModalProps {
  open: boolean;
  onClose: () => void;
  post: any;
  onPostUpdated?: () => void;
}

export default function EditPostModal({
  open,
  onClose,
  post,
  onPostUpdated,
}: EditPostModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{ content: string; public: boolean; image: any }>({
    defaultValues: {
      content: post?.content || "",
      public: post?.public || false,
      image: null,
    },
  });

  const watchedContent = watch("content");
  const watchedImage = watch("image");

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setSubmitError(null);
  };

  const handleImagePick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const handleClose = () => {
    reset();
    setSubmitError(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const onSubmit = async (data: {
    content: string;
    public: boolean;
    image: any;
  }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await updateCommunityPost(post.slug, data);

      if (result.success) {
        reset();
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onPostUpdated?.();
        handleClose();

        // Redirect to the post page to show the updated post
        router.push(`/community/posts/${post.slug}`);
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
            <Typography variant="h6">Edit Post</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="content"
              control={control}
              rules={{
                required: "Content is required",
                maxLength: {
                  value: 280,
                  message: "Content cannot exceed 280 characters",
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
                    justifyContent="space-between"
                    alignItems="center"
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

            {/* Current Image Display */}
            {post.image && !watchedImage && (
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Image:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "200px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={post.image}
                    alt="Current post image"
                    width={400}
                    height={200}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Box>
              </Stack>
            )}

            {/* New Image Preview */}
            {watchedImage && (
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  New Image:
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "200px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={URL.createObjectURL(watchedImage)}
                    alt="New post image"
                    width={400}
                    height={200}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Box>
              </Stack>
            )}

            <Controller
              name="public"
              control={control}
              render={({ field }) => (
                <FormControl size="small">
                  <Select
                    value={field.value ? "public" : "private"}
                    onChange={(e) =>
                      field.onChange(e.target.value === "public")
                    }
                    displayEmpty
                    sx={{
                      borderRadius: "50px",
                      border: "1px solid #CCCCCC",
                      backgroundColor: "white",
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        py: 1,
                        px: 2,
                        paddingRight: "5px !important",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    IconComponent={() => (
                      <Icon
                        icon={"mdi:chevron-down"}
                        width={28}
                        height={28}
                        color={"#323232"}
                        style={{ marginRight: "8px" }}
                      />
                    )}
                  >
                    <MenuItem value="private">
                      <Stack
                        direction={"row"}
                        spacing={"5px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Icon
                          icon={"mdi:lock"}
                          width={22}
                          height={22}
                          style={{
                            paddingBottom: "2px",
                          }}
                          color={"#323232"}
                        />
                        <Typography variant="subtitle2" color={"primary.main"}>
                          Private
                        </Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="public">
                      <Stack
                        direction={"row"}
                        spacing={"5px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Icon
                          icon={"mdi:earth"}
                          width={22}
                          height={22}
                          style={{
                            paddingBottom: "2px",
                          }}
                          color={"#323232"}
                        />
                        <Typography variant="subtitle2" color={"primary.main"}>
                          Public
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            {/* Image Picker */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                startIcon={<Icon icon="mdi:image-outline" />}
                onClick={handleImagePick}
                disabled={isSubmitting}
                sx={{ borderRadius: "20px" }}
              >
                {post.image ? "Change Image" : "Add Image"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Stack>
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
            {isSubmitting ? "Updating..." : "Update Post"}
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
