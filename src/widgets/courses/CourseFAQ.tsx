import { Container, Grid, Stack, Typography } from "@mui/material";
import { FaqCard } from "@/widgets/FaqCard";

const faq = [
  {
    question:
      "What makes Mind Demystified’s courses different from other wellness platforms?",
    answer:
      "Mind Demystified combines ancient wisdom with modern psychology to offer practical, research-backed tools for emotional healing, mental clarity, and spiritual growth. Our programs include guided practices, self-paced lessons, and personalized support to ensure lasting transformation.",
  },
  {
    question: "How are personalized mantras created?",
    answer:
      "Our personalized mantras are crafted by our expert team, drawing from ancient wisdom and modern psychology. We consider your unique needs, goals, and challenges to create mantras that resonate with you and support your journey.",
  },
  {
    question: "How long do I need to practice for results?",
    answer:
      "Results vary by individual, but many students report feeling calmer and more centered within 2-4 weeks of consistent practice. For lasting transformation, we recommend committing to at least 8-12 weeks of regular practice, integrating the techniques into your daily routine.",
  },
  {
    question: "Are the courses live or self-paced?",
    answer:
      "All our courses are self-paced, allowing you to learn at your own pace. You can access the course materials and resources anytime, anywhere, and on any device.",
  },
  {
    question: "Is any prior knowledge of yoga or Vedic sciences needed?",
    answer:
      "No prior knowledge of yoga or Vedic sciences is required. Our courses are designed to be accessible to everyone, regardless of their background or experience.",
  },
];

export const CourseFAQ = () => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        marginTop: "220px",
      }}
    >
      <Stack
        direction={"column"}
        spacing={"100px"}
        textAlign={"center"}
        sx={{
          position: "relative",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Stack direction={"column"} spacing={"0px"}>
          <Typography variant="h2" id="courseFAQ">
            Frequently Asked Questions
          </Typography>
        </Stack>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            size={{ xs: 12, md: 10 }}
            sx={{
              backgroundColor: "white",
              padding: "4%",
              borderRadius: "20px",
              borderColor: "divider",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <Stack direction={"column"} spacing={"35px"}>
              {faq.map((item, index) => (
                <FaqCard
                  key={index}
                  {...item}
                  open={index === 0}
                  showDivider={index !== faq.length - 1}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
