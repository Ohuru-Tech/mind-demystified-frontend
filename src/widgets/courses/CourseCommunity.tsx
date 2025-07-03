import { Typography } from "@mui/material";
import { Stack } from "@mui/material";

export const CourseCommunity = () => {
  return (
    <Stack
      direction={"column"}
      justifyContent={"flex-start"}
      spacing={"40px"}
      sx={{
        backgroundImage: "url(/communityBackground.png)",
        backgroundSize: "cover",
        height: "844px",
      }}
      mt={"100px"}
      pt={"100px"}
    >
      <Typography variant={"h4"} textAlign={"center"}>
        FREE access to community with every certification course.
      </Typography>
      <Stack
        direction={"row"}
        id="community"
        sx={{
          paddingLeft: { xs: "0px", md: "300px", lg: "300px" },
          paddingRight: { xs: "0px", md: "300px", lg: "300px" },
        }}
      >
        <Typography variant={"body1"} textAlign={"center"}>
          Embark on your spiritual journey with us. Gain exclusive access to
          shared experiences, meaningful insights, and intimate fireside chats
          led by Sanjeev. Join our vibrant community dedicated to personal
          growth and connection.
        </Typography>
      </Stack>
    </Stack>
  );
};
