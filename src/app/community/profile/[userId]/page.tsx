"use client";

import {
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserProfileAction, getProfile } from "@/app/actions/profile";
import {
  getUserPostsAction,
  sendFollowRequestAction,
} from "@/app/actions/community";
import { Post } from "@/models/community";
import { UserProfile } from "@/models/profile";
import PostCard from "@/widgets/community/PostCard";
import NewPostModal from "@/widgets/community/NewPostModal";
import { FollowButton } from "@/widgets/community/FollowButton";
import {
  LoadingState,
  CommunityFeedLoadingState,
} from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

export default function UserProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const params = useParams();
  const userId = parseInt(params.userId as string);
  const { showError } = useSnackbar();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const result = await getUserProfileAction(userId);
      if (result.success && result.data) {
        setUserProfile(result.data);
      } else {
        setError(result.error || "Failed to load user profile");
        showError(result.error || "Failed to load user profile");
      }
    } catch (error) {
      const errorMessage = "Failed to load user profile";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyProfile = async () => {
    try {
      const result = await getProfile();
      if (result.success && result.data) {
        setMyProfile(result.data);
      }
    } catch (error) {
      console.error("Failed to load my profile");
    }
  };

  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      const result = await getUserPostsAction(userId, 20, 0);
      if (result.success && result.data) {
        setPosts(result.data.results);
      } else {
        setPostsError(result.error || "Failed to load posts");
        showError(result.error || "Failed to load posts");
      }
    } catch (error) {
      const errorMessage = "Failed to load posts";
      setPostsError(errorMessage);
      showError(errorMessage);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchMyProfile();
      fetchPosts();
    }
  }, [userId]);

  const handlePostDeleted = () => {
    fetchPosts();
  };

  const handlePostUpdated = () => {
    fetchPosts();
  };

  const handleNewPostCreated = () => {
    fetchPosts();
    setNewPostModalOpen(false);
  };

  const handleFollowStatusChange = () => {
    // Refresh the user profile when follow status changes
    fetchUserProfile();
  };

  if (loading) {
    return <CommunityFeedLoadingState />;
  }

  if (error) {
    return (
      <ErrorState error={error} onRetry={fetchUserProfile} variant="card" />
    );
  }

  if (!userProfile) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          User not found
        </Typography>
      </Stack>
    );
  }

  const isOwnProfile = myProfile && myProfile.id === userProfile.id;

  return (
    <Stack spacing={4} width="100%" sx={{ py: 4 }}>
      {/* Profile Header - unified with main profile page */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems={{ xs: "flex-start", md: "center" }}
        sx={{
          px: { xs: 2, md: 4 },
          pb: 4,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Profile Image */}
        <Avatar
          src={userProfile.profile.image || userProfile.profile.social_image}
          sx={{
            width: { xs: 90, md: 150 },
            height: { xs: 90, md: 150 },
            fontSize: { xs: "2.5rem", md: "4rem" },
            bgcolor: "#bbb",
          }}
        >
          {userProfile.name?.charAt(0).toUpperCase()}
        </Avatar>

        {/* Main Info */}
        <Stack flex={1} minWidth={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ wordBreak: "break-all" }}
            >
              {userProfile.name}
            </Typography>
            {!isOwnProfile && (
              <FollowButton
                user={userProfile}
                onFollowStatusChange={handleFollowStatusChange}
                showUnfollow={userProfile.is_following}
              />
            )}
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 2 }}>
            <Typography>
              <b>{posts.length}</b> posts
            </Typography>
            <Typography>
              <b>{userProfile.followers_count ?? 0}</b> followers
            </Typography>
            <Typography>
              <b>{userProfile.following_count ?? 0}</b> following
            </Typography>
          </Stack>
          {userProfile.profile.bio && (
            <Typography
              color="text.secondary"
              sx={{ whiteSpace: "pre-line", mt: 2 }}
            >
              {userProfile.profile.bio}
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* Posts Grid */}
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600} sx={{ px: { xs: 2, md: 4 } }}>
          Posts
        </Typography>

        {postsLoading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
          </Stack>
        ) : postsError ? (
          <Alert severity="error" sx={{ mx: { xs: 2, md: 4 } }}>
            {postsError}
          </Alert>
        ) : posts.length === 0 ? (
          <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This user hasn't shared any posts yet.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={{ xs: 0, md: 3 }}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                profile={myProfile}
                onPostDeleted={handlePostDeleted}
                onPostUpdated={handlePostUpdated}
              />
            ))}
          </Stack>
        )}
      </Stack>

      {/* Floating Action Button for Mobile */}
      {isMobile && myProfile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={() => setNewPostModalOpen(true)}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              width: 56,
              height: 56,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <Icon icon="mdi:plus" width={24} height={24} />
          </IconButton>
        </Box>
      )}

      {/* New Post Modal */}
      {myProfile && (
        <NewPostModal
          open={newPostModalOpen}
          onClose={() => setNewPostModalOpen(false)}
          onPostCreated={handleNewPostCreated}
          profile={myProfile}
        />
      )}
    </Stack>
  );
}
