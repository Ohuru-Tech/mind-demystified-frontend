"use client";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Post } from "@/models/community";
import Link from "next/link";
import PostReplyModal from "./PostReplyModal";
import EditPostModal from "./EditPostModal";
import {
  deleteCommunityPost,
  likeCommunityPost,
  bookmarkCommunityPost,
} from "@/app/actions/community";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
  profile?: any;
  onLike?: () => void;
  onComment?: () => void;
  onCommentCreated?: () => void;
  onPostUpdated?: () => void;
  onPostDeleted?: () => void;
}

export default function PostCard({
  post,
  profile,
  onLike,
  onComment,
  onCommentCreated,
  onPostUpdated,
  onPostDeleted,
}: PostCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.num_likes);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmarked);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync local state with post prop when it changes
  useEffect(() => {
    setIsLiked(post.is_liked);
    setLikesCount(post.num_likes);
    setIsBookmarked(post.is_bookmarked);
  }, [post.is_liked, post.num_likes, post.is_bookmarked]);

  const handleLike = async () => {
    try {
      const result = await likeCommunityPost(post.slug);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        onLike?.();
      } else {
        console.error("Failed to like post:", result.error);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentClick = () => {
    if (profile) {
      setCommentModalOpen(true);
    } else {
      onComment?.();
    }
  };

  const handleCommentCreated = () => {
    onCommentCreated?.();
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteCommunityPost(post.slug);
      if (result.success) {
        onPostDeleted?.(); // Refresh the feed after post deletion
      } else {
        console.error("Failed to delete post:", result.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const result = await bookmarkCommunityPost(post.slug);
      if (result.success) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error("Failed to bookmark post:", result.error);
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
    }
  };

  const handlePostUpdated = () => {
    onPostUpdated?.(); // Call the parent's onPostUpdated callback
  };

  const isOwnPost = profile && String(post.user.id) === String(profile.id);

  // Mobile Post Card for xs, sm, md
  if (isMobile) {
    return (
      <>
        <Stack direction={"column"} spacing={2} width={"100%"} sx={{ mb: 3 }}>
          {/* Post Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box
              onClick={() => {
                if (profile && post.user.id === profile.id) {
                  router.push("/community/profile");
                } else {
                  router.push(`/community/profile/${post.user.id}`);
                }
              }}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <UserAvatar
                name={post.user.name}
                profileImage={post.user.profile.image}
                size={48}
              />
              <Stack direction="column" spacing={0.5} sx={{ ml: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {post.user.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    {post.activity_time_info}
                  </Typography>
                  {!post.public && (
                    <Chip
                      icon={
                        <Icon
                          icon="mingcute:safe-lock-line"
                          width={16}
                          height={16}
                        />
                      }
                      label="Private"
                      size="small"
                      variant="outlined"
                      sx={{ height: 20, fontSize: "0.7rem" }}
                    />
                  )}
                </Stack>
              </Stack>
            </Box>
            {isOwnPost && (
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  onClick={handleEditClick}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                    },
                  }}
                >
                  <Icon icon="mdi:pencil" width={18} height={18} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDeleteClick}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    },
                  }}
                >
                  <Icon icon="mdi:delete" width={18} height={18} />
                </IconButton>
              </Stack>
            )}
          </Stack>

          {/* Post Content */}
          <Link
            href={`/community/posts/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, cursor: "pointer", color: "primary.main" }}
            >
              {post.content}
            </Typography>
          </Link>

          {/* Post Image */}
          {post.image && (
            <Link
              href={`/community/posts/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "300px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={post.image}
                  alt="Post image"
                  width={600}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </Link>
          )}

          {/* Post Actions */}
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ pt: 1 }}
          >
            <Stack direction={"row"} spacing={3}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <IconButton
                  onClick={handleLike}
                  sx={{
                    color: isLiked ? "error.main" : "text.secondary",
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    },
                  }}
                >
                  <Icon
                    icon={isLiked ? "mdi:heart" : "mdi:heart-outline"}
                    width={24}
                    height={24}
                  />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {likesCount}
                </Typography>
              </Stack>

              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <IconButton
                  onClick={handleCommentClick}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                    },
                  }}
                >
                  <Icon icon="mdi:comment-outline" width={24} height={24} />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {post.num_comments}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={"row"} spacing={1}>
              <IconButton
                onClick={handleBookmark}
                sx={{
                  color: isBookmarked ? "warning.main" : "text.secondary",
                  "&:hover": {
                    backgroundColor: "rgba(255, 193, 7, 0.1)",
                  },
                }}
              >
                <Icon
                  icon={isBookmarked ? "mdi:bookmark" : "mdi:bookmark-outline"}
                  width={24}
                  height={24}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        {/* Comment Modal */}
        {profile && (
          <PostReplyModal
            open={commentModalOpen}
            onClose={() => setCommentModalOpen(false)}
            postSlug={post.slug}
            onCommentCreated={handleCommentCreated}
            postAuthorName={post.user.name}
          />
        )}

        {/* Edit Post Modal */}
        {profile && (
          <EditPostModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            post={post}
            onPostUpdated={handlePostUpdated}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h6">Delete Post</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => setShowDeleteConfirm(false)}
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
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              sx={{ borderRadius: "20px", pl: 3, pr: 3 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  // Desktop Post Card for lg and up
  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        width={"100%"}
        sx={{
          borderColor: "divider",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "2%",
          borderRadius: "20px",
          backgroundColor: "white",
          mb: 3,
        }}
      >
        {/* Post Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box
            onClick={() => {
              if (profile && post.user.id === profile.id) {
                router.push("/community/profile");
              } else {
                router.push(`/community/profile/${post.user.id}`);
              }
            }}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <UserAvatar
              name={post.user.name}
              profileImage={post.user.profile.image}
              size={48}
            />
            <Stack direction="column" spacing={0.5} sx={{ ml: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {post.user.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {post.activity_time_info}
                </Typography>
                {!post.public && (
                  <Chip
                    icon={
                      <Icon
                        icon="mingcute:safe-lock-line"
                        width={16}
                        height={16}
                      />
                    }
                    label="Private"
                    size="small"
                    variant="outlined"
                    sx={{ height: 20, fontSize: "0.7rem" }}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
          {isOwnPost && (
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                onClick={handleEditClick}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                }}
              >
                <Icon icon="mdi:pencil" width={18} height={18} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDeleteClick}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                  },
                }}
              >
                <Icon icon="mdi:delete" width={18} height={18} />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {/* Post Content */}
        <Link
          href={`/community/posts/${post.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.6, cursor: "pointer", color: "primary.main" }}
          >
            {post.content}
          </Typography>
        </Link>

        {/* Post Image */}
        {post.image && (
          <Link
            href={`/community/posts/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "300px",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <Image
                src={post.image}
                alt="Post image"
                width={600}
                height={300}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
          </Link>
        )}

        {/* Post Actions */}
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ pt: 1 }}
        >
          <Stack direction={"row"} spacing={3}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                onClick={handleLike}
                sx={{
                  color: isLiked ? "error.main" : "text.secondary",
                  "&:hover": {
                    backgroundColor: "rgba(244, 67, 54, 0.1)",
                  },
                }}
              >
                <Icon
                  icon={isLiked ? "mdi:heart" : "mdi:heart-outline"}
                  width={24}
                  height={24}
                />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likesCount}
              </Typography>
            </Stack>

            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                onClick={handleCommentClick}
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                  },
                }}
              >
                <Icon icon="mdi:comment-outline" width={24} height={24} />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.num_comments}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <IconButton
              onClick={handleBookmark}
              sx={{
                color: isBookmarked ? "warning.main" : "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(255, 193, 7, 0.1)",
                },
              }}
            >
              <Icon
                icon={isBookmarked ? "mdi:bookmark" : "mdi:bookmark-outline"}
                width={24}
                height={24}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      {/* Comment Modal */}
      {profile && (
        <PostReplyModal
          open={commentModalOpen}
          onClose={() => setCommentModalOpen(false)}
          postSlug={post.slug}
          onCommentCreated={handleCommentCreated}
          postAuthorName={post.user.name}
        />
      )}

      {/* Edit Post Modal */}
      {profile && (
        <EditPostModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          post={post}
          onPostUpdated={handlePostUpdated}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Delete Post</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setShowDeleteConfirm(false)}
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
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: "20px", pl: 3, pr: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
