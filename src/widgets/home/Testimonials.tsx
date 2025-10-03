import { Testimonial } from "@/models/testimonial";
import { TestimonialsAPIs } from "@/utils/testimonialsAPIs";
import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import { TestimonialCard } from "./TestimonialCard";

const testimonialsAPIs = TestimonialsAPIs();

export const Testimonials = async () => {
  let testimonials: Testimonial[] = [];

  try {
    const testimonialResults = await testimonialsAPIs.getTestimonials(20, 0);
    testimonials = testimonialResults.results;
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    testimonials = [];
  }

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        position: "relative",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
        marginTop: "220px",
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
      <Stack
        direction={"column"}
        spacing={"120px"}
        textAlign={"center"}
        sx={{ position: "relative", width: "100%", zIndex: 1 }}
      >
        <Stack direction={"column"} spacing={"10px"}>
          <Typography variant="h2">Testimonials</Typography>
          {/* <Typography variant="body1">Real Stories, Real Shifts</Typography> */}
        </Stack>

        {testimonials.length > 0 ? (
          <Stack
            direction={"row"}
            spacing={"16px"}
            sx={{
              overflow: "hidden",
              width: "100%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                animation: "scroll 50s linear infinite",
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
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={`second-${testimonial.id}`}
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
      </Stack>
    </Container>
  );
};
