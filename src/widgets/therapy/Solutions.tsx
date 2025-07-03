import { alpha, Box, Container, Stack, Typography } from "@mui/material";

const areas = [
  {
    title: "Mental Health",
    image: "/mentalHealth.png",
  },
  {
    title: "Meditation",
    image: "/meditation.png",
  },
  {
    title: "Emotions",
    image: "/emotions.png",
  },
  {
    title: "Wellness",
    image: "/wellness.png",
  },
  {
    title: "Discipline",
    image: "/discipline.png",
  },
  {
    title: "Growth",
    image: "/growth.png",
  },
  {
    title: "Sleep",
    image: "/sleep.png",
  },
  {
    title: "Relationships",
    image: "/relationships.png",
  },
  {
    title: "Resilience",
    image: "/resilience.png",
  },
  {
    title: "Balance",
    image: "/balance.png",
  },
  {
    title: "Health",
    image: "/health.png",
  },
  {
    title: "Self Love",
    image: "/selfLove.png",
  },
  {
    title: "Confidence",
    image: "/confidence.png",
  },
  {
    title: "Healing",
    image: "/healing.png",
  },
  {
    title: "Focus",
    image: "/focus.png",
  },
] as const;

export const Solutions = () => {
  return (
    <Box
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
        spacing={"124px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack direction={"column"} spacing={"10px"}>
          <Typography variant="h2" textAlign={"center"}>
            We&apos;ll Journey Through
          </Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            sx={{
              paddingLeft: { xs: "0px", md: "200px", lg: "200px" },
              paddingRight: { xs: "0px", md: "200px", lg: "200px" },
            }}
          >
            …your inner world — its struggles, stories, and strength
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={"16px"}
          sx={{
            overflow: "scroll",
            width: "100%",
            position: "relative",
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
                  transform: "translateX(0%)",
                },
                "100%": {
                  transform: "translateX(-50%)",
                },
              },
            }}
          >
            {areas.map((area) => (
              <Stack
                key={area.title}
                sx={{
                  width: "252px",
                  height: "300px",
                  borderRadius: "20px",
                  backgroundImage: `url(${area.image})`,
                }}
                direction={"column"}
                justifyContent={"flex-end"}
              >
                <Typography variant="h6" textAlign={"center"} color={"white"}>
                  {area.title}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
