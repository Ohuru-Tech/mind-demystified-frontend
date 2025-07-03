import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Skeleton,
} from "@mui/material";
import {
  PostSkeleton,
  CourseCardSkeleton,
  CommunityFeedSkeleton,
  CourseGridSkeleton,
  LearningPageSkeleton,
  ProfileSkeleton,
  NotificationSkeleton,
  SessionCardSkeleton,
  ModalSkeleton,
  FormSkeleton,
} from "./Skeletons";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
  variant?: "spinner" | "skeleton" | "dots";
  fullHeight?: boolean;
  sx?: any;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  size = "medium",
  variant = "spinner",
  fullHeight = false,
  sx = {},
}) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return 24;
      case "large":
        return 48;
      default:
        return 32;
    }
  };

  const getTypographyVariant = () => {
    switch (size) {
      case "small":
        return "body2";
      case "large":
        return "h6";
      default:
        return "body1";
    }
  };

  const renderSpinner = () => (
    <Stack spacing={2} alignItems="center">
      <CircularProgress size={getSize()} />
      {message && (
        <Typography variant={getTypographyVariant()} color="text.secondary">
          {message}
        </Typography>
      )}
    </Stack>
  );

  const renderDots = () => (
    <Stack spacing={2} alignItems="center">
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              animation: "pulse 1.4s ease-in-out infinite both",
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </Box>
      {message && (
        <Typography variant={getTypographyVariant()} color="text.secondary">
          {message}
        </Typography>
      )}
    </Stack>
  );

  const renderSkeleton = () => (
    <Stack spacing={2} width="100%">
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </Stack>
  );

  const renderContent = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "skeleton":
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(fullHeight && { height: "100vh" }),
        ...sx,
      }}
    >
      {renderContent()}
    </Box>
  );
};

// Specialized loading components
export const PageLoadingState: React.FC<{ message?: string }> = ({
  message,
}) => (
  <LoadingState
    message={message || "Loading page..."}
    size="large"
    fullHeight
  />
);

export const CardLoadingState: React.FC<{ message?: string }> = ({
  message,
}) => (
  <LoadingState
    message={message || "Loading..."}
    size="small"
    variant="skeleton"
    sx={{ py: 4 }}
  />
);

export const ButtonLoadingState: React.FC<{ message?: string }> = ({
  message,
}) => (
  <LoadingState message={message || "Loading..."} size="small" variant="dots" />
);

// Specialized skeleton loading components
export const PostLoadingState: React.FC = () => <PostSkeleton />;

export const CourseCardLoadingState: React.FC = () => <CourseCardSkeleton />;

export const CommunityFeedLoadingState: React.FC = () => (
  <CommunityFeedSkeleton />
);

export const CourseGridLoadingState: React.FC = () => <CourseGridSkeleton />;

export const LearningPageLoadingState: React.FC = () => (
  <LearningPageSkeleton />
);

export const ProfileLoadingState: React.FC = () => <ProfileSkeleton />;

export const NotificationLoadingState: React.FC = () => (
  <NotificationSkeleton />
);

export const SessionCardLoadingState: React.FC = () => <SessionCardSkeleton />;

export const ModalLoadingState: React.FC = () => <ModalSkeleton />;

export const FormLoadingState: React.FC = () => <FormSkeleton />;
