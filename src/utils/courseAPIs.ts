import {
  CourseAccessDetail,
  CourseDetail,
  CourseModuleAccess,
  CourseLessonAccess,
  EnrolledCourse,
  CourseBundle,
} from "@/models/course";
import { axiosInstance } from "./axiosInstance";

export const CourseAPIs = () => {
  return {
    getCourses: async (limit?: number, offset?: number, ordering?: string) => {
      const response = await axiosInstance.get("/courses/", {
        params: {
          limit,
          offset,
          ordering,
        },
      });
      return response.data;
    },
    getFeaturedCourses: async () => {
      const response = await axiosInstance.get("/courses/featured/");
      return response.data;
    },
    getCourseDetailAuthenticated: async (token: string, slug: string) => {
      const response = await axiosInstance.get<CourseDetail>(
        `/courses/authenticated/${slug}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    getCourseDetail: async (slug: string) => {
      const response = await axiosInstance.get<CourseDetail>(
        `/courses/${slug}/`
      );
      return response.data;
    },
    getEnrolledCourses: async (
      token: string,
      ordering?: string,
      offset?: number
    ) => {
      const response = await axiosInstance.get("/courses/enrolled/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: ordering === "completed",
          offset,
        },
      });
      return response.data;
    },
    getCourseAccessDetail: async (token: string, slug: string) => {
      const response = await axiosInstance.get<CourseAccessDetail>(
        `/courses/${slug}/access/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    getModuleAccess: async (
      token: string,
      courseSlug: string,
      moduleSlug: string
    ) => {
      const response = await axiosInstance.get<CourseModuleAccess>(
        `/courses/${courseSlug}/access/modules/${moduleSlug}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    getLessonAccess: async (
      token: string,
      courseSlug: string,
      lessonId: string
    ) => {
      const response = await axiosInstance.get<CourseLessonAccess>(
        `/courses/${courseSlug}/access/lessons/${lessonId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    validateAssessment: async (
      token: string,
      lessonId: string,
      answers: { question_id: string; selected_answer_id: string }[]
    ) => {
      const response = await axiosInstance.post(
        "/courses/validate-assessment/",
        {
          lesson_id: lessonId,
          answers: answers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    markLessonComplete: async (token: string, lessonId: string) => {
      const response = await axiosInstance.post(
        `/courses/lessons/${lessonId}/mark-complete/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    getCourseBundle: async (slug: string, token: string) => {
      const response = await axiosInstance.get<CourseBundle>(
        `/courses/${slug}/bundle/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    createPayPalOrderForCourse: async (slug: string, token: string) => {
      const response = await axiosInstance.post(
        `/courses/orders/create-course/`,
        {
          course_slug: slug,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    createPayPalOrderForBundle: async (slug: string, token: string) => {
      const response = await axiosInstance.post(
        `/courses/orders/create-bundle/`,
        {
          bundle_slug: slug,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    capturePayPalOrderForCourse: async (orderId: string, token: string) => {
      const response = await axiosInstance.post(
        `/courses/orders/capture-course/`,
        { order_id: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    capturePayPalOrderForBundle: async (orderId: string, token: string) => {
      const response = await axiosInstance.post(
        `/courses/orders/capture-bundle/`,
        { order_id: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
  };
};
