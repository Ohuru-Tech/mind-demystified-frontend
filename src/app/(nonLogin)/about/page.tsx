import { Hero } from "@/widgets/about/Hero";
import { CoreValues } from "@/widgets/about/CoreValues";
import { WhyExist } from "@/widgets/about/WhyExist";
import { MeetFounder } from "@/widgets/about/MeetFounder";
import { MeetTeam } from "@/widgets/about/MeetTeam";
import { AboutQuote } from "@/widgets/about/AboutQuote";
import { Box } from "@mui/material";

export default function About() {
  return (
    <Box>
      <Hero />
      <WhyExist />
      <CoreValues />
      <MeetFounder />
      <MeetTeam />
      <AboutQuote />
    </Box>
  );
}
