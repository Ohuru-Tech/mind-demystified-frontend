import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const experiences = [
  {
    title: "Understand how your mind works",
    description:
      "You'll learn to observe your thoughts and patterns with clarity, freeing yourself from emotional loops and reacting with awareness.",
    image: "/understand.png",
  },
  {
    title: "You'll feel lighter, clearer, and truly transformed.",
    description:
      "This journey doesn't just heal—it shifts you. You'll release what no longer serves you and step into a more grounded version of yourself.",
    image: "/feelLighter.png",
  },
  {
    title: "You'll discover who you truly are.",
    description:
      "Through deep reflection, you'll stop chasing external identities and reconnect with your real, unshaken self.",
    image: "/discover.png",
  },
  {
    title: "Spiritual principles will become real and practical.",
    description:
      "Manifestation, detachment, and inner alignment won't just be ideas—you'll begin living them effortlessly, with trust and ease.",
    image: "/principles.png",
  },
];

export const Experience = () => {
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: "221px" }}>
      <Stack direction={"column"} spacing={"10px"}>
        <Typography variant="h2" textAlign={"center"}>
          What you&apos;ll experience
        </Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          sx={{
            paddingLeft: { xs: "0px", md: "320px", lg: "320px" },
            paddingRight: { xs: "0px", md: "320px", lg: "320px" },
          }}
        >
          Feel guided, supported, and much more through every powerful session.
        </Typography>
      </Stack>
      <Stack
        direction={"column"}
        spacing={"40px"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          marginTop: "100px",
          position: "relative",
        }}
      >
        {experiences.map((experience, index) => (
          <Stack
            key={experience.title}
            sx={{
              backgroundColor: "#FBEBE3",
              width: { xs: "100%", md: "962px", lg: "962px" },
              borderRadius: "20px",
              overflow: "hidden",
              position: "sticky",
              top: "100px",
              zIndex: index + 1,
            }}
            flexDirection={"column"}
          >
            <Stack
              sx={{
                marginTop: "24px",
                paddingLeft: { xs: "0px", md: "60px", lg: "60px" },
                paddingRight: { xs: "0px", md: "60px", lg: "60px" },
                paddingBottom: "10px",
              }}
              direction={"column"}
              spacing={"10px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography variant="h4" textAlign={"center"}>
                {experience.title}
              </Typography>
              <Typography
                sx={{
                  paddingLeft: { xs: "0px", md: "120px", lg: "120px" },
                  paddingRight: { xs: "0px", md: "120px", lg: "120px" },
                }}
                variant="body2"
                textAlign={"center"}
              >
                {experience.description}
              </Typography>
            </Stack>
            <Image
              alt={experience.title}
              src={experience.image}
              width={962}
              height={490}
            />
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};
