import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { CourseDetail, Instructor } from "@/models/course";
import Link from "next/link";

export const CourseHero = ({
  course,
  isExplore = false,
}: {
  course: CourseDetail;
  isExplore?: boolean;
}) => {
  return (
    <>
      <Stack
        direction={"column"}
        pt={isExplore ? "0px" : "120px"}
        pb={"100px"}
        width={"100%"}
        alignItems={"flex-start"}
        spacing={"60px"}
      >
        <Stack direction={"column"} spacing={"2px"} id="hero">
          <Typography
            variant="h6"
            color={"text.disabled"}
            textTransform={"uppercase"}
          >
            certification course
          </Typography>
          <Stack direction={"column"} spacing={"25px"}>
            <Typography variant="h3" component={"h1"} fontSize={"60px"}>
              {course.title}
            </Typography>
            <Typography
              variant="body1"
              color={"text.disabled"}
              maxWidth={"650px"}
            >
              {course.byline}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"column"} spacing={"20px"} width={"100%"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack direction={"column"} spacing={"10px"}>
              <Typography variant="body1" color={"text.secondary"}>
                Guided by:
              </Typography>
              <Stack direction={"row"} spacing={"10px"}>
                <Stack direction={"row"} spacing={"-16px"}>
                  {course.instructors.map((instructor: Instructor) => {
                    return (
                      <Avatar src={instructor.image} key={instructor.id} />
                    );
                  })}
                </Stack>
                <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
                  {course.instructors.map(
                    (instructor: Instructor, index: number) => {
                      return (
                        <Typography
                          variant={"body1"}
                          fontSize={14}
                          key={instructor.id}
                        >
                          {instructor.name.split(" ")[0]}
                          {index !== course.instructors.length - 1 && ","}
                        </Typography>
                      );
                    }
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={
                course.enrolled
                  ? `/course/${course.slug}/access/modules/${course.modules[0].slug}`
                  : `/checkout/course/${course.slug}`
              }
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {course.enrolled ? "View Course" : "Enroll Now"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Card
          sx={{
            width: "90%",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "30px",
            paddingRight: "30px",
            marginTop: "10px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          }}
        >
          <Stack direction={"row"} spacing={"20px"} justifyContent={"center"}>
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              width={"350px"}
            >
              <Stack direction={"column"} spacing={"2px"}>
                <Typography variant="h6" color={"primary.main"}>
                  {course.modules.length} modules
                </Typography>
                <Typography variant="body2">
                  Gain insight into a topic and learn the fundamentals
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              width={"350px"}
            >
              <Stack direction={"column"} spacing={"2px"}>
                <Typography variant="h6" color={"primary.main"}>
                  Beginner level
                </Typography>
                <Typography variant="body2">
                  No prior experience required.
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              width={"350px"}
            >
              <Stack direction={"column"} spacing={"2px"}>
                <Typography variant="h6" color={"primary.main"}>
                  Flexible Schedule
                </Typography>
                <Typography variant="body2">
                  Approx 3 months. Learn at your own pace.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};
