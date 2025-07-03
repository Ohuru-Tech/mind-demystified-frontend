"use client";

import { EnrolledCourse } from "@/models/course";
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getEnrolledCourses } from "@/app/actions/course";
import { LearningProgressCard } from "@/widgets/dashboard/learning/LearningProgressCard";
import { LearningPageLoadingState } from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

const limit = 12;

export default function Learning() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("inProgress");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useSnackbar();

  const getCourses = async (ordering?: string, offset?: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEnrolledCourses(ordering, offset);
      setHasMore(response.next !== null);
      return response.results;
    } catch (error) {
      const errorMessage = "Failed to load courses";
      setError(errorMessage);
      showError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setOffset(0);
      const ordering = activeFilter === "inProgress" ? undefined : activeFilter;
      const courses = await getCourses(ordering, 0);
      setCourses(courses);
    };
    fetchCourses();
  }, [activeFilter]);

  useEffect(() => {
    if (offset === 0) return;
    const fetchCourses = async () => {
      const ordering = activeFilter === "inProgress" ? undefined : activeFilter;
      const courses = await getCourses(ordering, offset);
      setCourses((prevCourses) => [...prevCourses, ...courses]);
    };
    fetchCourses();
  }, [offset]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  if (loading && courses.length === 0) {
    return (
      <>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <LearningPageLoadingState />
        </Container>
      </>
    );
  }

  if (error && courses.length === 0) {
    return (
      <>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <ErrorState
            error={error}
            onRetry={() => {
              const fetchCourses = async () => {
                const ordering =
                  activeFilter === "inProgress" ? undefined : activeFilter;
                const courses = await getCourses(ordering, 0);
                setCourses(courses);
              };
              fetchCourses();
            }}
            variant="card"
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <Toolbar />
      <Container
        maxWidth={"lg"}
        sx={{
          position: "relative",
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
          mt: 8,
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
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={"20px"}
        >
          <Typography variant="h2" textAlign={"center"}>
            My Learning
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          mt={"30px"}
          spacing={"8px"}
        >
          <Chip
            label="In Progress"
            onClick={() => handleFilterClick("inProgress")}
            color={activeFilter === "inProgress" ? "primary" : "default"}
            variant={activeFilter === "inProgress" ? "filled" : "outlined"}
          />
          <Chip
            label="Completed"
            onClick={() => handleFilterClick("completed")}
            color={activeFilter === "completed" ? "primary" : "default"}
            variant={activeFilter === "completed" ? "filled" : "outlined"}
          />
        </Stack>

        {!loading && courses.length === 0 && !error && (
          <EmptyState
            title="No courses yet"
            description="Start your learning journey by enrolling in a course!"
            icon="mdi:book-open-variant"
            action={{
              label: "Browse Courses",
              onClick: () => {
                // Navigate to courses page
                window.location.href = "/courses";
              },
            }}
          />
        )}

        {courses.length > 0 && (
          <Grid container mt={"60px"} rowGap={"20px"} justifyContent={"center"}>
            {courses.map((course) => {
              return (
                <Grid
                  size={{ xs: 12, xl: 4, lg: 4, md: 6, sm: 12 }}
                  key={course.course.id}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <LearningProgressCard course={course} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
        {hasMore && (
          <Stack direction={"row"} justifyContent={"center"} mt={"60px"}>
            <Button
              variant="contained"
              onClick={() => setOffset(offset + limit)}
            >
              Load More
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
}
