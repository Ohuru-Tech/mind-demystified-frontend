"use server";

import { CourseAPIs } from "@/utils/courseAPIs";
import { getSession } from "@/app/lib/session";
import { axiosInstance } from "@/utils/axiosInstance";

export const getEnrolledCourses = async (
  ordering?: string,
  offset?: number
) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.getEnrolledCourses(
    accessToken,
    ordering,
    offset
  );
  return response;
};

export const getCourseAccessDetail = async (slug: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.getCourseAccessDetail(accessToken, slug);
  return response;
};

export const getCourseDetail = async (slug: string) => {
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.getCourseDetail(slug);
  return response;
};

export const getModuleAccess = async (
  courseSlug: string,
  moduleSlug: string
) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.getModuleAccess(
    accessToken,
    courseSlug,
    moduleSlug
  );
  return response;
};

export const getLessonAccess = async (courseSlug: string, lessonId: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.getLessonAccess(
    accessToken,
    courseSlug,
    lessonId
  );
  return response;
};

export async function validateAssessment(
  lessonId: string,
  answers: { question_id: string; selected_answer_id: string }[]
) {
  try {
    const session = await getSession();
    const accessToken = session?.access;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const courseAPIs = CourseAPIs();
    const result = await courseAPIs.validateAssessment(
      accessToken,
      lessonId,
      answers
    );
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to validate assessment" };
  }
}

export async function markLessonComplete(lessonId: string) {
  try {
    const session = await getSession();
    const accessToken = session?.access;

    if (!accessToken) {
      throw new Error("Not authenticated");
    }

    const courseAPIs = CourseAPIs();
    const result = await courseAPIs.markLessonComplete(accessToken, lessonId);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: "Failed to mark lesson complete" };
  }
}

export const getCourseDetails = async (slug: string) => {
  try {
    const session = await getSession();
    const accessToken = session?.access;

    if (accessToken) {
      // Use authenticated endpoint to get enrollment status
      const courseAPIs = CourseAPIs();
      const response = await courseAPIs.getCourseDetailAuthenticated(
        accessToken,
        slug
      );
      return response;
    } else {
      // Fallback to public endpoint for non-authenticated users
      const response = await axiosInstance.get(`/courses/${slug}/`);
      return response.data;
    }
  } catch (error) {
    // Fallback to public endpoint if authenticated request fails
    const response = await axiosInstance.get(`/courses/${slug}/`);
    return response.data;
  }
};

export const getCourseBundle = async (slug: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.getCourseBundle(slug, accessToken);
  return response;
};

export const createPayPalOrderForCourse = async (slug: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.createPayPalOrderForCourse(
    slug,
    accessToken
  );
  return response;
};

export const createPayPalOrderForBundle = async (slug: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.createPayPalOrderForBundle(
    slug,
    accessToken
  );
  return response;
};

export const capturePayPalOrderForCourse = async (orderId: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.capturePayPalOrderForCourse(
    orderId,
    accessToken
  );
  return response;
};

export const capturePayPalOrderForBundle = async (orderId: string) => {
  const session = await getSession();
  const accessToken = session?.access;
  const courseAPIs = CourseAPIs();
  const response = await courseAPIs.capturePayPalOrderForBundle(
    orderId,
    accessToken
  );
  return response;
};
