"use client";

import {
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getPostDetailAction,
  getPostCommentsAction,
} from "@/app/actions/community";
import { getProfile } from "@/app/actions/profile";
import { Post, Comment } from "@/models/community";
import PostCard from "@/widgets/community/PostCard";
import CommentCard from "@/widgets/community/CommentCard";
import CommentForm from "@/widgets/community/CommentForm";

export default function PostDetailPage() {
  const params = useParams();
  const postSlug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [commentsOffset, setCommentsOffset] = useState(0);
  const commentsLimit = 10;

  const fetchPost = async () => {
    try {
      setLoading(true);
      const result = await getPostDetailAction(postSlug);

      if (result.success && result.data) {
        setPost(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (isInitial = false) => {
    try {
      setCommentsLoading(true);
      const result = await getPostCommentsAction(
        postSlug,
        commentsLimit,
        isInitial ? 0 : commentsOffset
      );

      if (result.success && result.data) {
        const newComments = result.data.results;
        if (isInitial) {
          setComments(newComments);
        } else {
          setComments((prev) => [...prev, ...newComments]);
        }
        setHasMoreComments(!!result.data.next);
        setCommentsOffset(
          isInitial ? commentsLimit : commentsOffset + commentsLimit
        );
      } else {
        setCommentsError(result.error);
      }
    } catch (err) {
      setCommentsError("Failed to load comments");
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (postSlug) {
        await getProfile();
        await fetchPost();
        await fetchComments(true);
      }
    };

    fetchData();
  }, [postSlug]);

  const handleLoadMoreComments = () => {
    if (!commentsLoading && hasMoreComments) {
      fetchComments(false);
    }
  };

  const handleLike = (postId: number) => {
    // Update the post's like count and status in local state
    if (post) {
      setPost((prevPost) => {
        if (!prevPost) return prevPost;
        return {
          ...prevPost,
          is_liked: !prevPost.is_liked,
          num_likes: prevPost.is_liked
            ? prevPost.num_likes - 1
            : prevPost.num_likes + 1,
        };
      });
    }
  };

  const handleComment = () => {};

  const handleCommentLike = (commentId: number) => {
    // Update the comment's like count and status in local state
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              is_liked: !comment.is_liked,
              num_likes: comment.is_liked
                ? comment.num_likes - 1
                : comment.num_likes + 1,
            }
          : comment
      )
    );
  };

  const handleReply = () => {};

  const handleCommentCreated = () => {
    // Refresh comments when a new comment is created
    fetchComments(true);
  };

  const handlePostUpdated = () => {
    // Refresh the post when it's updated
    fetchPost();
  };

  if (loading || !profile) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading post...
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
        <Button variant="outlined" onClick={fetchPost}>
          Try Again
        </Button>
      </Stack>
    );
  }

  if (!post) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Post not found
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={4} width="100%" sx={{ mt: 4 }}>
      {/* Post */}
      <PostCard
        post={post}
        profile={profile}
        onComment={handleComment}
        onCommentCreated={handleCommentCreated}
        onPostUpdated={handlePostUpdated}
      />

      {/* Comments Section */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          Comments ({post.num_comments})
        </Typography>

        {/* Comment Form */}
        {profile && (
          <CommentForm
            postSlug={post.slug}
            profile={profile}
            onCommentCreated={handleCommentCreated}
            placeholder="Post your reply..."
          />
        )}

        {commentsError && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {commentsError}
          </Alert>
        )}

        {/* Comments List */}
        <Stack spacing={2}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              profile={profile}
              onReply={handleReply}
              onReplyCreated={handleCommentCreated}
            />
          ))}

          {/* Loading State */}
          {commentsLoading && (
            <Stack alignItems="center" sx={{ py: 2 }}>
              <CircularProgress size={24} />
            </Stack>
          )}

          {/* Load More Comments Button */}
          {!commentsLoading && hasMoreComments && (
            <Stack alignItems="center" sx={{ py: 2 }}>
              <Button variant="outlined" onClick={handleLoadMoreComments}>
                Load More Comments
              </Button>
            </Stack>
          )}

          {/* No More Comments */}
          {!commentsLoading && !hasMoreComments && comments.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ py: 2 }}
            >
              No more comments to load
            </Typography>
          )}

          {/* Empty Comments */}
          {!commentsLoading && comments.length === 0 && !commentsError && (
            <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No comments yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to comment on this post!
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
