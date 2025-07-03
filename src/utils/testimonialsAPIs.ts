import { axiosInstance } from "./axiosInstance";

export const TestimonialsAPIs = () => {
  return {
    getTestimonials: async (limit?: number, offset?: number) => {
      const response = await axiosInstance.get("/testimonials/", {
        params: {
          limit,
          offset,
        },
      });
      return response.data;
    },
  };
};
