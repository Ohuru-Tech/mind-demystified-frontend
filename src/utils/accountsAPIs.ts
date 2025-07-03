import { axiosInstance } from "./axiosInstance";
import { UserProfile } from "@/models/profile";

export const AccountsAPIs = () => {
  const login = async (email: string, redirectTo: string) => {
    const response = await axiosInstance.post("/accounts/login/", {
      email,
      redirect: redirectTo,
    });
    return response;
  };

  const loginComplete = async (token: string) => {
    const response = await axiosInstance.post("/accounts/login/complete/", {
      token,
    });
    return response;
  };

  const googleSignIn = async (token: string, redirectTo: string) => {
    const response = await axiosInstance.post("/accounts/google-login/", {
      json_token: token,
      redirect_to: redirectTo,
    });
    return response;
  };

  const verifyToken = async (token: string) => {
    const response = await axiosInstance.get("/accounts/verify-token/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const refreshToken = async (refreshToken: string) => {
    const response = await axiosInstance.post("/accounts/refresh-token/", {
      refresh: refreshToken,
    });
    return response;
  };

  const getProfile = async (token: string) => {
    const response = await axiosInstance.get("/accounts/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const updateProfile = async (
    token: string,
    profileData: {
      name?: string;
      bio?: string;
      image?: File;
    }
  ) => {
    const formData = new FormData();

    if (profileData.name) {
      formData.append("name", profileData.name);
    }
    if (profileData.bio) {
      formData.append("bio", profileData.bio);
    }
    if (profileData.image) {
      formData.append("image", profileData.image);
    }

    const response = await axiosInstance.patch<UserProfile>(
      "/accounts/profile/update/",
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

  const getUserProfile = async (token: string, userId: number) => {
    const response = await axiosInstance.get<UserProfile>(
      `/accounts/profile/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  return {
    login,
    loginComplete,
    googleSignIn,
    verifyToken,
    refreshToken,
    getProfile,
    updateProfile,
    getUserProfile,
  };
};
