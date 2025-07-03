import { Box, Container } from "@mui/material";
import { Hero } from "@/widgets/home/Hero";
import { Features } from "@/widgets/home/Features";
import { Courses } from "@/widgets/home/Courses";
import { TherapySession } from "@/widgets/home/TherapySession";
import { Testimonials } from "@/widgets/home/Testimonials";
import { FAQ } from "@/widgets/FAQ";

export default function Home() {
  return (
    <Box>
      <Container
        sx={{
          backgroundImage: "url(/hero_bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: { xs: "90vh", md: "120vh" },
        }}
        maxWidth={"xl"}
      >
        <Hero />
      </Container>
      <Features />
      <Courses />
      <TherapySession />
      <Testimonials />
      <FAQ />
    </Box>
  );
}
