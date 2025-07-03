import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  AvailabilityResponse,
  DateAvailabilityResponse,
  SessionBookingDetails,
  SessionPackage,
  SessionPackageCheckout,
  SessionSubscription,
  SessionSubscriptionDetail,
  FreeCallAvailabilityResponse,
  FreeCallDateAvailabilityResponse,
  FreeCallBookingDetails,
} from "@/models/session";

export const SessionsAPIs = () => {
  return {
    getSessionPackages: async () => {
      const response = await axiosInstance.get<SessionPackage[]>("/sessions/");
      return response.data;
    },
    getSessionDetails: async (token: string, id: string) => {
      const response = await axiosInstance.get<SessionPackage>(
        `/sessions/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    getAvailability: async (token: string) => {
      const response = await axiosInstance.get<AvailabilityResponse>(
        "/sessions/availability/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    getDateAvailability: async (
      token: string,
      date: string,
      timezone: string
    ) => {
      const response = await axiosInstance.get<DateAvailabilityResponse>(
        `/sessions/availability/date?date=${date}&timezone=${timezone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    getSubscribedPackages: async (token: string) => {
      const response = await axiosInstance.get<SessionSubscription>(
        "/sessions/subscription/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    createSubscribedPackage: async (token: string, packageId: string) => {
      try {
        const response = await axiosInstance.post<SessionSubscription>(
          "/sessions/subscription/create/",
          {
            package: packageId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          throw error;
        }
        throw error;
      }
    },
    bookSession: async (
      token: string,
      sessionId: string,
      date: string,
      time: string,
      selectedTimezone: string
    ) => {
      const response = await axiosInstance.post<{ needs_payment: boolean }>(
        "/sessions/book/",
        {
          session_package_id: sessionId,
          selected_timezone: selectedTimezone,
          session_date: date,
          session_time: time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    getSessionBookingDetails: async (token: string, unscheduled: boolean) => {
      const response = await axiosInstance.get<SessionBookingDetails>(
        `/sessions/detail/?non_scheduled=${unscheduled}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    getSessionPackageCheckout: async (token: string, id: string) => {
      const response = await axiosInstance.get<SessionPackageCheckout>(
        `/sessions/checkout/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    createPayPalOrder: async (token: string, sessionId: string) => {
      const response = await axiosInstance.post(
        `/sessions/order/create/`,
        {
          session_package_id: sessionId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    capturePaypalOrder: async (token: string, orderId: string) => {
      const response = await axiosInstance.post(
        `/sessions/order/capture/`,
        { order_id: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    getSessionSubscriptionDetail: async (token: string) => {
      const response = await axiosInstance.get<SessionSubscriptionDetail>(
        "/sessions/subscription/detail/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    rescheduleSession: async (
      token: string,
      sessionId: string,
      date: string,
      time: string,
      selectedTimezone: string
    ) => {
      const response = await axiosInstance.patch(
        `/sessions/reschedule/${sessionId}/`,
        {
          selected_timezone: selectedTimezone,
          session_date: date,
          session_time: time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },

    // Free Call APIs
    getFreeCallAvailability: async (token: string) => {
      const response = await axiosInstance.get<FreeCallAvailabilityResponse>(
        "/sessions/free-call/availability/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },

    getFreeCallDateAvailability: async (
      token: string,
      date: string,
      timezone: string
    ) => {
      const response =
        await axiosInstance.get<FreeCallDateAvailabilityResponse>(
          `/sessions/free-call/availability/date?date=${date}&timezone=${timezone}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      return response.data;
    },

    bookFreeCall: async (
      token: string,
      date: string,
      time: string,
      selectedTimezone: string
    ) => {
      const response = await axiosInstance.post<{ success: boolean }>(
        "/sessions/free-call/book/",
        {
          selected_timezone: selectedTimezone,
          session_date: date,
          session_time: time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },

    getFreeCallDetails: async (token: string) => {
      const response = await axiosInstance.get<FreeCallBookingDetails>(
        "/sessions/free-call/detail/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },

    rescheduleFreeCall: async (
      token: string,
      date: string,
      time: string,
      selectedTimezone: string
    ) => {
      const response = await axiosInstance.patch(
        "/sessions/free-call/reschedule/",
        {
          selected_timezone: selectedTimezone,
          session_date: date,
          session_time: time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
  };
};
