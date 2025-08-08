import { getModuleAccess } from "@/app/actions/course";
import { CourseModuleAccess } from "@/models/course";
import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";

// Add revalidation for module page - 60 seconds
export const revalidate = 60;

const lessonTypeConfig = {
  video: {
    icon: "mdi:play",
    label: "Video lesson",
  },
  document: {
    icon: "mdi:file",
    label: "Reading lesson",
  },
  hands_on: {
    icon: "mdi:hand-coin",
    label: "Hands-on lesson",
  },
  assessment: {
    icon: "mdi:check",
    label: "Assessment lesson",
  },
} as const;

const getModuleSummary = (module: CourseModuleAccess) => {
  const videoLessons = module.lessons.filter(
    (lesson) => lesson.type === "video"
  );
  const readingLessons = module.lessons.filter(
    (lesson) => lesson.type === "document"
  );
  const handsOnLessons = module.lessons.filter(
    (lesson) => lesson.type === "hands_on"
  );
  const assessmentLessons = module.lessons.filter(
    (lesson) => lesson.type === "assessment"
  );

  const videoLessonRemaining = videoLessons.filter(
    (lesson) => !lesson.completed
  ).length;
  const readingLessonRemaining = readingLessons.filter(
    (lesson) => !lesson.completed
  ).length;
  const handsOnLessonRemaining = handsOnLessons.filter(
    (lesson) => !lesson.completed
  ).length;
  const assessmentLessonRemaining = assessmentLessons.filter(
    (lesson) => !lesson.completed
  ).length;

  return {
    videoLessonRemaining,
    videoLessonTotal: videoLessons.length,
    readingLessonRemaining,
    readingLessonTotal: readingLessons.length,
    handsOnLessonRemaining,
    handsOnLessonTotal: handsOnLessons.length,
    assessmentLessonRemaining,
    assessmentLessonTotal: assessmentLessons.length,
  };
};

const getSummaryText = (moduleSummary: ReturnType<typeof getModuleSummary>) => {
  const videoLessonText =
    moduleSummary.videoLessonRemaining > 0
      ? `${moduleSummary.videoLessonRemaining} Video lesson${
          moduleSummary.videoLessonRemaining > 1 ? "s" : ""
        } left`
      : "All video lessons completed";
  const readingLessonText =
    moduleSummary.readingLessonRemaining > 0
      ? `${moduleSummary.readingLessonRemaining} Reading lesson${
          moduleSummary.readingLessonRemaining > 1 ? "s" : ""
        } left`
      : "All reading lessons completed";
  const handsOnLessonText =
    moduleSummary.handsOnLessonRemaining > 0
      ? `${moduleSummary.handsOnLessonRemaining} Hands-on lesson${
          moduleSummary.handsOnLessonRemaining > 1 ? "s" : ""
        } left`
      : "All hands-on lessons completed";
  const assessmentLessonText =
    moduleSummary.assessmentLessonRemaining > 0
      ? `${moduleSummary.assessmentLessonRemaining} Assessment lesson${
          moduleSummary.assessmentLessonRemaining > 1 ? "s" : ""
        } left`
      : "All assessment lessons completed";

  return {
    videoLessonText,
    readingLessonText,
    handsOnLessonText,
    assessmentLessonText,
  };
};

const ModuleSummaryStack = ({
  summaryText,
  moduleSummary,
}: {
  summaryText: ReturnType<typeof getSummaryText>;
  moduleSummary: ReturnType<typeof getModuleSummary>;
}) => {
  const summaryItems = [
    {
      key: "videoLessonText",
      type: "video" as keyof typeof lessonTypeConfig,
      total: moduleSummary.videoLessonTotal,
    },
    {
      key: "readingLessonText",
      type: "document" as keyof typeof lessonTypeConfig,
      total: moduleSummary.readingLessonTotal,
    },
    {
      key: "handsOnLessonText",
      type: "hands_on" as keyof typeof lessonTypeConfig,
      total: moduleSummary.handsOnLessonTotal,
    },
    {
      key: "assessmentLessonText",
      type: "assessment" as keyof typeof lessonTypeConfig,
      total: moduleSummary.assessmentLessonTotal,
    },
  ].filter((item) => item.total > 0);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2 }}
      sx={{ width: "100%" }}
    >
      {summaryItems.map((item) => {
        const config = lessonTypeConfig[item.type];
        return (
          <Stack
            key={item.key}
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            sx={{
              padding: "6px",
              minWidth: { xs: "auto", sm: "fit-content" },
            }}
          >
            <Avatar
              sx={{
                width: "18px",
                height: "18px",
                backgroundColor: "primary.main",
              }}
              variant={"rounded"}
            >
              <Icon icon={config.icon} color={"white"} width={14} height={14} />
            </Avatar>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: { xs: "nowrap", sm: "normal" },
              }}
            >
              {summaryText[item.key as keyof typeof summaryText]}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default async function CourseAccessModulePage(props: {
  params: Promise<{ courseSlug: string; moduleSlug: string }>;
}) {
  const { courseSlug, moduleSlug } = await props.params;
  const moduleDetails = await getModuleAccess(courseSlug, moduleSlug);
  const moduleSummary = getModuleSummary(moduleDetails);
  const summaryText = getSummaryText(moduleSummary);

  return (
    <Container maxWidth={"lg"} sx={{ pt: 8 }}>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          borderColor: "divider",
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "20px",
        }}
      >
        <Typography variant="h4">{moduleDetails.title}</Typography>
        <ModuleSummaryStack
          summaryText={summaryText}
          moduleSummary={moduleSummary}
        />
        <Divider flexItem />
        {moduleDetails.lessons.map((lesson) => {
          return (
            <Stack
              direction={"row"}
              spacing={"20px"}
              alignItems={"center"}
              width={"97%"}
              sx={{
                padding: "10px",
                borderRadius: "10px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
                textDecoration: "none",
              }}
              component={Link}
              href={`/course/${courseSlug}/access/${moduleSlug}/lessons/${lesson.id}`}
              key={lesson.id}
            >
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#FAE4DB",
                }}
              >
                {lesson.completed ? (
                  <Icon
                    icon={"lets-icons:check-fill"}
                    color={"#00BA00"}
                    width={18}
                    height={18}
                  />
                ) : (
                  <Icon
                    icon={
                      lesson.type === "video"
                        ? "mdi:play"
                        : lesson.type === "assessment"
                        ? "mdi:check"
                        : lesson.type === "hands_on"
                        ? "mdi:hand-coin"
                        : "mdi:file"
                    }
                    color={"#323232"}
                    width={18}
                    height={18}
                  />
                )}
              </Avatar>
              <Stack
                direction={"column"}
                spacing={"0.01px"}
                justifyContent={"center"}
              >
                <Typography variant="subtitle1">{lesson.title}</Typography>
                <Typography variant="subtitle2">{lesson.duration}</Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Container>
  );
}
