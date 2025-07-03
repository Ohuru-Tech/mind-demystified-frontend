"use client";

import { CourseBookingSummary } from "@/widgets/courses/CourseBookingSummary";
import { CoursePaymentSummary } from "@/widgets/courses/CoursePaymentSummary";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CourseCheckoutPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [selectedPackage, setSelectedPackage] = useState<boolean>(false);

  return (
    <Grid
      container
      spacing={"52px"}
      justifyContent={"center"}
      margin={0}
      sx={{ minHeight: "80vh" }}
    >
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          paddingLeft: "40px",
          height: "98vh",
          paddingRight: "52px",
          position: "sticky",
          top: 0,
        }}
      >
        <CourseBookingSummary
          courseSlug={slug}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundColor: "white",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
          paddingRight: "52px",
          paddingLeft: "40px",
          filter: "drop-shadow(0px 9px 52px rgba(0, 0, 0, 0.1))",
        }}
      >
        <CoursePaymentSummary
          courseSlug={slug}
          selectedPackage={selectedPackage}
        />
      </Grid>
    </Grid>
  );
}
