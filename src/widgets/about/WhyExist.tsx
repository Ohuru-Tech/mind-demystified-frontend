import { alpha, Box, Container, Stack, Typography } from "@mui/material";

export const WhyExist = () => {
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
      <Container maxWidth={"lg"}>
        <Stack
          direction={"column"}
          spacing={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            paddingLeft: { xs: "0px", md: "200px", lg: "200px" },
            paddingRight: { xs: "0px", md: "200px", lg: "200px" },
          }}
        >
          <Typography variant="h2" textAlign={"center"}>
            Why we exist?
          </Typography>
          <Typography variant="body1">
            We live in a world that celebrates outer success — titles,
            achievements, recognition.
            <br />
            <br />
            But deep down, many of us feel something’s missing. A quiet pull
            toward something deeper, more meaningful.
            <br />
            <br />
            At our core, we believe real transformation begins within.
            <br />
            <br />
            That’s why we’ve created a global space for spiritual growth — where
            ancient wisdom meets modern life.
            <br />
            <br />
            Through powerful teachings, immersive meditation, and a supportive
            community, we help individuals reconnect with their true selves.
            <br />
            <br />
            Here, oneness is lived, resilience is nurtured, and personal growth
            is celebrated.
            <br />
            <br />
            Because when inner success is your foundation, outer success becomes
            effortless.
          </Typography>
        </Stack>
      </Container>
    </Container>
  );
};
