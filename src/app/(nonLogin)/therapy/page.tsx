import { Hero } from "@/widgets/therapy/Hero";
import { Solutions } from "@/widgets/therapy/Solutions";
import { TherapyPlans } from "@/widgets/therapy/TherapyPlans";
import { Experience } from "@/widgets/therapy/Experience";
import { TherapyQuote } from "@/widgets/therapy/TherapyQuote";
import { Box } from "@mui/material";

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
