import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { MindDemystifiedNavBar } from "@/widgets/NavBar";
import { getCourseAccessDetail } from "@/app/actions/course";
import { CourseAccessDrawer } from "@/widgets/courses/CourseAccessDrawer";
import { CourseAccessDetail } from "@/models/course";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { Metadata } from "next";

// Add revalidation for course access layout - 60 seconds
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourseAccessDetail(courseSlug);

  return {
    title: `${course.title} - Mind Demystified`,
    description: `Learn ${course.title} with Mind Demystified's comprehensive course.`,
  };
}

export default async function AccessLayout(props: {
  children: React.ReactNode;
  params: Promise<{ courseSlug: string }>;
}) {
  const { children, params } = props;
  const { courseSlug } = await params;

  const course = await getCourseAccessDetail(courseSlug);

  return (
    <html lang={"en"}>
      <body style={{ backgroundColor: "#FEFBF5" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <MindDemystifiedNavBar elevation />
              <CourseAccessDrawer course={course} />
              <Box
                sx={{ marginTop: "100px", marginLeft: { xs: 0, lg: "390px" } }}
              >
                {children}
              </Box>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
