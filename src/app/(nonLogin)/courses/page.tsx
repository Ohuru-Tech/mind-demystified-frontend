"use client";

import { CourseList } from "@/models/course";
import { CourseAPIs } from "@/utils/courseAPIs";
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
import { CourseCard } from "@/widgets/courses/CourseCard";
import { useEffect, useState } from "react";
import { CourseGridLoadingState } from "@/widgets/common/LoadingState";
import { ErrorState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

const courseAPIs = CourseAPIs();

const limit = 12;

export default function Courses() {
  const [courses, setCourses] = useState<CourseList[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const { showError } = useSnackbar();

  const getCourses = async (ordering?: string, offset?: number) => {
    try {
      const response = await courseAPIs.getCourses(limit, offset, ordering);
      const courses: CourseList[] = response.results;
      setHasMore(response.next !== null);
      return courses;
    } catch (error) {
      const errorMessage = "Failed to load courses";
      setError(errorMessage);
      showError(errorMessage);
      return [];
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        setOffset(0);
        const ordering = activeFilter === "all" ? undefined : activeFilter;
        const courses = await getCourses(ordering, 0);
        setCourses(courses);
      } catch (error) {
        const errorMessage = "Failed to load courses";
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [activeFilter]);

  useEffect(() => {
    if (offset === 0) return;
    const fetchCourses = async () => {
      try {
        setLoadingMore(true);
        const ordering = activeFilter === "all" ? undefined : activeFilter;
        const courses = await getCourses(ordering, offset);
        setCourses((prevCourses) => [...prevCourses, ...courses]);
      } catch (error) {
        const errorMessage = "Failed to load more courses";
        showError(errorMessage);
      } finally {
        setLoadingMore(false);
      }
    };
    fetchCourses();
  }, [offset]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  if (loading && courses.length === 0) {
    return (
      <Container maxWidth="lg">
        <CourseGridLoadingState />
      </Container>
    );
  }

  if (error && courses.length === 0) {
    return (
      <Container maxWidth="lg">
        <ErrorState
          error={error}
          onRetry={() => {
            const fetchCourses = async () => {
              try {
                setLoading(true);
                setError(null);
                const ordering =
                  activeFilter === "all" ? undefined : activeFilter;
                const courses = await getCourses(ordering, 0);
                setCourses(courses);
              } catch (error) {
                const errorMessage = "Failed to load courses";
                setError(errorMessage);
                showError(errorMessage);
              } finally {
                setLoading(false);
              }
            };
            fetchCourses();
          }}
          variant="card"
        />
      </Container>
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
            The Learning Path
          </Typography>
          <Box sx={{ padding: { lg: "0px 320px", sm: "0px" } }}>
            <Typography variant="body1" textAlign={"center"}>
              Explore our curated catalog of transformative spiritual courses
              and certifications
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          mt={"60px"}
          spacing={"8px"}
        >
          <Chip
            label="All Courses"
            onClick={() => handleFilterClick("all")}
            color={activeFilter === "all" ? "primary" : "default"}
            variant={activeFilter === "all" ? "filled" : "outlined"}
          />
          <Chip
            label="Newest"
            onClick={() => handleFilterClick("newest")}
            color={activeFilter === "newest" ? "primary" : "default"}
            variant={activeFilter === "newest" ? "filled" : "outlined"}
          />
          <Chip
            label="Oldest"
            onClick={() => handleFilterClick("oldest")}
            color={activeFilter === "oldest" ? "primary" : "default"}
            variant={activeFilter === "oldest" ? "filled" : "outlined"}
          />
          <Chip
            label="Most Popular"
            onClick={() => handleFilterClick("popular")}
            color={activeFilter === "popular" ? "primary" : "default"}
            variant={activeFilter === "popular" ? "filled" : "outlined"}
          />
        </Stack>
        <Grid container mt={"60px"} justifyContent={"center"} rowGap={"20px"}>
          {courses.map((course) => {
            return (
              <Grid size={{ xs: 12, lg: 4, md: 6, sm: 12 }} key={course.id}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CourseCard course={course} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {hasMore && (
          <Stack direction={"row"} justifyContent={"center"} mt={"60px"}>
            <Button
              variant="contained"
              onClick={() => setOffset(offset + limit)}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
}
