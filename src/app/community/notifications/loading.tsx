import { Box, Stack, Typography, Skeleton } from "@mui/material";

const NotificationSkeleton = () => (
  <Stack direction="row" spacing={2}>
    <Skeleton variant="circular" width={40} height={40} />
    <Stack flex={1} spacing={1}>
      <Skeleton variant="text" width="70%" height={16} />
      <Skeleton variant="text" width="50%" height={14} />
    </Stack>
    <Skeleton variant="text" width={60} height={16} />
  </Stack>
);

export default function NotificationsLoading() {
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
        <Stack spacing={4} width="100%" sx={{ mt: { xs: 2, md: 4 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: { xs: 2, md: 4 } }}
          >
            <Typography variant="h4" fontWeight={600}>
              Notifications
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map((i) => (
              <NotificationSkeleton key={i} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
