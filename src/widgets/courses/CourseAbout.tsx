import { Grid, Stack, Typography } from "@mui/material";
import { CourseDetail } from "@/models/course";
import Image from "next/image";

export const CourseAbout = ({ course }: { course: CourseDetail }) => {
  return (
    <>
      <Stack direction={"column"} mt={"60px"} alignItems={"center"}>
        <Typography variant="h4" component={"h2"}>
          What You'll Learn
        </Typography>
        <Grid container marginTop={"50px"} rowGap={"30px"}>
          {course.outcomes.map((outcome) => {
            return (
              <Grid size={{ lg: 6, md: 12 }} key={outcome.order}>
                <Stack direction={"row"} spacing={"20px"} alignItems={"center"}>
                  <Image
                    src={"/check.png"}
                    height={30}
                    width={30}
                    alt={"Check"}
                  />
                  <Typography variant="body2" color={"text.secondary"}>
                    {outcome.description}
                  </Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      <Stack
        direction={"column"}
        alignItems={"center"}
        mt={"114px"}
        spacing={"50px"}
        justifyContent={"center"}
      >
        <Typography variant="h5" textAlign={"center"} color={"text.secondary"}>
          Details to know
        </Typography>
        <Stack
          width={"100%"}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          rowGap={"30px"}
          alignItems={"center"}
        >
          {course.has_certificate && (
            <Stack
              sx={{ width: { xs: "100%", md: "50%", lg: "auto" } }}
              direction={"column"}
              alignItems={"center"}
              spacing={"5px"}
            >
              <Image
                src={"/shareableCertificate.png"}
                height={70}
                width={70}
                alt={"Certificate"}
              />
              <Typography variant="body1">Shareable Certificate</Typography>
            </Stack>
          )}
          <Stack
            id="about"
            direction={"column"}
            sx={{ width: { xs: "100%", md: "50%", lg: "auto" } }}
            alignItems={"center"}
            spacing={"5px"}
          >
            <Image
              src={"/assesments.png"}
              height={70}
              width={70}
              alt={"Assesments"}
            />
            <Typography variant="body1">
              {course.num_assessments || 0} Assessments
            </Typography>
          </Stack>
          <Stack
            sx={{ width: { xs: "100%", md: "50%", lg: "auto" } }}
            direction={"column"}
            alignItems={"center"}
            spacing={"5px"}
          >
            <Image
              src={"/language.png"}
              height={70}
              width={70}
              alt={"Language"}
            />
            <Typography variant="body1">Taught in English</Typography>
          </Stack>
          <Stack
            sx={{ width: { xs: "100%", md: "50%", lg: "auto" } }}
            direction={"column"}
            alignItems={"center"}
            spacing={"5px"}
          >
            <Image
              src={"/handOn.png"}
              height={70}
              width={70}
              alt={"Hands On Sessions"}
            />
            <Typography variant="body1">Hands on sesssions</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        spacing={"2px"}
        mt={"100px"}
        width={"100%"}
        flexWrap={{ xs: "wrap", md: "nowrap" }}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          border: "1px solid #C9BCB6",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            paddingLeft: { xs: "20px", md: "0px", lg: "50px" },
            paddingRight: { xs: "20px", md: "0px", lg: "10px" },
            paddingTop: { xs: "50px", md: "0px", lg: "50px" },
            paddingBottom: { xs: "20px", md: "0px", lg: "50px" },
          }}
        >
          A certificate will be awarded upon successful course completion, which
          includes achieving the required grades in assesments and attending the
          mandatory hands-on sessions.
        </Typography>
        <Image
          src={"/certificate.png"}
          height={207}
          width={254}
          alt={"Certificate"}
        />
      </Stack>
    </>
  );
};
