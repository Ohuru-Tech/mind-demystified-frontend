"use client";

import { Avatar, Card, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Profile } from "@/models/profile";
import { FreeCallBookingDetails } from "@/models/session";
import dayjs from "dayjs";
import { majorTimezones } from "@/utils/timezones";
import timezone from "dayjs/plugin/timezone";
import customTimeFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customTimeFormat);

type FreeCallSummaryProps = {
  profile: Profile;
  freeCallBookingDetails: FreeCallBookingDetails;
  opacity?: number;
};

export const FreeCallSummary = ({
  profile,
  freeCallBookingDetails,
  opacity = 1,
}: FreeCallSummaryProps) => {
  const { session_date, session_time, selected_timezone, server_timezone } =
    freeCallBookingDetails;
  const callDateTime = dayjs
    .tz(
      `${session_date} ${session_time}`,
      "YYYY-MM-DD HH:mm:ss",
      server_timezone
    )
    .tz(selected_timezone);

  return (
    <Card
      elevation={0}
      sx={{
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        width: "450px",
        maxWidth: "90vw",
        opacity: opacity,
      }}
    >
      <Stack direction={"column"} spacing={{ xs: "10px", md: "25px" }}>
        <Stack
          direction={"row"}
          spacing={"2px"}
          justifyContent={"space-around"}
        >
          <Stack
            sx={{
              width: { xs: "50px", md: "65px" },
              borderColor: "primary.main",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "12px",
              overflow: "hidden",
            }}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack
              direction={"column"}
              alignItems={"center"}
              sx={{
                width: "100%",
                backgroundColor: "primary.main",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
              spacing={"2px"}
            >
              <Typography variant={"body2"} color={"primary.contrastText"}>
                {callDateTime.format("MMM")}
              </Typography>
            </Stack>
            <Stack
              direction={"column"}
              mt={"2px"}
              spacing={"2px"}
              alignItems={"center"}
              width={"60%"}
            >
              <Typography
                variant={"drawerHeading"}
                fontFamily={"monospace"}
                color={"primary.main"}
                fontWeight={"normal"}
              >
                {callDateTime.format("D")}
              </Typography>
              <Divider
                variant={"fullWidth"}
                flexItem
                sx={{
                  borderStyle: "dashed",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={"-3px"}
              marginTop={"2px"}
              justifyContent={"center"}
            >
              <Typography variant={"subtitle2"} color={"primary.main"}>
                {callDateTime.format("ddd")}
              </Typography>
              <Image
                src={"/fold.svg"}
                alt={"clock"}
                width={32}
                height={14}
                style={{
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                  marginRight: "-28px",
                  marginBottom: "-2px",
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            spacing={{ xs: "0px", md: "2px" }}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Typography
              variant={"body1"}
              color={"primary.main"}
              textAlign={"left"}
            >
              Free Consultation
            </Typography>
            <Typography variant={"subtitle2"} color={"primary.main"}>
              {callDateTime.format("h:mm A")}{" "}
              {majorTimezones.filter(
                (timezone) => timezone.value === selected_timezone
              )[0]?.short || selected_timezone}
            </Typography>
          </Stack>
          <Divider orientation={"vertical"} flexItem />
          <Stack
            direction={"column"}
            spacing={"10px"}
            justifyContent={"center"}
          >
            <Stack direction={"row"} spacing={"10px"}>
              <Image
                src={"/clock.svg"}
                alt={"duration"}
                width={20}
                height={20}
              />
              <Typography variant={"body2"} color={"primary.main"}>
                15 min
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"center"} spacing={"10px"}>
              <Image src={"/zoom.svg"} alt={"zoom"} width={20} height={20} />
              <Typography variant={"body2"} color={"primary.main"}>
                Zoom
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider flexItem />
        <Stack
          direction={"row"}
          spacing={{ xs: "0px", md: "12px" }}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            spacing={{ xs: "0px", md: "4px" }}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={"-16px"}>
              <Avatar src={"/founder.png"} />
              <Avatar src={profile?.profile?.image || ""}>
                {!profile?.profile.image &&
                  profile?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Stack>
            <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
              <Typography variant={"body2"}>Sanjeev Verma,</Typography>
              <Typography variant={"body2"}>{profile?.name}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
