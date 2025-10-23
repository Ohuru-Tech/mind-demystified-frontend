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
          paddingLeft: { xs: "20px", md: "40px" },
          height: { xs: "auto", md: "112vh" },
          paddingRight: { xs: "20px", md: "52px" },
          paddingBottom: { xs: "20px", md: "100px" },
          position: { xs: "static", md: "sticky" },
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
          borderTopLeftRadius: { xs: "0px", md: "12px" },
          borderBottomLeftRadius: { xs: "0px", md: "12px" },
          borderTopRightRadius: { xs: "12px", md: "0px" },
          borderBottomRightRadius: { xs: "12px", md: "0px" },
          paddingRight: { xs: "20px", md: "52px" },
          paddingLeft: { xs: "20px", md: "40px" },
          paddingTop: { xs: "20px", md: "0px" },
          paddingBottom: { xs: "20px", md: "0px" },
          filter: "drop-shadow(0px 9px 52px rgba(0, 0, 0, 0.1))",
          marginTop: { xs: "20px", md: "0px" },
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
