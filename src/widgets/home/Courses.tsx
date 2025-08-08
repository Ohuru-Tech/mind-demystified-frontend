import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { CourseAPIs } from "@/utils/courseAPIs";
import { CourseList } from "@/models/course";
import { CourseCard } from "./CourseCard";
import Link from "next/link";

const courseAPIs = CourseAPIs();

// Add revalidation for Courses component - 60 seconds
export const revalidate = 60;

export const getCourses = async () => {
  try {
    const response: CourseList[] = await courseAPIs.getFeaturedCourses();
    return response;
  } catch (error) {
    console.error("Failed to fetch featured courses:", error);
    return [];
  }
};

export const Courses = async () => {
  const courses = await getCourses();

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        position: "relative",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
        marginTop: "220px",
      }}
    >
      <Box
        sx={{
          width: "253px",
          height: "253px",
          position: "absolute",
          left: "0px",
          top: "0px",
          backgroundColor: alpha("#F59B84", 0.5),
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          width: "253px",
          height: "253px",
          position: "absolute",
          right: "0px",
          bottom: "0px",
          backgroundColor: alpha("#F59B84", 0.5),
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Stack
        direction={"column"}
        spacing={"100px"}
        textAlign={"center"}
        sx={{ position: "relative", width: "100%", zIndex: 1 }}
      >
        <Stack direction={"column"} spacing={"10px"} alignItems={"center"}>
          <Typography variant="h2">Discover our Courses</Typography>
          <Typography variant="body1" sx={{ width: { xs: "95%", md: "35%" } }}>
            Explore timeless teachings designed to awaken clarity, healing, and
            self-discovery.
          </Typography>
        </Stack>
        <Stack direction={"column"} spacing={"62px"}>
          {courses.length > 0 ? (
            <>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
              >
                <Stack
                  direction={"row"}
                  sx={{ flexWrap: "wrap", rowGap: "16px", columnGap: "16px" }}
                  justifyContent={"center"}
                >
                  {courses.map((course) => {
                    return <CourseCard course={course} key={course.id} />;
                  })}
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                flexWrap={"wrap"}
              >
                <Button component={Link} href="/courses" variant="contained">
                  See More
                </Button>
              </Stack>
            </>
          ) : (
            <Stack
              direction={"column"}
              spacing={"20px"}
              alignItems={"center"}
              sx={{
                padding: "40px",
                backgroundColor: "white",
                borderRadius: "20px",
                border: "1px solid #E0E0E0",
              }}
            >
              <Typography variant="h6" textAlign={"center"}>
                Courses are currently unavailable
              </Typography>
              <Typography
                variant="body2"
                textAlign={"center"}
                color="text.secondary"
              >
                Please check back later for available courses.
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};
