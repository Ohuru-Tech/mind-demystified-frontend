import { Container, Toolbar, Stack, Skeleton, Grid } from "@mui/material";

const SessionPackageSkeleton = () => (
  <Stack spacing={2} sx={{ p: 3, height: "100%" }}>
    <Skeleton variant="text" width="80%" height={24} />
    <Skeleton variant="text" width="100%" height={16} />
    <Skeleton variant="text" width="90%" height={16} />
    <Skeleton variant="text" width="60%" height={16} />
    <Skeleton
      variant="rectangular"
      width="100%"
      height={100}
      sx={{ borderRadius: 1 }}
    />
    <Skeleton
      variant="rectangular"
      width="100%"
      height={40}
      sx={{ borderRadius: 1 }}
    />
  </Stack>
);

export default function FreeCallLoading() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Stack spacing={4}>
          <Stack alignItems="center" spacing={2}>
            <Skeleton variant="text" width={300} height={48} />
            <Skeleton variant="text" width={400} height={20} />
          </Stack>
          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
                <SessionPackageSkeleton />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}
