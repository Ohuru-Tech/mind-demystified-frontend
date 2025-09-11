import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
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
      <Box
        sx={{
          width: "253px",
          height: "253px",
          position: "absolute",
          right: "0px",
          bottom: "0px",
          backgroundColor: alpha("#F59B84", 0.5),
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Stack
        direction={"column"}
        spacing={"100px"}
        textAlign={"center"}
        sx={{ position: "relative", width: "100%", zIndex: 1 }}
      >
        <Typography variant="h2">
          Your path to
          <br /> Balance & Healing
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
        >
          <Stack
            justifyContent={"center"}
            direction={"row"}
            sx={{ flexWrap: "wrap", rowGap: "16px", columnGap: "16px" }}
          >
            <FeatureCard
              title="One-on-one guidance"
              href="/therapy"
              description={
                <>
                  Personalized support for
                  <br /> your journey.
                </>
              }
              image="/guidance.png"
            />
            <FeatureCard
              title="Courses and Certification"
              href="/courses"
              description={
                <>
                  Empower mind, body,
                  <br /> and soul.
                </>
              }
              image="/courses.png"
            />
            <FeatureCard
              title="Community and Growth"
              href="/courses"
              description={
                <>
                  Connect, Share, and Grow
                  <br /> Together.
                </>
              }
              image="/community.png"
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
