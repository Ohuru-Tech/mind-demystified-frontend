import { Stack, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export const Hero = () => {
  return (
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
          Find Your <br /> Inner Balance
        </Typography>
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <Typography variant="body1" textAlign={"center"}>
            Healing the mind, body, and spirit—learn to use techniques via
            courses and become certified practitioners
          </Typography>
        </Box>
      </Stack>
      <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
        <Button variant="outlined" component={Link} href="/courses">
          Explore Courses
        </Button>
      </Stack>
    </Stack>
  );
};
