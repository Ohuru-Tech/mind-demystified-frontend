"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { MindDemystifiedNavBar } from "@/widgets/NavBar";
import { getModuleAccess } from "@/app/actions/course";
import { LessonAccessDrawer } from "@/widgets/courses/LessonAccessDrawer";
import { CourseModuleAccess } from "@/models/course";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SnackbarProvider } from "@/contexts/SnackbarContext";

export default function AccessLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const { courseSlug, moduleSlug } = useParams<{
    courseSlug: string;
    moduleSlug: string;
  }>();
  const [module, setModule] = useState<CourseModuleAccess | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const moduleData = await getModuleAccess(courseSlug, moduleSlug);
        setModule(moduleData);
      } catch (error) {
        console.error("Error fetching module:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [courseSlug, moduleSlug]);

  if (loading) {
    return (
      <html lang={"en"}>
        <body style={{ backgroundColor: "#FEFBF5" }}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <MindDemystifiedNavBar elevation />
                <Box>Loading...</Box>
              </SnackbarProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang={"en"}>
      <body style={{ backgroundColor: "#FEFBF5" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              {module && (
                <LessonAccessDrawer
                  module={module}
                  courseSlug={courseSlug}
                  expanded={expanded}
                  onExpand={() => setExpanded(true)}
                  onCollapse={() => setExpanded(false)}
                />
              )}
              <MindDemystifiedNavBar elevation />
              <Box
                sx={{
                  marginTop: "100px",
                  marginLeft: { xs: 0, lg: expanded ? "390px" : "60px" },
                }}
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
