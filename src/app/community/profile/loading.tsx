import { Box, Stack, Skeleton } from "@mui/material";

const ProfileSkeleton = () => (
  <Stack spacing={3}>
    <Stack direction="row" spacing={3} alignItems="center">
      <Skeleton variant="circular" width={80} height={80} />
      <Stack flex={1} spacing={1}>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="80%" height={16} />
      </Stack>
    </Stack>
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

const PostSkeleton = () => (
  <Stack spacing={2} sx={{ p: 3, mb: 2 }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Skeleton variant="circular" width={40} height={40} />
      <Stack flex={1}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} />
      </Stack>
      <Skeleton variant="text" width={60} height={20} />
    </Stack>
    <Stack spacing={1}>
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="70%" height={20} />
    </Stack>
    <Skeleton
      variant="rectangular"
      width="100%"
      height={200}
      sx={{ borderRadius: 1 }}
    />
    <Stack direction="row" spacing={3}>
      <Skeleton variant="text" width={60} height={20} />
      <Skeleton variant="text" width={80} height={20} />
      <Skeleton variant="text" width={60} height={20} />
    </Stack>
  </Stack>
);

export default function ProfileLoading() {
  return (
    <Box
      sx={{
        marginTop: "90px",
        display: "flex",
        maxWidth: "lg",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: { md: "50px", lg: "300px" },
          flexShrink: 0,
          position: "sticky",
          top: "90px",
          height: "fit-content",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          flex: 1,
          px: { xs: 1, md: 4 },
          minHeight: "calc(100vh - 90px)",
          mb: { xs: 8, md: 0 },
        }}
      >
        <Stack spacing={4} width="100%" sx={{ py: 4 }}>
          <ProfileSkeleton />
          <Stack spacing={2}>
            {[1, 2, 3].map((i) => (
              <PostSkeleton key={i} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
