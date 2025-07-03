import { Hero } from "@/widgets/therapy/Hero";
import { Solutions } from "@/widgets/therapy/Solutions";
import { TherapyPlans } from "@/widgets/therapy/TherapyPlans";
import { Experience } from "@/widgets/therapy/Experience";
import { TherapyQuote } from "@/widgets/therapy/TherapyQuote";
import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Therapy Sessions - Mind Demystified",
  description:
    "Book personalized therapy sessions with our experienced mental health professionals for holistic wellness.",
};

export default function TherapyPage() {
  return (
    <Box>
      <Hero />
      <Solutions />
      <TherapyPlans />
      <Experience />
      <TherapyQuote />
    </Box>
  );
}
