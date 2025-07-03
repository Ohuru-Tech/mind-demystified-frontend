import { Container, Toolbar, Stack, Skeleton } from "@mui/material";

const SessionCardSkeleton = () => (
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

export default function SessionsLoading() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Stack spacing={4}>
          <Stack alignItems="center" spacing={2}>
            <Skeleton variant="text" width={200} height={48} />
            <Skeleton variant="text" width={300} height={20} />
          </Stack>
          <Stack spacing={3}>
            {[1, 2, 3].map((i) => (
              <SessionCardSkeleton key={i} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
