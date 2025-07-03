import { EnrolledCourse } from "@/models/course";
import {
  alpha,
  Box,
  Card,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const LearningProgressCard = ({
  course,
}: {
  course: EnrolledCourse;
}) => {
  return (
    <Card
      sx={{
        width: "327px",
        borderRadius: "20px",
        borderColor: alpha("#323232", 0.24),
        borderWidth: "1px",
        borderStyle: "solid",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
      component={Link}
      href={
        course.next_lesson
          ? `/course/${course.course.slug}/access/${course.next_lesson?.module_slug}/lessons/${course.next_lesson?.id}`
          : `/course/${course.course.slug}/access/modules/${course.modules[0].slug}`
      }
      elevation={0}
    >
      <Stack direction={"column"} sx={{ padding: "16px" }} spacing={"18px"}>
        <Box
          sx={{
            width: "295px",
            height: "160px",
            borderRadius: "12px",
            position: "relative",
            borderWidth: "1px",
            borderColor: alpha("#323232", 0.24),
            borderStyle: "solid",
          }}
        >
          <Image
            src={course.course.image}
            alt={course.course.title}
            width={295}
            height={160}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "12px",
            }}
          />
          {/* <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "86px",
              position: "absolute",
              bottom: "-1px",
              right: "-1px",
              backgroundColor: "#fff",
              borderTopLeftRadius: "12px",
              padding: "6px 6px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: alpha("#323232", 0.24),
              borderBottom: "none",
              borderRight: "none",
            }}
          >
            <Typography variant="body2">
              {`$`} {course.price}
            </Typography>
          </Stack> */}
        </Box>
        <Typography textAlign={"left"} variant="h6">
          {course.course.title}
        </Typography>
        {course.next_lesson && (
          <Box
            sx={{
              backgroundColor: "#FDFDF5",
              borderRadius: "12px",
              padding: "10px",
              border: "1px solid #32323224",
            }}
          >
            <Stack direction={"row"} spacing={"10px"} alignItems={"center"}>
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"56px"}
                height={"56px"}
              >
                <Icon
                  icon={
                    course.next_lesson?.type === "video"
                      ? "material-symbols:play-circle"
                      : course.next_lesson?.type === "assessment"
                      ? "material-symbols:check"
                      : course.next_lesson?.type === "hands_on"
                      ? "material-symbols:hand-coin"
                      : "material-symbols:file"
                  }
                  color={"#323232"}
                  height={45}
                  width={45}
                />
              </Stack>
              <Stack direction={"column"} spacing={"0px"}>
                <Typography variant="body2" color={"primary.main"}>
                  {course.next_lesson?.title}
                </Typography>
                <Typography variant="subtitle2">
                  {course.next_lesson?.duration}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        )}
        <Stack direction={"column"} spacing={"10px"}>
          <LinearProgress
            value={
              (course.progress.modules_completed /
                course.progress.total_modules) *
              100
            }
            variant="determinate"
            sx={{
              height: "16px",
              borderRadius: "10px",
            }}
          />
          <Stack
            direction={"row"}
            sx={{ width: "100%" }}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">
              {course.progress.modules_completed} /{" "}
              {course.progress.total_modules} Modules
            </Typography>
            <Typography variant="subtitle2">
              {Math.round(
                (course.progress.modules_completed /
                  course.progress.total_modules) *
                  100
              )}
              % completed
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
