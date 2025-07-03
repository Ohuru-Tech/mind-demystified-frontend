export type PostCreate = {
  content: string;
  image?: any;
  public: boolean;
};

export type CommentCreate = {
  content: string;
  post_slug?: string; // For comments on posts
  comment_slug?: string; // For replies to comments
};

export type Post = {
  id: number;
  slug: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile: {
      id: number;
      image?: string;
      bio?: string;
      has_community?: boolean;
      social_image?: string;
    };
  };
  content: string;
  image?: string;
  created_at: string;
  updated_at: string;
  activity_time_info: string;
  public: boolean;
  num_likes: number;
  num_comments: number;
  num_bookmarks: number;
  is_liked: boolean;
  is_bookmarked: boolean;
};

export type FeedResponse = {
  results: Post[];
  count: number;
  next?: string;
  previous?: string;
};

export type Comment = {
  id: number;
  slug: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile: {
      id: number;
      image?: string;
      bio?: string;
      has_community?: boolean;
      social_image?: string;
    };
  };
  post: number;
  comment?: number;
  content: string;
  created_at: string;
  updated_at: string;
  activity_time_info: string;
  num_replies: number;
  num_likes: number;
  is_liked: boolean;
};

export type CommentResponse = {
  results: Comment[];
  count: number;
  next?: string;
  previous?: string;
};
