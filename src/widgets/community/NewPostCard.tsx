"use client";

import React from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRef, useState } from "react";
import UserAvatar from "./UserAvatar";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PostCreate } from "@/models/community";
import { createCommunityPost } from "@/app/actions/community";
import { useSnackbar } from "@/contexts/SnackbarContext";

interface NewPostCardProps {
  profile: any;
}

export default function NewPostCard({ profile }: NewPostCardProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { showError, showSuccess } = useSnackbar();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostCreate>({
    defaultValues: {
      content: "",
      image: null,
      public: true,
    },
  });

  const watchedImage = watch("image");
  const watchedContent = watch("content");

  const handleImagePick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setSubmitError(null);
  };

  const onSubmit = async (data: PostCreate) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await createCommunityPost(data);

      if (result.success) {
        // Reset form on successful submission
        reset();
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        showSuccess("Post created successfully!");

        // Redirect to the newly created post
        if (result.data && result.data.slug) {
          router.push(`/community/posts/${result.data.slug}`);
        } else {
          console.error("No slug found in response:", result.data);
          // Fallback: redirect to community page
          router.push("/community");
        }
      } else {
        const errorMessage = result.error || "Failed to create post";
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
      <Stack
        direction={"column"}
        spacing={2}
        width={"100%"}
        sx={{
          borderColor: "divider",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "2%",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <UserAvatar
            name={profile.profile.name}
            profileImage={profile.profile.image}
            size={40}
          />
          <Stack
            direction={"column"}
            spacing={1}
            width={"100%"}
            alignItems={"flex-start"}
          >
            {/* Image Preview */}
            {watchedImage && (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "300px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  mb: 1,
                }}
              >
                <Image
                  src={URL.createObjectURL(watchedImage)}
                  alt="Post image"
                  width={400}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            )}

            {/* Text Input */}
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
                    placeholder={"What's happening?"}
                    variant={"standard"}
                    sx={{ pl: 1, width: "100%" }}
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
                    sx={{ mt: 0.5, px: 1 }}
                  >
                    <Typography
                      variant="caption"
                      color={
                        watchedContent.length > 260
                          ? "error.main"
                          : watchedContent.length > 240
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

            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
                              icon={"mingcute:safe-lock-line"}
                              width={22}
                              height={22}
                              style={{
                                paddingBottom: "2px",
                              }}
                              color={"#323232"}
                            />
                            <Typography
                              variant="subtitle2"
                              color={"primary.main"}
                            >
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
                            <Typography
                              variant="subtitle2"
                              color={"primary.main"}
                            >
                              Public
                            </Typography>
                          </Stack>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <IconButton onClick={handleImagePick} disabled={isSubmitting}>
                  <Icon icon={"mdi:image-outline"} width={24} height={24} />
                </IconButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Stack>
              <Button
                sx={{ borderRadius: "50px", pl: 4, pr: 4 }}
                variant={"contained"}
                color={"primary"}
                onClick={handleSubmit(onSubmit)}
                disabled={!watchedContent.trim() || isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </Stack>

            {/* Error Message */}
            {submitError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {submitError}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
