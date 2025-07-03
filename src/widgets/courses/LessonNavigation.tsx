"use client";

import { Box, Stack, Typography, Drawer, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { NextLesson } from "@/models/course";

interface LessonNavigationProps {
  courseSlug: string;
  moduleSlug: string;
  lessonTitle: string;
  moduleTitle?: string;
  nextLesson?: NextLesson;
}

export function LessonNavigation({
  courseSlug,
  moduleSlug,
  lessonTitle,
  moduleTitle,
  nextLesson,
}: LessonNavigationProps) {
  const [breadcrumbSheetOpen, setBreadcrumbSheetOpen] = useState(false);

  return (
    <>
      {/* Breadcrumb Navigation - Sticky at top */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        pr={2}
        pb={2}
        position={"sticky"}
        top={110}
        zIndex={20}
      >
        {/* Desktop Breadcrumbs */}
        <Stack
          direction={"row"}
          sx={{ display: { xs: "none", lg: "flex" } }}
          width={"100%"}
          mb={2}
          justifyContent={"space-between"}
        >
          <Stack
            direction={"row"}
            sx={{
              gap: { xs: 0, lg: 2 },
            }}
          >
            <Typography
              variant={"body2"}
              component={Link}
              sx={{
                textDecoration: "none",
                ":hover": { textDecoration: "underline" },
              }}
              href={`/course/${courseSlug}/access/modules/${moduleSlug}`}
            >
              {moduleTitle}
            </Typography>
            <Icon icon={"mdi-chevron-right"} height={20} width={20} />
            <Typography variant={"body2"} color={"primary.main"}>
              {lessonTitle}
            </Typography>
          </Stack>
          {nextLesson && (
            <Typography
              variant={"body2"}
              component={Link}
              sx={{
                textDecoration: "none",
                ":hover": { textDecoration: "underline" },
              }}
              href={`/course/${courseSlug}/access/${nextLesson.module_slug}/lessons/${nextLesson.id}`}
            >
              Next
            </Typography>
          )}
        </Stack>

        {/* Mobile Breadcrumbs */}
        <Stack
          direction={"column"}
          sx={{ display: { xs: "flex", lg: "none" } }}
          width={"100%"}
        >
          <Stack
            direction={"row"}
            sx={{
              gap: 1,
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
            }}
            mb={2}
          >
            <Typography
              variant={"body2"}
              sx={{
                cursor: "pointer",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => setBreadcrumbSheetOpen(true)}
            >
              ...
            </Typography>
            <Icon icon={"mdi-chevron-right"} height={16} width={16} />
            <Typography variant={"body2"} color={"primary.main"}>
              {lessonTitle}
            </Typography>
          </Stack>
          {nextLesson && (
            <Typography
              variant={"body2"}
              component={Link}
              sx={{
                textDecoration: "none",
                ":hover": { textDecoration: "underline" },
                alignSelf: "flex-end",
              }}
              href={`/course/${courseSlug}/access/${nextLesson.module_slug}/lessons/${nextLesson.id}`}
            >
              Next
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* Mobile Breadcrumb Bottom Sheet */}
      <Drawer
        anchor="bottom"
        variant="temporary"
        open={breadcrumbSheetOpen}
        onClose={() => setBreadcrumbSheetOpen(false)}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            maxHeight: "50vh",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Navigation
          </Typography>
          <Stack spacing={1}>
            <Box
              component={Link}
              href={`/course/${courseSlug}/access/modules/${moduleSlug}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: 1,
                p: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => setBreadcrumbSheetOpen(false)}
            >
              <Typography variant="body1">{moduleTitle}</Typography>
              <Typography variant="body2" color="text.secondary">
                Module
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                borderRadius: 1,
                p: 2,
                backgroundColor: "primary.dark",
                color: "primary.contrastText",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "primary.contrastText" }}
              >
                {lessonTitle}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "primary.contrastText" }}
              >
                Current Lesson
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
