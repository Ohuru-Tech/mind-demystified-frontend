import { alpha, Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

const team = [
  {
    image: "/otherFounder.png",
    name: "Jane Doe",
    title: "CEO, Company",
    quote: "Jane teaches mantra healing through Vedic psychology.",
    description:
      "What makes Mind Demystified’s courses different from other wellness platforms? Empower mind, body, soul. other wellness platforms? Empower mind, body, soul.",
  },
  {
    image: "/otherFounder.png",
    name: "Jane Doe",
    title: "CEO, Company",
    quote: "Jane teaches mantra healing through Vedic psychology.",
    description:
      "What makes Mind Demystified’s courses different from other wellness platforms? Empower mind, body, soul. other wellness platforms? Empower mind, body, soul.",
  },
];

export const MeetTeam = () => {
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
          Meet the Team
        </Typography>
      </Stack>
      <Grid container spacing={"22px"} mt={"100px"} justifyContent={"center"}>
        {team.map((member, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
            <Stack
              direction={"column"}
              spacing={"13px"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                padding: "21px",
                backgroundColor: "white",
                borderRadius: "20px",
                border: "1px solid #E0E0E0",
              }}
            >
              <Box sx={{ borderRadius: "20px", overflow: "hidden" }}>
                <Image
                  src={member.image}
                  height={260}
                  width={342}
                  alt={member.name}
                />
              </Box>
              <Stack direction={"column"} spacing={"1px"} alignItems={"center"}>
                <Typography variant="body1" color={"textSecondary"}>
                  {member.name}
                </Typography>
                <Typography variant="body2">{member.title}</Typography>
              </Stack>
              <Typography
                variant="body2"
                textAlign={"center"}
                color={"textSecondary"}
              >
                &quot;{member.quote}&quot;
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
