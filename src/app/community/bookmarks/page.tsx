"use client";

import {
  Stack,
  Typography,
  CircularProgress,
  Button,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getBookmarksAction, likeCommunityPost } from "@/app/actions/community";
import { Post } from "@/models/community";
import PostCard from "@/widgets/community/PostCard";
import { getProfile } from "@/app/actions/profile";
import { CommunityFeedLoadingState } from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

export default function BookmarksPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 10;
  const { showError } = useSnackbar();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const fetchBookmarks = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const result = await getBookmarksAction(limit, isInitial ? 0 : offset);

      if (result.success && result.data) {
        const newPosts = result.data.results;
        if (isInitial) {
          setPosts(newPosts);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }
        setHasMore(!!result.data.next);
        setOffset(isInitial ? limit : offset + limit);
      } else {
        setError(result.error || "Failed to load bookmarks");
        showError(result.error || "Failed to load bookmarks");
      }
    } catch (err) {
      const errorMessage = "Failed to load bookmarks";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBookmarks(true);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchBookmarks(false);
    }
  };

  const handlePostCreated = () => {
    // Refresh the bookmarks when a new post is created
    fetchBookmarks(true);
  };

  const handlePostUpdated = () => {
    // Refresh the bookmarks when a post is updated
    fetchBookmarks(true);
  };

  const handlePostDeleted = () => {
    // Refresh the bookmarks when a post is deleted
    fetchBookmarks(true);
  };

  const handleLike = async (postId: number) => {
    // Find the post by ID and like it
    const post = posts.find((p) => p.id === postId);
    if (post) {
      try {
        const result = await likeCommunityPost(post.slug);
        if (result.success) {
          // Update the post in the local state
          setPosts((prevPosts) =>
            prevPosts.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    is_liked: !p.is_liked,
                    num_likes: p.is_liked ? p.num_likes - 1 : p.num_likes + 1,
                  }
                : p
            )
          );
        } else {
          console.error("Failed to like post:", result.error);
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const handleComment = (postId: number) => {
    // This will be handled by the PostCard component's comment modal
  };

  const handleCommentCreated = (postId: number) => {
    // Update the comment count for the specific post
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, num_comments: p.num_comments + 1 } : p
      )
    );
  };

  if (loading && posts.length === 0) {
    return <CommunityFeedLoadingState />;
  }

  if (error && posts.length === 0) {
    return (
      <ErrorState
        error={error}
        onRetry={() => fetchBookmarks(true)}
        variant="card"
      />
    );
  }

  return (
    <Stack
      spacing={{ xs: 0, md: 3 }}
      width="100%"
      sx={{ mt: { xs: 2, md: 4 } }}
    >
      {/* Page Header */}
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

      {/* Bookmarks Feed */}
      <Stack spacing={isMobile ? 2 : { xs: 0, md: 3 }}>
        {posts.map((post, index) => (
          <Box key={post.id}>
            <PostCard
              post={post}
              profile={profile}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
              onCommentCreated={() => handleCommentCreated(post.id)}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
            />
            {index < posts.length - 1 && (
              <Divider
                sx={{
                  mt: isMobile ? 2 : 2,
                  mb: isMobile ? 2 : 2,
                  borderColor: "divider",
                  display: { xs: "block", lg: "none" },
                }}
              />
            )}
          </Box>
        ))}

        {/* Loading State */}
        {loadingMore && (
          <Stack alignItems="center" sx={{ py: 2 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Loading more bookmarks...
            </Typography>
          </Stack>
        )}

        {/* Load More Button */}
        {!loadingMore && hasMore && (
          <Stack alignItems="center" sx={{ py: 2 }}>
            <Button
              variant="outlined"
              onClick={handleLoadMore}
              size={isMobile ? "small" : "medium"}
              disabled={loadingMore}
              sx={{
                fontSize: isMobile ? "12px" : "inherit",
                px: isMobile ? 2 : 3,
              }}
            >
              {loadingMore ? "Loading..." : "Load More Bookmarks"}
            </Button>
          </Stack>
        )}

        {/* No More Posts */}
        {!loadingMore && !hasMore && posts.length > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
              py: 2,
              fontSize: isMobile ? "12px" : "inherit",
            }}
          >
            No more bookmarks to load
          </Typography>
        )}

        {/* Empty State */}
        {!loading && !loadingMore && posts.length === 0 && !error && (
          <EmptyState
            title="No bookmarks yet"
            description="Start bookmarking posts you want to save for later!"
            icon="mdi:bookmark-outline"
            variant="card"
          />
        )}
      </Stack>
    </Stack>
  );
}
