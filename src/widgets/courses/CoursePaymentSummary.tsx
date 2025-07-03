"use client";

import { CourseBundle, CourseDetail } from "@/models/course";
import { getCourseBundle, getCourseDetail } from "@/app/actions/course";
import React, { useEffect, useState } from "react";
import { Box, Collapse, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import PayPalCourse from "../payments/PayPalCourse";

type CoursePaymentSummaryProps = {
  courseSlug: string;
  selectedPackage: boolean;
};

export const CoursePaymentSummary = ({
  courseSlug,
  selectedPackage,
}: CoursePaymentSummaryProps) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [bundle, setBundle] = useState<CourseBundle | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(true);

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

  const coursesToRender = [
    ...(!selectedPackage ? [course] : []),
    ...((selectedPackage && bundle?.courses) || []),
  ];

  return (
    <Stack
      direction={"column"}
      spacing={"30px"}
      height={"100%"}
      width={"100%"}
      justifyContent={"center"}
    >
      <Typography variant={"h4"} color={"primary.main"}>
        Payment Summary
      </Typography>
      <Stack direction={"column"} spacing={"25px"}>
        <Collapse in={isSummaryOpen}>
          <Stack direction={"column"} spacing={"25px"}>
            {coursesToRender.map((course, index) => (
              <React.Fragment key={course?.slug}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack
                    direction={"row"}
                    spacing={"16px"}
                    alignItems={"center"}
                  >
                    <Box
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "12px",
                        border: "1px solid #E0E0E0",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={course?.image || ""}
                        alt={course?.title || ""}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </Box>
                    <Stack direction={"column"} spacing={"2px"}>
                      <Typography variant={"h6"} color={"primary.main"}>
                        {course?.title}
                      </Typography>
                      <Typography variant={"body2"}>
                        Modules: {course?.num_modules}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={"column"}
                    spacing={"2px"}
                    justifyContent={"flex-end"}
                  >
                    <Typography
                      variant={"body2"}
                      fontFamily={"monospace"}
                      color={"primary.main"}
                    >
                      ${parseFloat(course?.price?.toString() || "0") || 0}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider
                  sx={{
                    mt: 2,
                    mb: 2,
                    borderColor: "divider",
                  }}
                />
              </React.Fragment>
            ))}
          </Stack>
        </Collapse>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant={"body2"} color={"primary.main"}>
          Subtotal
        </Typography>
        <Typography
          variant={"body2"}
          sx={{ fontFamily: "monospace" }}
          color={"primary.main"}
        >
          $
          {selectedPackage
            ? bundle?.courses.reduce(
                (acc, course) =>
                  acc + (parseFloat(course.price?.toString() || "0") || 0),
                0
              )
            : course?.price}
        </Typography>
      </Stack>
      {selectedPackage && bundle?.savings && (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            spacing={"16px"}
            p={"12px"}
            sx={{ backgroundColor: "divider", borderRadius: "5px" }}
          >
            <Image src={"/tag.svg"} alt={"discount"} width={24} height={24} />
            <Typography variant={"body2"} color={"primary.main"}>
              SAVE {bundle.savings}%
            </Typography>
          </Stack>
          <Typography variant={"body2"} sx={{ fontFamily: "monospace" }}>
            - $
            {(bundle?.courses.reduce(
              (acc, course) =>
                acc + (parseFloat(course.price?.toString() || "0") || 0),
              0
            ) || 0) - (parseFloat(bundle?.price || "0") || 0)}
          </Typography>
        </Stack>
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"body2"} color={"primary.main"}>
          Tax
        </Typography>
        <Typography variant={"body2"}>---</Typography>
      </Stack>
      <Divider flexItem />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h5"} color={"primary.main"}>
          Total
        </Typography>
        <Typography
          variant={"h5"}
          sx={{ fontFamily: "monospace" }}
          color={"primary.main"}
        >
          ${selectedPackage ? bundle?.price : course?.price}
        </Typography>
      </Stack>
      <PayPalCourse
        course={course}
        bundle={bundle}
        selectedCourses={coursesToRender}
        total={selectedPackage ? bundle?.price : course?.price}
        isSummaryOpen={isSummaryOpen}
        setIsSummaryOpen={setIsSummaryOpen}
        selectedPackage={selectedPackage}
      />
    </Stack>
  );
};
