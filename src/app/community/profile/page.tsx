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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/app/actions/profile";
import { getMyPostsAction } from "@/app/actions/community";
import { updateProfileAction } from "@/app/actions/profile";
import { Post } from "@/models/community";
import { UserProfile } from "@/models/profile";
import PostCard from "@/widgets/community/PostCard";
import UserAvatar from "@/widgets/community/UserAvatar";
import NewPostModal from "@/widgets/community/NewPostModal";
import {
  LoadingState,
  CommunityFeedLoadingState,
} from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

export default function MyProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { showError } = useSnackbar();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await getProfile();
      if (result.success && result.data) {
        setProfile(result.data);
        setEditForm({
          name: result.data.name || "",
          bio: result.data.profile.bio || "",
          image: null,
        });
      } else {
        setError(result.error || "Failed to load profile");
        showError(result.error || "Failed to load profile");
      }
    } catch (error) {
      const errorMessage = "Failed to load profile";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      const result = await getMyPostsAction(20, 0);
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
    fetchProfile();
    fetchPosts();
  }, []);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setEditForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else if (file) {
      console.error("Invalid file type:", file.type);
      setUpdateError("Please select a valid image file");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      setUpdateError(null);

      const updateData: any = {};
      if (editForm.name !== profile?.name) updateData.name = editForm.name;
      if (editForm.bio !== profile?.profile.bio) updateData.bio = editForm.bio;
      if (editForm.image && editForm.image instanceof File) {
        updateData.image = editForm.image;
      }

      if (Object.keys(updateData).length === 0) {
        setEditModalOpen(false);
        return;
      }

      const result = await updateProfileAction(updateData);
      if (result.success && result.data) {
        setProfile(result.data);
        setEditModalOpen(false);
        // Refresh profile data
        fetchProfile();
        // Dispatch event to notify other components (like NavBar) to refetch profile
        window.dispatchEvent(new CustomEvent("auth-state-changed"));
      } else {
        setUpdateError(result.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateError("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

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

  if (loading) {
    return <CommunityFeedLoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchProfile} variant="card" />;
  }

  if (!profile) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Profile not found
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={4} width="100%" sx={{ py: 4 }}>
      {/* Profile Header - Instagram style, name only, edit button far right */}
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
          src={profile.profile?.image || profile.profile?.social_image}
          sx={{
            width: { xs: 90, md: 150 },
            height: { xs: 90, md: 150 },
            fontSize: { xs: "2.5rem", md: "4rem" },
            bgcolor: "#bbb",
          }}
        >
          {profile.name?.charAt(0).toUpperCase()}
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
              {profile.name}
            </Typography>
            {isMobile ? (
              <IconButton
                onClick={handleEditClick}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <Icon icon="mdi:pencil" width={20} height={20} />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                onClick={handleEditClick}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  boxShadow: "none",
                }}
              >
                Edit Profile
              </Button>
            )}
          </Stack>
          <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 2 }}>
            <Typography>
              <b>{posts.length}</b> posts
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
              onClick={() => router.push("/community/followers")}
            >
              <b>{profile.followers_count ?? 0}</b> followers
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
              }}
              onClick={() => router.push("/community/followers")}
            >
              <b>{profile.following_count ?? 0}</b> following
            </Typography>
          </Stack>
          {profile.profile?.bio && (
            <Typography
              color="text.secondary"
              sx={{ whiteSpace: "pre-line", mt: 2 }}
            >
              {profile.profile.bio}
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
              Share your first post with the community!
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={{ xs: 0, md: 3 }}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                profile={profile}
                onPostDeleted={handlePostDeleted}
                onPostUpdated={handlePostUpdated}
              />
            ))}
          </Stack>
        )}
      </Stack>

      {/* New Post Modal */}
      {profile && (
        <NewPostModal
          open={newPostModalOpen}
          onClose={() => setNewPostModalOpen(false)}
          onPostCreated={handleNewPostCreated}
          profile={profile}
        />
      )}

      {/* Edit Profile Modal */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Edit Profile</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            {/* Profile Image */}
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={
                  imagePreview ||
                  profile.profile.image ||
                  profile.profile.social_image
                }
                sx={{ width: 80, height: 80, fontSize: "2rem" }}
              >
                {profile.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Button
                component="label"
                variant="outlined"
                size="small"
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </Button>
            </Stack>

            {/* Name */}
            <TextField
              label="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
              variant="outlined"
            />

            {/* Bio */}
            <TextField
              label="Bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, bio: e.target.value }))
              }
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />

            {updateError && <Alert severity="error">{updateError}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setEditModalOpen(false)}
            variant="outlined"
            color="inherit"
            sx={{
              backgroundColor: "white",
              borderRadius: "50px",
              pl: 3,
              pr: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            variant="contained"
            disabled={isUpdating}
            sx={{ borderRadius: "50px", pl: 3, pr: 3 }}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
