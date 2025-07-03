"use client";

import { Box, Stack, Typography } from "@mui/material";
import { CommunityFeedLoadingState } from "@/widgets/common/LoadingState";
import { useTheme, useMediaQuery } from "@mui/material";

export default function BookmarksLoading() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Stack spacing={2} sx={{ mb: isMobile ? 4 : 3 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="primary.main"
            sx={{ fontSize: isMobile ? "20px" : "inherit" }}
          >
            Bookmarks
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ visibility: { xs: "hidden", md: "visible" } }}
          >
            Your saved posts and articles
          </Typography>
        </Stack>
        <CommunityFeedLoadingState />
      </Box>
    </Box>
  );
}
