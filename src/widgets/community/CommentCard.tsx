"use client";

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Comment } from "@/models/community";
import ReplyModal from "./ReplyModal";
import EditCommentModal from "./EditCommentModal";
import {
  deleteCommunityComment,
  likeCommunityComment,
} from "@/app/actions/community";
import UserAvatar from "./UserAvatar";
import { useSnackbar } from "@/contexts/SnackbarContext";

interface CommentCardProps {
  comment: Comment;
  profile?: {
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
  onLike?: () => void;
  onReply?: () => void;
  onReplyCreated?: () => void;
}

export default function CommentCard({
  comment,
  profile,
  onLike,
  onReply,
  onReplyCreated,
}: CommentCardProps) {
  const router = useRouter();
  const { showError } = useSnackbar();
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likesCount, setLikesCount] = useState(comment.num_likes);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleLike = async () => {
    try {
      const result = await likeCommunityComment(comment.slug);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
        onLike?.();
      } else {
        showError(result.error || "Failed to like comment");
      }
    } catch {
      showError("Failed to like comment");
    }
  };

  const handleReplyClick = () => {
    if (profile) {
      setReplyModalOpen(true);
    } else {
      onReply?.();
    }
  };

  const handleReplyCreated = () => {
    onReplyCreated?.();
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteCommunityComment(comment.slug);
      if (result.success) {
        onReplyCreated?.(); // Refresh the comments
      } else {
        showError(result.error || "Failed to delete comment");
      }
    } catch {
      showError("Failed to delete comment");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleCommentUpdated = () => {
    onReplyCreated?.(); // Refresh the comments
  };

  const handleCommentClick = () => {
    // Navigate to comment detail page
    router.push(`/community/comments/${comment.slug}`);
  };

  const isOwnComment = profile && comment.user.id === profile.id;

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 1,
            mb: 2,
          }}
        >
          {/* Comment Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ p: { xs: 1, md: 2 }, pb: 0.5 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              onClick={() => {
                if (profile && comment.user.id === profile.id) {
                  router.push("/community/profile");
                } else {
                  router.push(`/community/profile/${comment.user.id}`);
                }
              }}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <UserAvatar
                name={comment.user.name}
                profileImage={comment.user.profile.image}
                size={40}
              />
              <Stack direction="column" spacing={0.5} sx={{ ml: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: 16, fontWeight: 600 }}
                >
                  {comment.user.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="caption"
                    sx={{ fontSize: 13, color: "text.secondary" }}
                  >
                    {comment.activity_time_info}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {isOwnComment && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton
                  size="small"
                  onClick={handleEditClick}
                  sx={{
                    color: "text.secondary",
                    "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.1)" },
                  }}
                >
                  <Icon icon="mdi:pencil" width={16} height={16} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleDeleteClick}
                  sx={{
                    color: "text.secondary",
                    "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" },
                  }}
                >
                  <Icon icon="mdi:delete" width={16} height={16} />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </Box>

        {/* Comment Content */}
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.5,
            cursor: "pointer",
            color: "primary.main",
            px: { xs: 1, md: 2 },
            pb: 2,
            pt: 0,
          }}
          onClick={handleCommentClick}
        >
          {comment.content}
        </Typography>

        {/* Comment Actions */}
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ px: { xs: 1, md: 2 }, pt: 1 }}
        >
          <Stack direction={"row"} spacing={3}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                onClick={handleLike}
                size="small"
                sx={{
                  color: isLiked ? "error.main" : "text.secondary",
                  "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" },
                }}
              >
                <Icon
                  icon={isLiked ? "mdi:heart" : "mdi:heart-outline"}
                  width={20}
                  height={20}
                />
              </IconButton>
              <Typography variant="caption" color="text.secondary">
                {likesCount}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                size="small"
                onClick={handleReplyClick}
                sx={{
                  color: "text.secondary",
                  "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.1)" },
                }}
              >
                <Icon icon="mdi:comment-outline" width={20} height={20} />
              </IconButton>
              {comment.num_replies > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {comment.num_replies}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
        {/* Modals and Dialogs (unchanged) */}
        {profile && (
          <ReplyModal
            open={replyModalOpen}
            onClose={() => setReplyModalOpen(false)}
            commentSlug={comment.slug}
            onReplyCreated={handleReplyCreated}
            commentAuthorName={comment.user.name}
          />
        )}
        {profile && (
          <EditCommentModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            comment={comment}
            onCommentUpdated={handleCommentUpdated}
          />
        )}
        <Dialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: "16px" } }}
        >
          <DialogTitle>
            <Typography variant="h6">Delete Comment</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Are you sure you want to delete this comment? This action cannot
              be undone.
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
          borderRadius: "12px",
          backgroundColor: "white",
          mb: 2,
        }}
      >
        {/* Comment Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ pb: 0.5 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => {
              if (profile && comment.user.id === profile.id) {
                router.push("/community/profile");
              } else {
                router.push(`/community/profile/${comment.user.id}`);
              }
            }}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <UserAvatar
              name={comment.user.name}
              profileImage={comment.user.profile.image}
              size={40}
            />
            <Stack direction="column" spacing={0.5} sx={{ ml: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 16, fontWeight: 600 }}
              >
                {comment.user.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="caption"
                  sx={{ fontSize: 13, color: "text.secondary" }}
                >
                  {comment.activity_time_info}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {isOwnComment && (
            <Stack direction="row" spacing={0.5} alignItems="center">
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
                <Icon icon="mdi:pencil" width={16} height={16} />
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
                <Icon icon="mdi:delete" width={16} height={16} />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {/* Comment Content */}
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.6,
            cursor: "pointer",
            color: "primary.main",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={handleCommentClick}
        >
          {comment.content}
        </Typography>

        {/* Comment Actions */}
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ pt: 1 }}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <IconButton
              onClick={handleLike}
              size="small"
              sx={{
                color: isLiked ? "error.main" : "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                },
              }}
            >
              <Icon
                icon={isLiked ? "mdi:heart" : "mdi:heart-outline"}
                width={20}
                height={20}
              />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {likesCount}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              onClick={handleReplyClick}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                },
              }}
            >
              <Icon icon="mdi:comment-outline" width={18} height={18} />
            </IconButton>
            {comment.num_replies > 0 && (
              <Typography variant="caption" color="text.secondary">
                {comment.num_replies}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      {/* Reply Modal */}
      {profile && (
        <ReplyModal
          open={replyModalOpen}
          onClose={() => setReplyModalOpen(false)}
          commentSlug={comment.slug}
          onReplyCreated={handleReplyCreated}
          commentAuthorName={comment.user.name}
        />
      )}

      {/* Edit Comment Modal */}
      {profile && (
        <EditCommentModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          comment={comment}
          onCommentUpdated={handleCommentUpdated}
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
          <Typography variant="h6">Delete Comment</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Are you sure you want to delete this comment? This action cannot be
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
