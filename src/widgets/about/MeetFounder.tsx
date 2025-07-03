import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export const MeetFounder = () => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        position: "relative",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
        marginTop: "220px",
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
          width={"100%"}
          direction={"column"}
          spacing={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h2" textAlign={"center"}>
            Meet Our Founder
          </Typography>
          <Stack
            direction={"column"}
            spacing={"52px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
                width: "337px",
                height: "366px",
              }}
            >
              <Image
                src={"/founder.png"}
                alt="founder"
                width={337}
                height={366}
              />
            </Box>
            <Stack direction={"column"} spacing={"1px"}>
              <Typography variant="h6" textAlign={"center"}>
                Sanjeev Verma
              </Typography>
              <Typography variant="body2" textAlign={"center"}>
                Founder
              </Typography>
            </Stack>
            <Stack
              direction={"column"}
              paddingLeft={{ xs: "0px", md: "200px", lg: "200px" }}
              paddingRight={{ xs: "0px", md: "200px", lg: "200px" }}
              spacing={"1px"}
            >
              <Typography variant="body1">
                Sanjeev, a spiritual mentor, meditation master, and jyotish,
                guides seekers through transformational programs based on
                Spiritual Mind Principles.
                <br />
                <br />
                Honored worldwide, he empowers individuals to achieve their
                highest potential in love, abundance, health, and healing
                through the Seven Rights of Consciousness, harmonizing the
                material and spiritual paths.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
};
