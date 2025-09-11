"use server";

import { SessionsAPIs } from "@/utils/sessionsAPIs";
import { getSession } from "../lib/session";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const getAvailability = async () => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getAvailability(token);
  return response;
};

export const getDateAvailability = async (date: string, timezone: string) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getDateAvailability(
    token,
    date,
    timezone
  );
  return response;
};

export const getSubscribedPackages = async () => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    return null;
  }
  const response = await SessionsAPIs().getSubscribedPackages(token);
  return response;
};

export const getSessionDetails = async (id: string) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getSessionDetails(token, id);
  return response;
};

export const createSubscribedPackage = async (packageId: string) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  try {
    const response = await SessionsAPIs().createSubscribedPackage(
      token,
      packageId
    );
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.data[0] === "ALREADY_SUBSCRIBED") {
        redirect("/sessions");
      }
    }
  }
};

export const bookSession = async (
  sessionId: string,
  date: string,
  time: string,
  selectedTimezone: string
) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().bookSession(
    token,
    sessionId,
    date,
    time,
    selectedTimezone
  );
  return response;
};

export const getSessionBookingDetails = async (
  unscheduled: boolean = false
) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getSessionBookingDetails(
    token,
    unscheduled
  );
  return response;
};

export const getSessionPackageCheckout = async (id: string) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getSessionPackageCheckout(token, id);
  return response;
};

export const createPayPalOrder = async (sessionId: string) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().createPayPalOrder(token, sessionId);

  // Handle case where response might be a JSON string
  let parsedResponse = response;
  if (typeof response === "string") {
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      throw new Error("Invalid response format");
    }
  }

  return parsedResponse;
};

export const capturePaypalOrder = async (orderId: string) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().capturePaypalOrder(token, orderId);
  return response;
};

export const getSessionSubscriptionDetail = async () => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    return null;
  }
  const response = await SessionsAPIs().getSessionSubscriptionDetail(token);
  return response;
};

export const rescheduleSession = async (
  sessionId: string,
  date: string,
  time: string,
  selectedTimezone: string
) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().rescheduleSession(
    token,
    sessionId,
    date,
    time,
    selectedTimezone
  );
  return response;
};

// Free Call Actions
export const getFreeCallAvailability = async () => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getFreeCallAvailability(token);
  return response;
};

export const getFreeCallDateAvailability = async (
  date: string,
  timezone: string
) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().getFreeCallDateAvailability(
    token,
    date,
    timezone
  );
  return response;
};

export const bookFreeCall = async (
  date: string,
  time: string,
  selectedTimezone: string
) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  try {
    const response = await SessionsAPIs().bookFreeCall(
      token,
      date,
      time,
      selectedTimezone
    );
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Handle validation errors from the serializer
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === "string") {
          throw new Error(errorData);
        } else if (Array.isArray(errorData)) {
          throw new Error(errorData[0] || "Validation error");
        } else if (typeof errorData === "object") {
          // Handle nested validation errors
          const errorMessages = Object.values(errorData).flat();
          const firstMessage = Array.isArray(errorMessages)
            ? errorMessages[0]
            : "Validation error";
          throw new Error(
            typeof firstMessage === "string" ? firstMessage : "Validation error"
          );
        }
      }
    }
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getFreeCallDetails = async () => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    return null;
  }
  try {
    const response = await SessionsAPIs().getFreeCallDetails(token);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // If 404, it means user doesn't have a free call booked
      if (error.response?.status === 404) {
        return null;
      }
      // For other errors, throw them
      throw error;
    }
    throw error;
  }
};

export const rescheduleFreeCall = async (
  date: string,
  time: string,
  selectedTimezone: string
) => {
  const session = await getSession();
  const token = session?.access;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const response = await SessionsAPIs().rescheduleFreeCall(
    token,
    date,
    time,
    selectedTimezone
  );
  return response;
};

export const getSessionPackages = async () => {
  const response = await SessionsAPIs().getSessionPackages();
  return response;
};
