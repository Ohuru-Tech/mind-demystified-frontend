import { alpha, Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const coreValues = [
  {
    image: "/simplicity.png",
    title: "Simplicity",
    description:
      "We believe simplicity clears the path for deep and lasting transformation.",
  },
  {
    image: "/interconnectedness.png",
    title: "Interconnectedness",
    description:
      "We nurture unity and oneness that transcends boundaries and divisions.",
  },
  {
    image: "/empowerment.png",
    title: "Empowerment",
    description:
      "We empower individuals to recognize and awaken their inner potential.",
  },
  {
    image: "/holisticWellBeing.png",
    title: "Holistic Well-Being",
    description:
      "We support the growth of the whole self—body, mind, and spirit.",
  },
  {
    image: "/balanceMaterial.png",
    title: "Balance of Material and Spiritual",
    description:
      "We harmonize the material and spiritual realms for aligned living.",
  },
  {
    image: "/innerSuccess.png",
    title: "Inner Success",
    description:
      "We believe outer success is a natural outcome of inner clarity and strength.",
  },
];

export const CoreValues = () => {
  return (
    <Container
      maxWidth={"lg"}
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
        mt={"220px"}
        spacing={"100px"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Typography variant="h2" textAlign={"center"}>
          Our Core Values
        </Typography>
      </Stack>
      <Grid container spacing={"22px"} mt={"100px"}>
        {coreValues.map((value) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={value.title}>
            <Stack
              direction={"column"}
              spacing={"13px"}
              sx={{
                padding: "21px",
                backgroundColor: "white",
                borderRadius: "20px",
                border: "1px solid #E0E0E0",
                height: "150px",
              }}
            >
              <Image
                src={value.image}
                height={50}
                width={50}
                alt={value.title}
              />
              <Typography variant="body1" color={"textSecondary"}>
                {value.title}
              </Typography>
              <Typography variant="body2">{value.description}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
