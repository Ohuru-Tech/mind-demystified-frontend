"use client";

import { Stack, Typography, Button, Box, Divider } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { getCommunityFeed } from "@/app/actions/community";
import { Post } from "@/models/community";
import PostCard from "./PostCard";
import NewPostCard from "./NewPostCard";
import { CommunityFeedLoadingState } from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";

interface CommunityFeedProps {
  profile: {
    id: number;
    name: string;
    email: string;
    profile: {
      id: number;
      image: string | null;
      bio: string;
      has_community: boolean;
      social_image: string | null;
    };
  };
}

export default function CommunityFeed({ profile }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const fetchPosts = useCallback(
    async (isInitial = false) => {
      try {
        setLoading(true);
        const result = await getCommunityFeed(limit, isInitial ? 0 : offset);

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
          setError(result.error || "Failed to load posts");
        }
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    },
    [limit, offset]
  );

  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts]);

  useEffect(() => {
    const handlePostCreated = () => {
      fetchPosts(true);
    };

    window.addEventListener("post-created", handlePostCreated);
    return () => {
      window.removeEventListener("post-created", handlePostCreated);
    };
  }, [fetchPosts]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(false);
    }
  };

  const handlePostUpdated = () => {
    // Refresh the feed when a post is updated
    fetchPosts(true);
  };

  const handlePostDeleted = () => {
    // Refresh the feed when a post is deleted
    fetchPosts(true);
  };

  const handleCommentCreated = (postId: number) => {
    // Update the comment count for the specific post
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, num_comments: p.num_comments + 1 } : p
      )
    );
  };

  if (error && posts.length === 0) {
    return (
      <ErrorState
        error={error}
        onRetry={() => fetchPosts(true)}
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
      {/* New Post Card */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <NewPostCard profile={profile} />
      </Box>

      {/* Posts Feed */}
      <Stack spacing={{ xs: 0, md: 3 }}>
        {posts.map((post, index) => (
          <Box key={post.id}>
            <PostCard
              post={post}
              profile={profile}
              onCommentCreated={() => handleCommentCreated(post.id)}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
            />
            {index < posts.length - 1 && (
              <Divider
                sx={{
                  mt: 2,
                  mb: 2,
                  borderColor: "divider",
                  display: { xs: "block", lg: "none" },
                }}
              />
            )}
          </Box>
        ))}

        {/* Loading State */}
        {loading && <CommunityFeedLoadingState />}

        {/* Load More Button */}
        {!loading && hasMore && (
          <Stack alignItems="center" sx={{ py: 2 }}>
            <Button variant="outlined" onClick={handleLoadMore}>
              Load More Posts
            </Button>
          </Stack>
        )}

        {/* No More Posts */}
        {!loading && !hasMore && posts.length > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ py: 2 }}
          >
            No more posts to load
          </Typography>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && !error && (
          <EmptyState
            title="No posts yet"
            description="Be the first to share something with the community!"
            icon="mdi:post-outline"
            action={{
              label: "Create Post",
              onClick: () => {
                // Trigger the new post modal
                window.dispatchEvent(new CustomEvent("open-new-post-modal"));
              },
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
