import {
  Stack,
  Typography,
  Button,
  Box,
  Container,
  alpha,
} from "@mui/material";
import Link from "next/link";
import { FreeCallButton } from "@/widgets/common/FreeCallButton";

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
          <Typography
            variant="h5"
            textAlign={"center"}
            color={alpha("#323232", 0.65)}
          >
            ONE-ON-ONE SESSIONS
          </Typography>
          <Typography variant="h1" textAlign={"center"}>
            Vedic Mind & <br />
            Heart Therapy
          </Typography>
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <Typography variant="body1" textAlign={"center"}>
              Personalized 1:1 well-being sessions designed for transformation,
              healing, and growth.
            </Typography>
          </Box>
        </Stack>
        <Stack direction={"row"} spacing={"10px"} alignItems={"center"}>
          <Typography variant="body1" textAlign={"center"}>
            Guided by:
          </Typography>
          <Typography variant="body1" textAlign={"center"} fontWeight={600}>
            Sanjeev Verma
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
          <FreeCallButton variant="contained" text="Book a free Call" />
        </Stack>
        {/* <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
          <Button variant="contained">Book a free Call</Button>
        </Stack> */}
      </Stack>
    </Container>
  );
};
