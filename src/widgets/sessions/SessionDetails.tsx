"use client";

import { alpha, Box, Stack, Typography, Card } from "@mui/material";
import Image from "next/image";
import { SessionPackage } from "@/models/session";

export const SessionDetails = ({
  sessionDetails,
  isMobile = false,
}: {
  sessionDetails: SessionPackage;
  isMobile?: boolean;
}) => {
  if (isMobile) {
    return (
      <Card
        elevation={0}
        sx={{
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          backgroundColor: "white",
        }}
      >
        <Stack direction={"row"} spacing={"12px"} alignItems={"center"}>
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid #E0E0E0",
              flexShrink: 0,
            }}
          >
            <Image
              src={sessionDetails.image}
              alt="Session"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              width={60}
              height={60}
            />
          </Box>
          <Stack direction={"column"} spacing={"4px"} sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
              {sessionDetails.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sessionDetails.num_sessions} session • 1 hour • Zoom
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "12px" }}
            >
              by Sanjeev Verma
            </Typography>
          </Stack>
        </Stack>
      </Card>
    );
  }

  return (
    <Stack direction={"column"} spacing={"62px"} justifyContent={"center"}>
      <Stack
        direction={"row"}
        spacing={"16px"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Box
          sx={{
            width: "152px",
            height: "141px",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid #E0E0E0",
          }}
        >
          <Image
            src={sessionDetails.image}
            alt="Initiate"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            width={152}
            height={141}
          />
        </Box>
        <Stack direction={"column"} spacing={"16px"}>
          <Typography variant="h5">{sessionDetails.title}</Typography>
          <Typography variant="body1">
            {sessionDetails.num_sessions} session
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={"column"} spacing={"1px"} alignItems={"flex-start"}>
        <Typography variant="h6" color={alpha("#323232", 0.65)}>
          SESSION BY
        </Typography>
        <Typography variant="drawerHeading">Sanjeev Verma</Typography>
      </Stack>
      <Stack direction={"column"} spacing={"24px"}>
        <Stack direction={"row"} spacing={"18px"} alignItems={"center"}>
          <Image src={"/clock.png"} alt={"duration"} width={35} height={35} />
          <Typography variant="body1">1 hour</Typography>
        </Stack>
        <Stack direction={"row"} spacing={"18px"} alignItems={"center"}>
          <Image src={"/zoom.png"} alt={"zoom"} width={35} height={35} />
          <Typography variant="body1">Zoom</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
