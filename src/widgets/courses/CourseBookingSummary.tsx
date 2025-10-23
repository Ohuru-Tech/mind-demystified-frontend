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
    <Stack direction={"column"} spacing={"24px"} mt={"40px"}>
      <Typography variant="h4">Checkout</Typography>
      {course && (
        <Stack
          direction={"row"}
          spacing={"30px"}
          padding={"20px"}
          width={"fit-content"}
          sx={{
            backgroundColor: "white",
            border: "1px solid #E0E0E0",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "12px",
              border: "1px solid #E0E0E0",
              overflow: "hidden",
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
          <Stack direction={"column"} spacing={"8px"}>
            <Typography variant="h6">{course?.title}</Typography>
            <Stack direction={"row"} spacing={"4px"}>
              <Stack direction={"row"} spacing={"-16px"}>
                {course.instructors.map((instructor) => {
                  return <Avatar src={instructor.image} key={instructor.id} />;
                })}
              </Stack>
              <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
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
          <Divider orientation="vertical" flexItem />
          <Stack direction={"column"} justifyContent={"space-between"} p={1}>
            <Stack
              direction={"row"}
              spacing={"4px"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Icon
                icon="flowbite:clock-outline"
                height={25}
                width={25}
                color={"#323232"}
              />
              <Typography variant={"body2"} color={"primary.main"}>
                {course?.duration}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              spacing={"4px"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Icon icon="streamline-plump:module" height={25} width={25} />
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
            spacing={"30px"}
            sx={{
              overflowX: "scroll",
              overflowY: "visible",
              marginTop: "20px !important",
              paddingTop: "40px",
              paddingBottom: "20px",
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
          <Stack direction={"row"} spacing={"12px"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedPackage(!selectedPackage);
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
