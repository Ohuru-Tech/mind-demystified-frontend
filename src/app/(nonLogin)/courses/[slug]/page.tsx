import { CourseAbout } from "@/widgets/courses/CourseAbout";
import { CourseTestimonials } from "@/widgets/courses/CourseTestimonials";
import { CourseHero } from "@/widgets/courses/CourseHero";
import { CourseModules } from "@/widgets/courses/CourseModules";
import { Box, Container } from "@mui/material";
import { CourseAppBar } from "@/widgets/courses/CourseAppBar";
import { CourseCommunity } from "@/widgets/courses/CourseCommunity";
import { CourseFAQ } from "@/widgets/courses/CourseFAQ";
import { getCourseDetails } from "@/app/actions/course";

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCourseDetails(slug);

  return (
    <Box>
      <CourseAppBar course={course} />
      <Box
        sx={{
          backgroundColor: "#FBEBE3",
          width: "100%",
          height: "87vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          // backgroundImage:
          //   "linear-gradient(to bottom, #FBEBE3 40%, #000000 100%)",
          backgroundImage: "url(/about_hero_bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(200px)",
          opacity: 0.4,
        }}
      ></Box>
      <Container maxWidth={"lg"} id="course-details-container">
        <CourseHero course={course} />
        {/* <Tabs centered value={"1"} sx={{ mt: "80px" }}>
          <Tab label="About" value="1" />
          <Tab label="Modules" value="2" />
          <Tab label="Testimonials" value="3" />
          <Tab label="Reviews" value="4" />
          <Tab label="Community" value="5" />
        </Tabs> */}
        <CourseAbout course={course} />
        <CourseModules course={course} />
        <CourseTestimonials />
      </Container>
      <CourseCommunity />
      <CourseFAQ />
    </Box>
  );
}
