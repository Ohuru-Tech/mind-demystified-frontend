"use client";

import {
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getCommentDetailAction,
  getCommentRepliesAction,
} from "@/app/actions/community";
import { getProfile } from "@/app/actions/profile";
import { Comment } from "@/models/community";
import CommentCard from "@/widgets/community/CommentCard";
import CommentForm from "@/widgets/community/CommentForm";

export default function CommentDetailPage() {
  const params = useParams();
  const commentSlug = params.slug as string;

  const [comment, setComment] = useState<Comment | null>(null);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [repliesLoading, setRepliesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repliesError, setRepliesError] = useState<string | null>(null);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [repliesOffset, setRepliesOffset] = useState(0);
  const repliesLimit = 10;

  const fetchComment = async () => {
    try {
      setLoading(true);
      const result = await getCommentDetailAction(commentSlug);

      if (result.success && result.data) {
        setComment(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load comment");
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async (isInitial = false) => {
    try {
      setRepliesLoading(true);
      const result = await getCommentRepliesAction(
        commentSlug,
        repliesLimit,
        isInitial ? 0 : repliesOffset
      );

      if (result.success && result.data) {
        const newReplies = result.data.results;

        if (isInitial) {
          setReplies(newReplies);
        } else {
          setReplies((prev) => [...prev, ...newReplies]);
        }
        setHasMoreReplies(!!result.data.next);
        setRepliesOffset(
          isInitial ? repliesLimit : repliesOffset + repliesLimit
        );
      } else {
        setRepliesError(result.error);
      }
    } catch (err) {
      setRepliesError("Failed to load replies");
    } finally {
      setRepliesLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (commentSlug) {
        // Fetch profile first
        const result = await getProfile();
        const profileData =
          result && result.success && result.data ? result.data : null;
        setProfile(profileData);

        // Then fetch comment and replies
        await fetchComment();
        await fetchReplies(true);
      }
    };

    fetchData();
  }, [commentSlug]);

  const handleLoadMoreReplies = () => {
    if (!repliesLoading && hasMoreReplies) {
      fetchReplies(false);
    }
  };

  const handleReplyLike = (replyId: number) => {
    // Update the reply's like count and status in local state
    setReplies((prevReplies) =>
      prevReplies.map((reply) =>
        reply.id === replyId
          ? {
              ...reply,
              is_liked: !reply.is_liked,
              num_likes: reply.is_liked
                ? reply.num_likes - 1
                : reply.num_likes + 1,
            }
          : reply
      )
    );
  };

  const handleReply = (replyId: number) => {
    // This will be handled by the CommentCard component's reply modal
    // The CommentCard will open the reply modal when the reply button is clicked
  };

  const handleReplyCreated = () => {
    // Refresh replies when a new reply is created
    fetchReplies(true);
  };

  if (loading || !profile) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading comment...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack spacing={2} alignItems="center" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={fetchComment}>
          Try Again
        </Button>
      </Stack>
    );
  }

  if (!comment) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Comment not found
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={4} width="100%" sx={{ mt: 4 }}>
      {/* Comment */}
      <CommentCard
        comment={comment}
        profile={profile}
        onReplyCreated={handleReplyCreated}
      />

      {/* Replies Section */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          Replies ({comment.num_replies})
        </Typography>

        {/* Reply Form */}
        {profile && (
          <CommentForm
            commentSlug={commentSlug}
            profile={profile}
            onCommentCreated={handleReplyCreated}
            placeholder="Post your reply..."
          />
        )}

        {repliesError && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {repliesError}
          </Alert>
        )}

        {/* Replies List */}
        <Stack spacing={2}>
          {replies.map((reply, index) => (
            <Box key={reply.id}>
              <CommentCard
                comment={reply}
                profile={profile}
                onReplyCreated={handleReplyCreated}
              />
              {index < replies.length - 1 && (
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
          {repliesLoading && (
            <Stack alignItems="center" sx={{ py: 2 }}>
              <CircularProgress size={24} />
            </Stack>
          )}

          {/* Load More Replies Button */}
          {!repliesLoading && hasMoreReplies && (
            <Stack alignItems="center" sx={{ py: 2 }}>
              <Button variant="outlined" onClick={handleLoadMoreReplies}>
                Load More Replies
              </Button>
            </Stack>
          )}

          {/* No More Replies */}
          {!repliesLoading && !hasMoreReplies && replies.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ py: 2 }}
            >
              No more replies to load
            </Typography>
          )}

          {/* Empty Replies */}
          {!repliesLoading && replies.length === 0 && !repliesError && (
            <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No replies yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to reply to this comment!
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
