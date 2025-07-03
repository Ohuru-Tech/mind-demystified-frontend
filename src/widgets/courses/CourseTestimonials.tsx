import { Testimonial } from "@/models/testimonial";
import { TestimonialsAPIs } from "@/utils/testimonialsAPIs";
import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import { TestimonialCard } from "../home/TestimonialCard";

const testimonialsAPIs = TestimonialsAPIs();

export const CourseTestimonials = async () => {
  let testimonials: Testimonial[] = [];

  try {
    const testimonialResults = await testimonialsAPIs.getTestimonials(10, 0);
    testimonials = testimonialResults.results;
  } catch (error) {
    console.error("Failed to fetch course testimonials:", error);
    testimonials = [];
  }

  return (
    <Stack
      id="testimonials"
      marginTop={"212px"}
      justifyContent={"center"}
      spacing={"50px"}
      width={"100%"}
    >
      <Typography variant="h4" textAlign={"center"}>
        Testimonials
      </Typography>
      <Container
        maxWidth={"xl"}
        sx={{
          position: "relative",
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
        }}
      >
        <Box
          sx={{
            width: "253px",
            height: "253px",
            position: "absolute",
            left: "0px",
            top: "0px",
            backgroundColor: alpha("#F59B84", 0.5),
            filter: "blur(150px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        {testimonials.length > 0 ? (
          <Stack
            direction={"row"}
            spacing={"16px"}
            sx={{
              overflow: "scroll",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                animation: "scroll 100s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
                "@keyframes scroll": {
                  "0%": {
                    transform: "translateX(0)",
                  },
                  "100%": {
                    transform: "translateX(-50%)",
                  },
                },
              }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </Box>
          </Stack>
        ) : (
          <Stack
            direction={"column"}
            spacing={"20px"}
            alignItems={"center"}
            sx={{
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "20px",
              border: "1px solid #E0E0E0",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              Testimonials are currently unavailable
            </Typography>
            <Typography
              variant="body2"
              textAlign={"center"}
              color="text.secondary"
            >
              Please check back later for testimonials.
            </Typography>
          </Stack>
        )}
      </Container>
    </Stack>
  );
};
