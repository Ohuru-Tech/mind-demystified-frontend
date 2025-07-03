"use client";

import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, Grid, ThemeProvider, Fab, useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react";
import { MindDemystifiedNavBar } from "@/widgets/NavBar";
import {
  CommunityDrawer,
  CommunityDrawerMobile,
} from "@/widgets/community/CommunityDrawer";
import NewPostModal from "@/widgets/community/NewPostModal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getProfile } from "@/app/actions/profile";
import { SnackbarProvider } from "@/contexts/SnackbarContext";

export default function CommunityLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const router = useRouter();
  const themeInstance = theme;
  const isLargeScreen = useMediaQuery(themeInstance.breakpoints.up("lg"));
  const [profile, setProfile] = useState<any>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile();
        if (result.success && result.data) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handlePostCreated = () => {
    // This will be handled by the CommunityFeed component
    // We can emit a custom event to refresh the feed
    window.dispatchEvent(new CustomEvent("post-created"));
  };

  return (
    <html lang={"en"}>
      <body style={{ backgroundColor: "#FEFBF5" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <MindDemystifiedNavBar elevation />
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
                >
                  <CommunityDrawer onPostClick={() => setPostModalOpen(true)} />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    px: { xs: 1, md: 4 },
                    minHeight: "calc(100vh - 90px)",
                    mb: { xs: 8, md: 0 },
                  }}
                >
                  {children}
                </Box>
              </Box>
              <CommunityDrawerMobile />

              {/* Floating Action Button for Post - only visible when drawer post button is not visible */}
              {!isLargeScreen && (
                <Fab
                  color="primary"
                  aria-label="add post"
                  onClick={() => setPostModalOpen(true)}
                  sx={{
                    position: "fixed",
                    bottom: { xs: 80, md: 20 },
                    right: 20,
                    zIndex: 1000,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Icon icon="mdi:plus" width={24} height={24} />
                </Fab>
              )}

              {/* New Post Modal */}
              {profile && (
                <NewPostModal
                  open={postModalOpen}
                  onClose={() => setPostModalOpen(false)}
                  profile={profile}
                  onPostCreated={handlePostCreated}
                />
              )}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
