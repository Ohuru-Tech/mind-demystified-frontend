import React from "react";
import { Box, Container, Typography, Stack, Grid } from "@mui/material";
import { FaqCard } from "@/widgets/FaqCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Mind Demystified",
  description:
    "Find answers to frequently asked questions about our courses, therapy sessions, and mental wellness services.",
};

const faqData = [
  {
    question: "What is Mind Demystified?",
    answer:
      "Mind Demystified is a comprehensive platform dedicated to mental wellness and personal growth. We offer online courses, therapy sessions, and community support to help individuals find their inner balance and achieve mental well-being.",
  },
  {
    question: "How do I access my purchased courses?",
    answer:
      "Once you purchase a course, you'll receive immediate access through your dashboard. Simply log in to your account and navigate to the 'Learning' section to find all your enrolled courses.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee on all course purchases. If you're not satisfied within 30 days, you can request a full refund through our support system.",
  },
  {
    question: "How do therapy sessions work?",
    answer:
      "Our therapy sessions are conducted online via secure video calls. You can book sessions with qualified therapists, and they're available at various times to accommodate your schedule. Sessions can be cancelled up to 24 hours in advance.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We take data security seriously and implement industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent.",
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Yes, our platform is fully responsive and works on all devices including smartphones, tablets, and computers. You can access your courses and participate in therapy sessions from anywhere.",
  },
  {
    question: "What if I need technical support?",
    answer:
      "Our support team is available to help with any technical issues. You can contact us through the support chat, email us at support@minddemystified.com, or use the contact form on our website.",
  },
  {
    question: "Are the therapists licensed and qualified?",
    answer:
      "Yes, all our therapists are licensed professionals with proper qualifications and experience. We carefully vet all practitioners to ensure they meet our high standards for quality care.",
  },
  {
    question: "Can I download course materials?",
    answer:
      "Course materials are available for streaming and viewing within the platform. Some materials may be available for download, but this varies by course. Please check individual course details for specific information.",
  },
  {
    question: "How do I join the community?",
    answer:
      "The community is available to all registered users. You can participate in discussions, share experiences, and connect with others on similar wellness journeys through our community platform.",
  },
];

export default function FAQ() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Stack
          direction="column"
          spacing="100px"
          textAlign="center"
          sx={{
            position: "relative",
            width: "100%",
            zIndex: 1,
          }}
        >
          <Stack direction="column" spacing="0px">
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
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
              <Stack direction="column" spacing="35px">
                {faqData.map((faq, index) => (
                  <FaqCard
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    open={index === 0}
                    showDivider={index !== faqData.length - 1}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
