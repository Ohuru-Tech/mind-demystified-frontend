import { axiosInstance } from "./axiosInstance";
import {
  PostCreate,
  CommentCreate,
  Post,
  FeedResponse,
  CommentResponse,
  Comment,
} from "@/models/community";

export const createPost = async (token: string, postData: PostCreate) => {
  const formData = new FormData();

  // Add content
  formData.append("content", postData.content);

  // Add image if provided
  if (postData.image) {
    formData.append("image", postData.image);
  }

  // Add public flag
  formData.append("public", postData.public.toString());

  const response = await axiosInstance.post<Post>(
    "/community/posts/create/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createComment = async (
  token: string,
  commentData: CommentCreate
) => {
  // Determine the endpoint based on whether it's a post comment or reply
  const endpoint = commentData.post_slug
    ? `/community/posts/${commentData.post_slug}/comment/`
    : `/community/comments/${commentData.comment_slug}/reply/`;

  const response = await axiosInstance.post<Comment>(
    endpoint,
    { content: commentData.content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updatePost = async (
  token: string,
  postSlug: string,
  postData: { content: string; public: boolean; image?: any }
) => {
  const formData = new FormData();

  // Add content
  formData.append("content", postData.content);

  // Add public flag
  formData.append("public", postData.public.toString());

  // Add image if provided
  if (postData.image) {
    formData.append("image", postData.image);
  }

  const response = await axiosInstance.patch<Post>(
    `/community/posts/${postSlug}/edit/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deletePost = async (token: string, postSlug: string) => {
  try {
    const response = await axiosInstance.delete(
      `/community/posts/${postSlug}/delete/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // If the response status indicates success (200, 204), consider it successful
    if (
      error.response &&
      (error.response.status === 200 || error.response.status === 204)
    ) {
      return { success: true };
    }
    throw error;
  }
};

export const likePost = async (token: string, postSlug: string) => {
  const response = await axiosInstance.post(
    `/community/posts/${postSlug}/like/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const bookmarkPost = async (token: string, postSlug: string) => {
  const response = await axiosInstance.post(
    `/community/posts/${postSlug}/bookmark/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateComment = async (
  token: string,
  commentSlug: string,
  content: string
) => {
  const response = await axiosInstance.patch<Comment>(
    `/community/comments/${commentSlug}/edit/`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteComment = async (token: string, commentSlug: string) => {
  const response = await axiosInstance.delete(
    `/community/comments/${commentSlug}/delete/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const likeComment = async (token: string, commentSlug: string) => {
  const response = await axiosInstance.post(
    `/community/comments/${commentSlug}/like/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getFeed = async (
  token: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get<FeedResponse>("/community/feed/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getPostDetail = async (token: string, postSlug: string) => {
  const response = await axiosInstance.get<Post>(
    `/community/posts/${postSlug}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getPostComments = async (
  token: string,
  postSlug: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get<CommentResponse>(
    `/community/comments/post/${postSlug}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
      },
    }
  );

  return response.data;
};

export const getCommentDetail = async (token: string, commentSlug: string) => {
  const response = await axiosInstance.get<Comment>(
    `/community/comments/${commentSlug}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getCommentReplies = async (
  token: string,
  commentSlug: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get<CommentResponse>(
    `/community/comments/${commentSlug}/replies/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
      },
    }
  );

  return response.data;
};

export const getMyPosts = async (
  token: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get<FeedResponse>(
    "/community/posts/my/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
      },
    }
  );

  return response.data;
};

export const getUserPosts = async (
  token: string,
  userId: number,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get<FeedResponse>(
    `/community/posts/user/${userId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
      },
    }
  );

  return response.data;
};

export const getBookmarks = async (
  token: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get<FeedResponse>(
    "/community/posts/bookmarked/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
      },
    }
  );

  return response.data;
};

// Follow-related APIs
export const sendFollowRequest = async (token: string, userId: number) => {
  const response = await axiosInstance.post(
    `/community/follow/${userId}/request/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const acceptFollowRequest = async (token: string, userId: number) => {
  const response = await axiosInstance.post(
    `/community/follow/${userId}/accept/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const rejectFollowRequest = async (token: string, userId: number) => {
  const response = await axiosInstance.post(
    `/community/follow/${userId}/reject/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getFollowers = async (
  token: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get(`/community/follow/followers/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getFollowing = async (
  token: string,
  limit?: number,
  offset?: number
) => {
  const response = await axiosInstance.get(`/community/follow/following/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const unfollowUser = async (token: string, userId: number) => {
  const response = await axiosInstance.post(
    `/community/follow/${userId}/unfollow/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeFollower = async (token: string, userId: number) => {
  const response = await axiosInstance.post(
    `/community/follow/${userId}/remove-follower/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
