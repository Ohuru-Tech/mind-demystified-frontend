import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/material";

export const AboutQuote = () => {
  return (
    <Stack
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      spacing={"40px"}
      sx={{
        backgroundImage: "url(/meditate_hero_bg.png)",
        backgroundSize: "cover",
        height: "750px",
      }}
      mt={"100px"}
      pt={"100px"}
    >
      <Stack direction={"column"} spacing={"1px"}>
        <Typography variant={"h4"} textAlign={"center"}>
          &quot;The wound is the place where the Light enters you.&quot;
        </Typography>
        <Typography
          variant="body1"
          textAlign={"right"}
          component={"span"}
          pr={2}
        >
          ~Rumi
        </Typography>
      </Stack>
      <Stack direction={"column"} spacing={"100px"}>
        <Stack
          direction={"row"}
          id="community"
          sx={{
            paddingLeft: { xs: "0px", md: "400px", lg: "400px" },
            paddingRight: { xs: "0px", md: "400px", lg: "400px" },
          }}
        >
          <Typography variant={"body1"} textAlign={"center"}>
            If this resonates, you&apos;re already one step closer to the path.{" "}
            Explore our courses or book a session today.
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row", lg: "row" }}
          spacing={"22px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            sx={{ width: { xs: "90%", md: "auto", lg: "auto" } }}
            variant="contained"
          >
            Explore Therapy
          </Button>
          <Button
            sx={{ width: { xs: "90%", md: "auto", lg: "auto" } }}
            variant="outlined"
          >
            Explore Courses
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
