"use server";

import { getSession } from "@/app/lib/session";
import {
  createPost as createPostAPI,
  createComment as createCommentAPI,
  updatePost as updatePostAPI,
  deletePost as deletePostAPI,
  likePost as likePostAPI,
  bookmarkPost as bookmarkPostAPI,
  updateComment as updateCommentAPI,
  deleteComment as deleteCommentAPI,
  likeComment as likeCommentAPI,
  getFeed as getFeedAPI,
  getPostDetail as getPostDetailAPI,
  getPostComments as getPostCommentsAPI,
  getCommentDetail as getCommentDetailAPI,
  getCommentReplies as getCommentRepliesAPI,
  getMyPosts as getMyPostsAPI,
  getUserPosts as getUserPostsAPI,
  getBookmarks as getBookmarksAPI,
  sendFollowRequest as sendFollowRequestAPI,
  acceptFollowRequest as acceptFollowRequestAPI,
  rejectFollowRequest as rejectFollowRequestAPI,
  getFollowers as getFollowersAPI,
  getFollowing as getFollowingAPI,
  unfollowUser as unfollowUserAPI,
  removeFollower as removeFollowerAPI,
} from "@/utils/communityAPIs";
import { PostCreate, CommentCreate } from "@/models/community";
import { axiosInstance } from "@/utils/axiosInstance";

import { ErrorHandler } from "@/utils/errorHandler";

export async function createCommunityPost(postData: PostCreate) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await createPostAPI(session.access, postData);
    return { success: true, data: result };
  } catch (error: unknown) {
    const appError = ErrorHandler.handle(error);
    console.error("Error creating post:", appError);
    return {
      success: false,
      error: appError.message,
    };
  }
}

export async function createCommunityComment(commentData: CommentCreate) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await createCommentAPI(session.access, commentData);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create comment",
    };
  }
}

export async function updateCommunityPost(
  postSlug: string,
  postData: { content: string; public: boolean; image?: any }
) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await updatePostAPI(session.access, postSlug, postData);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error updating post:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update post",
    };
  }
}

export async function deleteCommunityPost(postSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    await deletePostAPI(session.access, postSlug);
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete post",
    };
  }
}

export async function likeCommunityPost(postSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await likePostAPI(session.access, postSlug);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error liking post:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to like post",
    };
  }
}

export async function bookmarkCommunityPost(postSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await bookmarkPostAPI(session.access, postSlug);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error bookmarking post:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to bookmark post",
    };
  }
}

export async function updateCommunityComment(
  commentSlug: string,
  content: string
) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await updateCommentAPI(session.access, commentSlug, content);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error updating comment:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update comment",
    };
  }
}

export async function deleteCommunityComment(commentSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    await deleteCommentAPI(session.access, commentSlug);
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete comment",
    };
  }
}

export async function likeCommunityComment(commentSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await likeCommentAPI(session.access, commentSlug);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error liking comment:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to like comment",
    };
  }
}

export async function getCommunityFeed(limit?: number, offset?: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getFeedAPI(session.access, limit, offset);
    return { success: true, data: result };
  } catch (error: unknown) {
    const appError = ErrorHandler.handle(error);
    console.error("Error fetching feed:", appError);
    return {
      success: false,
      error: appError.message,
    };
  }
}

export async function getPostDetailAction(postSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getPostDetailAPI(session.access, postSlug);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching post detail:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch post detail",
    };
  }
}

export async function getPostCommentsAction(
  postSlug: string,
  limit?: number,
  offset?: number
) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getPostCommentsAPI(
      session.access,
      postSlug,
      limit,
      offset
    );
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching post comments:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch post comments",
    };
  }
}

export async function getCommentDetailAction(commentSlug: string) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getCommentDetailAPI(session.access, commentSlug);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching comment detail:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch comment detail",
    };
  }
}

export async function getCommentRepliesAction(
  commentSlug: string,
  limit?: number,
  offset?: number
) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getCommentRepliesAPI(
      session.access,
      commentSlug,
      limit,
      offset
    );
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching comment replies:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch comment replies",
    };
  }
}

export async function getMyPostsAction(limit?: number, offset?: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getMyPostsAPI(session.access, limit, offset);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching my posts:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch my posts",
    };
  }
}

export async function getUserPostsAction(
  userId: number,
  limit?: number,
  offset?: number
) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getUserPostsAPI(session.access, userId, limit, offset);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching user posts:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch user posts",
    };
  }
}

export async function getBookmarksAction(limit?: number, offset?: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getBookmarksAPI(session.access, limit, offset);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch bookmarks",
    };
  }
}

export async function getNotifications(limit: number = 10, offset: number = 0) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const response = await axiosInstance.get(
      `/community/notifications/?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch notifications",
    };
  }
}

export async function markNotificationsAsRead(notificationIds: number[]) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const response = await axiosInstance.post(
      "/community/notifications/read/",
      {
        notification_ids: notificationIds,
      },
      {
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error marking notifications as read:", error);
    return {
      success: false,
      error:
        error.response?.data?.message || "Failed to mark notifications as read",
    };
  }
}

export async function getUnreadNotificationCount() {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const response = await axiosInstance.get(
      "/community/notifications/unread-count/",
      {
        headers: {
          Authorization: `Bearer ${session.access}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error fetching unread notification count:", error);
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Failed to fetch unread notification count",
    };
  }
}

// Follow-related actions
export async function sendFollowRequestAction(userId: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await sendFollowRequestAPI(session.access, userId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error sending follow request:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to send follow request",
    };
  }
}

export async function acceptFollowRequestAction(userId: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await acceptFollowRequestAPI(session.access, userId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error accepting follow request:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to accept follow request",
    };
  }
}

export async function rejectFollowRequestAction(userId: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await rejectFollowRequestAPI(session.access, userId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error rejecting follow request:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to reject follow request",
    };
  }
}

export async function getFollowersAction(limit?: number, offset?: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getFollowersAPI(session.access, limit, offset);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching followers:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch followers",
    };
  }
}

export async function getFollowingAction(limit?: number, offset?: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await getFollowingAPI(session.access, limit, offset);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching following:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch following",
    };
  }
}

export async function unfollowUserAction(userId: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await unfollowUserAPI(session.access, userId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error unfollowing user:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to unfollow user",
    };
  }
}

export async function removeFollowerAction(userId: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await removeFollowerAPI(session.access, userId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error removing follower:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to remove follower",
    };
  }
}
