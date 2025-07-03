import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { FreeCallButton } from "@/widgets/common/FreeCallButton";

export const TherapyQuote = () => {
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
      pt={{ xs: "0px", md: "100px", lg: "100px" }}
    >
      <Stack direction={"column"} spacing={"10px"}>
        <Typography variant={"h2"} textAlign={"center"}>
          You&apos;re not alone
        </Typography>
      </Stack>
      <Stack direction={"column"} spacing={"100px"}>
        <Stack
          direction={"row"}
          id="community"
          sx={{
            paddingLeft: { xs: "0px", md: "300px", lg: "300px" },
            paddingRight: { xs: "0px", md: "300px", lg: "300px" },
          }}
        >
          <Typography variant={"body1"} textAlign={"center"}>
            Uncover personalized healing strategies tailored to your unique
            journey, meet our compassionate practitioners who are here to
            support you, ask questions to explore your needs deeply, and
            experience a taste of the tranquility that awaits.
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={"22px"} justifyContent={"center"}>
          <FreeCallButton variant="contained" text="Book a free consultation" />
        </Stack>
      </Stack>
    </Stack>
  );
};
