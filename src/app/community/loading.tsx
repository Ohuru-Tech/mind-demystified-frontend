import { Box } from "@mui/material";
import { CommunityFeedLoadingState } from "@/widgets/common/LoadingState";

export default function CommunityLoading() {
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
        <CommunityFeedLoadingState />
      </Box>
    </Box>
  );
}
