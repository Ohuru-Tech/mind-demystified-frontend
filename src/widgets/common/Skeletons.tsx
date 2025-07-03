import React from "react";
import { Skeleton, Stack, Grid } from "@mui/material";

// Post skeleton loader for community feed
export const PostSkeleton: React.FC = () => (
  <Stack spacing={2} sx={{ p: 3, mb: 2 }}>
    {/* Header with avatar, name, and timestamp */}
    <Stack direction="row" spacing={2} alignItems="center">
      <Skeleton variant="circular" width={40} height={40} />
      <Stack flex={1} spacing={0.5}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={14} />
      </Stack>
      <Skeleton variant="text" width={60} height={16} />
    </Stack>

    {/* Content text */}
    <Stack spacing={1}>
      <Skeleton variant="text" width="100%" height={18} />
      <Skeleton variant="text" width="90%" height={18} />
      <Skeleton variant="text" width="70%" height={18} />
    </Stack>

    {/* Image placeholder */}
    <Skeleton
      variant="rectangular"
      width="100%"
      height={200}
      sx={{ borderRadius: 1 }}
    />

    {/* Action buttons */}
    <Stack direction="row" spacing={3} sx={{ pt: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="text" width={40} height={16} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="text" width={60} height={16} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="text" width={50} height={16} />
      </Stack>
    </Stack>
  </Stack>
);

// Course card skeleton loader
export const CourseCardSkeleton: React.FC = () => (
  <Stack sx={{ height: "100%" }}>
    {/* Course image */}
    <Skeleton variant="rectangular" width="100%" height={200} />

    {/* Course content */}
    <Stack spacing={2} sx={{ p: 3 }}>
      {/* Title */}
      <Skeleton variant="text" width="80%" height={24} />

      {/* Description lines */}
      <Stack spacing={1}>
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="70%" height={16} />
      </Stack>

      {/* Progress section */}
      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={40} height={16} />
        </Stack>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={8}
          sx={{ borderRadius: 4 }}
        />
      </Stack>

      {/* Course stats */}
      <Stack direction="row" spacing={2}>
        <Skeleton variant="text" width={60} height={14} />
        <Skeleton variant="text" width={60} height={14} />
        <Skeleton variant="text" width={60} height={14} />
      </Stack>
    </Stack>
  </Stack>
);

// Community feed skeleton loader
export const CommunityFeedSkeleton: React.FC = () => (
  <Stack spacing={2}>
    {[1, 2, 3].map((i) => (
      <PostSkeleton key={i} />
    ))}
  </Stack>
);

// Course grid skeleton loader
export const CourseGridSkeleton: React.FC = () => (
  <Grid container spacing={3}>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
        <CourseCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Learning page skeleton loader
export const LearningPageSkeleton: React.FC = () => (
  <Stack spacing={4}>
    <Stack alignItems="center" spacing={2}>
      <Skeleton variant="text" width={200} height={48} />
      <Stack direction="row" spacing={1}>
        <Skeleton
          variant="rectangular"
          width={100}
          height={32}
          sx={{ borderRadius: 16 }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={32}
          sx={{ borderRadius: 16 }}
        />
      </Stack>
    </Stack>
    <CourseGridSkeleton />
  </Stack>
);

// Profile skeleton loader
export const ProfileSkeleton: React.FC = () => (
  <Stack spacing={3}>
    {/* Header with avatar and info */}
    <Stack direction="row" spacing={3} alignItems="center">
      <Skeleton variant="circular" width={80} height={80} />
      <Stack flex={1} spacing={1}>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="80%" height={16} />
      </Stack>
    </Stack>

    {/* Stats */}
    <Stack direction="row" spacing={4}>
      <Stack alignItems="center">
        <Skeleton variant="text" width={40} height={24} />
        <Skeleton variant="text" width={60} height={16} />
      </Stack>
      <Stack alignItems="center">
        <Skeleton variant="text" width={40} height={24} />
        <Skeleton variant="text" width={60} height={16} />
      </Stack>
      <Stack alignItems="center">
        <Skeleton variant="text" width={40} height={24} />
        <Skeleton variant="text" width={60} height={16} />
      </Stack>
    </Stack>
  </Stack>
);

// Notification skeleton loader
export const NotificationSkeleton: React.FC = () => (
  <Stack direction="row" spacing={2}>
    <Skeleton variant="circular" width={40} height={40} />
    <Stack flex={1} spacing={1}>
      <Skeleton variant="text" width="70%" height={16} />
      <Skeleton variant="text" width="50%" height={14} />
    </Stack>
    <Skeleton variant="text" width={60} height={16} />
  </Stack>
);

// Session card skeleton loader
export const SessionCardSkeleton: React.FC = () => (
  <Stack spacing={2} sx={{ p: 3, mb: 2 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton
        variant="rectangular"
        width={80}
        height={32}
        sx={{ borderRadius: 1 }}
      />
    </Stack>
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="80%" height={16} />
    <Stack direction="row" spacing={2}>
      <Skeleton variant="text" width={100} height={16} />
      <Skeleton variant="text" width={100} height={16} />
    </Stack>
  </Stack>
);

// Modal skeleton loader
export const ModalSkeleton: React.FC = () => (
  <Stack spacing={3}>
    {/* Header */}
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="circular" width={32} height={32} />
    </Stack>

    {/* Content */}
    <Stack spacing={2}>
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={120}
        sx={{ borderRadius: 1 }}
      />
    </Stack>

    {/* Actions */}
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Skeleton
        variant="rectangular"
        width={80}
        height={36}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={36}
        sx={{ borderRadius: 1 }}
      />
    </Stack>
  </Stack>
);

// Form skeleton loader
export const FormSkeleton: React.FC = () => (
  <Stack spacing={3}>
    <Skeleton variant="text" width="60%" height={24} />
    <Stack spacing={2}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        sx={{ borderRadius: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={120}
        sx={{ borderRadius: 1 }}
      />
    </Stack>
    <Skeleton
      variant="rectangular"
      width={120}
      height={40}
      sx={{ borderRadius: 1 }}
    />
  </Stack>
);
