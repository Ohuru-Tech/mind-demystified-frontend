import { getLessonAccess, getModuleAccess } from "@/app/actions/course";
import { Container, Alert } from "@mui/material";
import { LessonNavigation } from "@/widgets/courses/LessonNavigation";
import { LessonContent } from "@/widgets/courses/LessonContent";
import { DocumentLesson } from "@/widgets/courses/DocumentLesson";
import { NextLesson } from "@/models/course";

// Add revalidation for lesson page - 60 seconds
export const revalidate = 60;

interface LessonPageProps {
  courseSlug: string;
  lessonId: string;
  moduleSlug: string;
}

export default async function LessonPage(props: {
  params: Promise<LessonPageProps>;
}) {
  const { courseSlug, lessonId, moduleSlug } = await props.params;

  try {
    const [lesson, module] = await Promise.all([
      getLessonAccess(courseSlug, lessonId),
      getModuleAccess(courseSlug, moduleSlug),
    ]);

    if (!lesson) {
      return (
        <Container maxWidth={"xl"} sx={{ pt: 2 }}>
          <Alert severity="warning">Lesson not found</Alert>
        </Container>
      );
    }

    return (
      <Container maxWidth={"xl"} sx={{ pt: 2 }}>
        <LessonNavigation
          courseSlug={courseSlug}
          moduleSlug={moduleSlug}
          lessonTitle={lesson.title}
          moduleTitle={module?.title}
          nextLesson={lesson.next_lesson as NextLesson}
        />

        {lesson.type === "document" ? (
          <DocumentLesson
            document_markdown={lesson.document_markdown}
            title={lesson.title}
            lessonId={lessonId}
            completed={lesson.completed ?? false}
          />
        ) : (
          <LessonContent
            lessonId={lessonId}
            lessonType={lesson.type}
            title={lesson.title}
            completed={lesson.completed}
            video={lesson.video}
            webvtt={lesson.webvtt}
            document_markdown={lesson.document_markdown}
            assessment={lesson.assessment}
            handsOn={lesson.handsOn}
          />
        )}
      </Container>
    );
  } catch (error) {
    console.error("Error fetching lesson data:", error);
    return (
      <Container maxWidth={"xl"} sx={{ pt: 2 }}>
        <Alert severity="error">Failed to load lesson content</Alert>
      </Container>
    );
  }
}
