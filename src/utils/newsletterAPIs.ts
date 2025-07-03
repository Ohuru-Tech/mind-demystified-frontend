import { axiosInstance } from "./axiosInstance";

export interface NewsletterSubscribeData {
  email: string;
}

export interface NewsletterUnsubscribeData {
  email: string;
}

export interface NewsletterResponse {
  message: string;
  email?: string;
}

export const NewsletterAPIs = () => {
  const subscribe = async (email: string) => {
    const response = await axiosInstance.post<NewsletterResponse>(
      "/newsletter/subscribe/",
      { email }
    );
    return response.data;
  };

  const unsubscribe = async (email: string) => {
    const response = await axiosInstance.post<NewsletterResponse>(
      "/newsletter/unsubscribe/",
      { email }
    );
    return response.data;
  };

  return {
    subscribe,
    unsubscribe,
  };
};
