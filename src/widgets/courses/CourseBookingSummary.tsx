"use client";

import { useEffect, useState } from "react";

import { CourseBundle, CourseDetail } from "@/models/course";
import { getCourseBundle, getCourseDetail } from "@/app/actions/course";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { CourseBundleCard } from "./CourseBundleCard";

type CourseBookingSummaryProps = {
  courseSlug: string;
  selectedPackage: boolean;
  setSelectedPackage: (selectedPackage: boolean) => void;
};

export const CourseBookingSummary = ({
  courseSlug,
  selectedPackage,
  setSelectedPackage,
}: CourseBookingSummaryProps) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [bundle, setBundle] = useState<CourseBundle | null>(null);

  const fetchCourse = async () => {
    const course = await getCourseDetail(courseSlug);
    setCourse(course);
  };

  const fetchBundle = async () => {
    const bundle = await getCourseBundle(courseSlug);
    setBundle(bundle);
  };

  useEffect(() => {
    fetchCourse();
    fetchBundle();
  }, [courseSlug]);

  return (
    <Stack
      direction={"column"}
      spacing={{ xs: "16px", md: "24px" }}
      mt={{ xs: "20px", md: "40px" }}
      mb={{ xs: "20px", md: "40px" }}
    >
      <Typography variant="h4">Checkout</Typography>
      {course && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: "16px", md: "30px" }}
          padding={{ xs: "16px", md: "20px" }}
          width={"100%"}
          sx={{
            backgroundColor: "white",
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
          }}
        >
          <Stack
            direction={"row"}
            spacing={{ xs: "12px", md: "16px" }}
            alignItems={"flex-start"}
          >
            <Box
              sx={{
                width: { xs: "60px", md: "80px" },
                height: { xs: "60px", md: "80px" },
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src={course?.image}
                alt={course?.title}
                height={80}
                width={80}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
            <Stack direction={"column"} spacing={"8px"} sx={{ flex: 1 }}>
              <Typography variant="h6">{course?.title}</Typography>
              <Stack direction={"row"} spacing={"4px"} flexWrap="wrap">
                <Stack direction={"row"} spacing={"-16px"}>
                  {course.instructors.map((instructor) => {
                    return (
                      <Avatar
                        src={instructor.image}
                        key={instructor.id}
                        sx={{
                          width: { xs: 24, md: 32 },
                          height: { xs: 24, md: 32 },
                        }}
                      />
                    );
                  })}
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={"4px"}
                  alignItems={"center"}
                  flexWrap="wrap"
                >
                  {course.instructors.map((instructor, index) => {
                    return (
                      <Typography variant={"subtitle2"} key={instructor.id}>
                        {instructor.name.split(" ")[0]}
                        {index !== course.instructors.length - 1 && ","}
                      </Typography>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: { xs: "none", md: "block" },
            }}
          />
          <Divider
            orientation="horizontal"
            sx={{
              display: { xs: "block", md: "none" },
              width: "100%",
            }}
          />

          <Stack direction={"column"} spacing={"8px"} p={1}>
            <Stack
              direction={"row"}
              spacing={"4px"}
              justifyContent={{ xs: "flex-start", md: "flex-start" }}
              alignItems={"center"}
            >
              <Icon
                icon="flowbite:clock-outline"
                height={20}
                width={20}
                color={"#323232"}
              />
              <Typography variant={"body2"} color={"primary.main"}>
                {course?.duration}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              spacing={"4px"}
              justifyContent={{ xs: "flex-start", md: "flex-start" }}
              alignItems={"center"}
            >
              <Icon icon="streamline-plump:module" height={20} width={20} />
              <Typography variant={"body2"} color={"primary.main"}>
                {course?.modules.length} modules
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {course && <Typography variant="body2">{course?.byline}</Typography>}
      {bundle && (
        <>
          <Typography variant="h5">
            Make it a package and save{" "}
            <Typography
              component={"span"}
              variant={"h5"}
              fontFamily={"monospace"}
            >
              {bundle?.savings}
            </Typography>{" "}
            %
          </Typography>
          {bundle?.description && (
            <Typography sx={{ color: "primary.main" }} variant="body2">
              {bundle?.description}
            </Typography>
          )}
          <Stack
            direction={"row"}
            spacing={{ xs: "16px", md: "30px" }}
            sx={{
              overflowX: "auto",
              overflowY: "visible",
              marginTop: "20px !important",
              paddingTop: { xs: "30px", md: "40px" },
              paddingBottom: "20px",
              paddingLeft: { xs: "0px", md: "0px" },
              paddingRight: { xs: "0px", md: "0px" },
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c1c1c1",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#a8a8a8",
              },
            }}
          >
            {[...bundle?.courses].map((course, index) => {
              return (
                <CourseBundleCard
                  selectedPackage={selectedPackage}
                  course={course}
                  key={index}
                />
              );
            })}
          </Stack>
          <Stack
            direction={"row"}
            spacing={"12px"}
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{
              mt: { xs: "12px", md: "16px" },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedPackage(!selectedPackage);
              }}
              sx={{
                padding: { xs: "8px 16px", md: "10px 20px" },
                minWidth: { xs: "140px", md: "160px" },
              }}
            >
              {selectedPackage ? "Remove package" : "Add package"}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};
