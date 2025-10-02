export type CourseList = {
  id: string;
  slug: string;
  title: string;
  byline: string;
  image: string;
  price: number;
  instructors: Instructor[];
  tags: CourseTag[];
  has_certificate: boolean;
  num_modules: number;
  duration: string;
};

export type CourseTag = {
  name: string;
  slug: string;
};

export type Instructor = {
  id: string;
  name: string;
  image: string;
};

export type Lesson = {
  id: string;
  type: "video" | "assessment" | "hands_on" | "document";
  title: string;
  description: string;
  order: number;
  duration: string;
};

export type CourseModule = {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  image: string;
};

export type CourseAccessModule = {
  id: string;
  title: string;
  slug: string;
  order: number;
  image: string;
  completed: boolean;
};

export type CourseModuleAccessLesson = Lesson & {
  completed: boolean;
};

export type CourseModuleAccess = {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  image: string;
  lessons: CourseModuleAccessLesson[];
};

export type CourseDetail = CourseList & {
  outcomes: { description: string; order: number }[];
  modules: CourseModule[];
  num_assessments: number;
  enrolled?: boolean;
  duration: string;
  who_for?: { description: string; order: number }[];
};

export type CourseAccessDetail = {
  id: string;
  title: string;
  image: string;
  slug: string;
  modules: CourseAccessModule[];
  completed: boolean;
};

export type NextLesson = {
  id: string;
  type: "video" | "assessment" | "hands_on" | "document";
  title: string;
  duration: string;
  module_slug: string;
};

export type EnrolledCourse = {
  course: CourseList;
  progress: {
    total_modules: number;
    modules_completed: number;
  };
  next_lesson?: NextLesson;
  modules: CourseModule[];
};

export type CourseLessonAccess = {
  id: string;
  type: "video" | "document" | "assessment" | "hands_on";
  title: string;
  duration: string;
  completed?: boolean;
  video?: string;
  document?: string;
  document_markdown?: string;
  assessment?: CourseAssessment;
  handsOn?: string;
  webvtt?: string;
  next_lesson?: {
    id: string;
    module_slug: string;
  };
};

export type AssessmentAttempt = {
  id: number;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  passed: boolean;
  lesson_completed: boolean;
  created_at: string;
  answers: AssessmentQuestionResult[];
};

export type CourseAssessment = {
  id: string;
  total_questions: number;
  questions: {
    id: string;
    question: string;
    answer_choices: {
      id: string;
      answer: string;
    }[];
  }[];
  latest_attempt?: AssessmentAttempt;
};

export type AssessmentQuestionResult = {
  question_id: string;
  question_text: string;
  selected_answer_id: string;
  selected_answer_text: string;
  is_correct: boolean;
  correct_answer_id: string | null;
  correct_answer_text: string | null;
};

export type AssessmentValidationResponse = {
  lesson_id: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  passed: boolean;
  lesson_completed: boolean;
  question_results: AssessmentQuestionResult[];
};

export type CourseBundle = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: string;
  savings: string;
  courses: CourseList[];
};
