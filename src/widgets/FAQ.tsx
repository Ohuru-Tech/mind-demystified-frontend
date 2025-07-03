import { Container, Grid, Stack, Typography } from "@mui/material";
import { FaqCard } from "./FaqCard";

const faq = [
  {
    question:
      "What makes Mind Demystified’s courses different from other wellness platforms?",
    answer:
      "Mind Demystified combines ancient wisdom with modern psychology to offer practical, research-backed tools for emotional healing, mental clarity, and spiritual growth. Our programs include guided practices, self-paced lessons, and personalized support to ensure lasting transformation.",
  },
  {
    question: "Are the courses certified? Will I receive a certificate?",
    answer:
      "Yes, all our structured courses come with a certificate of completion, which you can download once you successfully complete all modules and assignments.",
  },
  {
    question: "I’m new to meditation and mantras. Can I still join?",
    answer:
      "Absolutely! Our courses are beginner-friendly and designed to guide you step-by-step, with audio guidance, foundational explanations, and personalized recommendations to ease you into the practice.",
  },
  {
    question: "How are personalized mantras created?",
    answer:
      "Our personalized mantras are crafted by our expert team, drawing from ancient wisdom and modern psychology. We consider your unique needs, goals, and challenges to create mantras that resonate with you and support your journey.",
  },
  {
    question: "How do I know if a course is right for me?",
    answer:
      "Our courses are designed to be accessible to everyone, regardless of their background or experience. We offer a range of programs, from beginner-friendly courses to advanced workshops, so you can choose the one that best suits your needs and goals.",
  },
  {
    question: "How long do I need to practice for results?",
    answer:
      "Results vary by individual, but many students report feeling calmer and more centered within 2-4 weeks of consistent practice. For lasting transformation, we recommend committing to at least 8-12 weeks of regular practice, integrating the techniques into your daily routine.",
  },
  {
    question: "Can I access the courses on mobile devices?",
    answer:
      "Yes, our platform is fully responsive and optimized for mobile devices. You can access all course content, meditation guides, and resources through our mobile-friendly website or dedicated app, making it convenient to practice anywhere, anytime.",
  },
  {
    question: "Do you offer refunds if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee on all our courses. If you're not completely satisfied with your experience, simply contact our support team within 30 days of purchase for a full refund, no questions asked.",
  },
  {
    question: "Is there ongoing support after completing a course?",
    answer:
      "Absolutely! After completing a course, you retain lifetime access to all course materials and resources. We also have an active community forum where you can connect with fellow practitioners, share experiences, and get support from our instructors.",
  },
];

export const FAQ = () => {
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
          <Typography variant="h2">Frequently Asked Questions</Typography>
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
