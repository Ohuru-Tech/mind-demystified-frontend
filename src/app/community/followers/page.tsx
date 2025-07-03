"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { UserProfile } from "@/models/profile";
import {
  getFollowersAction,
  getFollowingAction,
} from "@/app/actions/community";
import { UserCard } from "@/widgets/community/UserCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`followers-tabpanel-${index}`}
      aria-labelledby={`followers-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FollowersPage() {
  const [tabValue, setTabValue] = useState(0);
  const [followers, setFollowers] = useState<UserProfile[]>([]);
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followersHasMore, setFollowersHasMore] = useState(true);
  const [followingHasMore, setFollowingHasMore] = useState(true);
  const [followersOffset, setFollowersOffset] = useState(0);
  const [followingOffset, setFollowingOffset] = useState(0);
  const limit = 10;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both followers and following
        const [followersResult, followingResult] = await Promise.all([
          getFollowersAction(limit, 0),
          getFollowingAction(limit, 0),
        ]);

        if (followersResult.success) {
          const followersData =
            followersResult.data.results || followersResult.data;
          setFollowers(followersData);
          setFollowersHasMore(!!followersResult.data.next);
          setFollowersOffset(limit);
        } else {
          setError(followersResult.error || "Failed to fetch followers");
        }

        if (followingResult.success) {
          const followingData =
            followingResult.data.results || followingResult.data;
          setFollowing(followingData);
          setFollowingHasMore(!!followingResult.data.next);
          setFollowingOffset(limit);
        } else {
          setError(followingResult.error || "Failed to fetch following");
        }
      } catch (error) {
        console.error("Error fetching follow data:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowStatusChange = () => {
    // Refresh the data when follow status changes
    setLoading(true);
    Promise.all([
      getFollowersAction(limit, 0),
      getFollowingAction(limit, 0),
    ]).then(([followersResult, followingResult]) => {
      if (followersResult.success) {
        setFollowers(followersResult.data.results || followersResult.data);
        setFollowersHasMore(!!followersResult.data.next);
        setFollowersOffset(limit);
      }
      if (followingResult.success) {
        setFollowing(followingResult.data.results || followingResult.data);
        setFollowingHasMore(!!followingResult.data.next);
        setFollowingOffset(limit);
      }
      setLoading(false);
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLoadMoreFollowers = async () => {
    try {
      const result = await getFollowersAction(limit, followersOffset);
      if (result.success) {
        const newFollowers = result.data.results || result.data;
        setFollowers((prev) => [...prev, ...newFollowers]);
        setFollowersHasMore(!!result.data.next);
        setFollowersOffset((prev) => prev + limit);
      }
    } catch (error) {
      console.error("Error loading more followers:", error);
    }
  };

  const handleLoadMoreFollowing = async () => {
    try {
      const result = await getFollowingAction(limit, followingOffset);
      if (result.success) {
        const newFollowing = result.data.results || result.data;
        setFollowing((prev) => [...prev, ...newFollowing]);
        setFollowingHasMore(!!result.data.next);
        setFollowingOffset((prev) => prev + limit);
      }
    } catch (error) {
      console.error("Error loading more following:", error);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ mt: isMobile ? 2 : 4, px: isMobile ? 2 : 3 }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="md"
        sx={{ mt: isMobile ? 2 : 4, px: isMobile ? 2 : 3 }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ mt: isMobile ? 2 : 4, px: isMobile ? 2 : 3 }}
    >
      <Stack spacing={isMobile ? 2 : 3}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{
            fontSize: isMobile ? "20px" : "inherit",
            fontWeight: 600,
          }}
        >
          Followers & Following
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              "& .MuiTab-root": {
                fontSize: isMobile ? "14px" : "inherit",
                minHeight: isMobile ? "48px" : "inherit",
                textTransform: "none",
                fontWeight: 600,
              },
            }}
          >
            <Tab
              label={`Followers (${followers.length})`}
              id="followers-tab-0"
              aria-controls="followers-tabpanel-0"
            />
            <Tab
              label={`Following (${following.length})`}
              id="followers-tab-1"
              aria-controls="followers-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Stack spacing={isMobile ? 1.5 : 2}>
            {followers.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{
                  fontSize: isMobile ? "14px" : "inherit",
                  py: isMobile ? 4 : 2,
                }}
              >
                No followers yet
              </Typography>
            ) : (
              <>
                {followers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onFollowStatusChange={handleFollowStatusChange}
                    showAcceptReject={user.action_requested} // Show accept/reject only when action is requested
                    showRemoveFollower={!user.is_following} // Show remove follower only if we're not following them back
                    showUnfollow={user.is_following} // Show unfollow if we're following them back
                    isFollowersList={true} // This is the followers list
                  />
                ))}
                {followersHasMore && (
                  <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleLoadMoreFollowers}
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        fontSize: isMobile ? "12px" : "inherit",
                        px: isMobile ? 2 : 3,
                      }}
                    >
                      Load More Followers
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Stack spacing={isMobile ? 1.5 : 2}>
            {following.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{
                  fontSize: isMobile ? "14px" : "inherit",
                  py: isMobile ? 4 : 2,
                }}
              >
                Not following anyone yet
              </Typography>
            ) : (
              <>
                {following.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onFollowStatusChange={handleFollowStatusChange}
                    showFollowButton={!user.action_requested} // Hide follow button if action is requested
                    showAcceptReject={user.action_requested} // Show accept/reject if action is requested
                    showUnfollow={!user.action_requested} // Show unfollow for regular following
                  />
                ))}
                {followingHasMore && (
                  <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleLoadMoreFollowing}
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        fontSize: isMobile ? "12px" : "inherit",
                        px: isMobile ? 2 : 3,
                      }}
                    >
                      Load More Following
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Stack>
        </TabPanel>
      </Stack>
    </Container>
  );
}
