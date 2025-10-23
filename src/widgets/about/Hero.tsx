import { Stack, Typography, Button, Box, Container } from "@mui/material";
import { FreeCallButton } from "../common/FreeCallButton";

export const Hero = () => {
  return (
    <Container
      sx={{
        backgroundImage: "url(/about_hero_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: { xs: "90vh", md: "120vh" },
      }}
      maxWidth={"xl"}
    >
      <Stack
        direction={"column"}
        spacing={"62px"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          height: { xs: "85vh", md: "98vh" },
        }}
      >
        <Stack direction={"column"} spacing={2} alignItems={"center"}>
          <Typography variant="h1" textAlign={"center"}>
            Meet the Guides <br />
            Behind The Scenes
          </Typography>
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <Typography variant="body1" textAlign={"center"}>
              Led by Sanjeev Verma, joined by others dedicated to your
              awakening.
            </Typography>
          </Box>
        </Stack>
        <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
          <FreeCallButton variant="contained" text="Book a free Call" />
        </Stack>
      </Stack>
    </Container>
  );
};
