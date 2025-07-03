export type Profile = {
  id: string;
  name?: string;
  email: string;
  profile: {
    image?: string;
    bio?: string;
    has_community?: boolean;
    social_image?: string;
  };
  has_free_call?: boolean;
};

export type UserProfile = {
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
  followers_count: number;
  following_count: number;
  is_following?: boolean;
  is_follow_requested?: boolean;
  action_requested?: boolean;
  has_free_call?: boolean;
};
