"use server";

import { getSession } from "@/app/lib/session";
import { AccountsAPIs } from "@/utils/accountsAPIs";
import { UserProfile } from "@/models/profile";

export async function getUserProfileAction(userId: number) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await AccountsAPIs().getUserProfile(session.access, userId);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch user profile",
    };
  }
}

import { ErrorHandler } from "@/utils/errorHandler";

export async function getProfile() {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await AccountsAPIs().getProfile(session.access);
    return { success: true, data: result.data };
  } catch (error: unknown) {
    const appError = ErrorHandler.handle(error);
    console.error("Error fetching profile:", appError);
    return {
      success: false,
      error: appError.message,
    };
  }
}

export async function updateProfileAction(profileData: {
  name?: string;
  bio?: string;
  image?: File;
}) {
  try {
    const session = await getSession();
    if (!session?.access) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await AccountsAPIs().updateProfile(
      session.access,
      profileData
    );
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update profile",
    };
  }
}
