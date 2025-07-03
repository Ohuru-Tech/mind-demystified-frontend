"use client";

import { Box, Stack, Typography } from "@mui/material";
import { SessionSummary } from "@/widgets/sessions/SessionSummary";
import Image from "next/image";
import { SessionBookingDetails, SessionPackage } from "@/models/session";
import React, { useEffect, useState } from "react";
import {
  getSessionBookingDetails,
  getSessionDetails,
} from "@/app/actions/session";
import { Profile } from "@/models/profile";
import { getProfile } from "@/app/actions/profile";

type BookingSummaryProps = {
  sessionId: string;
};

export const BookingSummary = ({ sessionId }: BookingSummaryProps) => {
  const [sessionDetails, setSessionDetails] = useState<SessionPackage>();
  const [profile, setProfile] = useState<Profile>();
  const [sessionBookingDetails, setSessionBookingDetails] =
    useState<SessionBookingDetails>();

  const fetchSessionDetails = async () => {
    const sessionDetails = await getSessionDetails(sessionId);
    setSessionDetails(sessionDetails);
  };

  const fetchProfile = async () => {
    const result = await getProfile();
    if (result && result.success && result.data) setProfile(result.data);
  };

  const fetchSessionBookingDetails = async () => {
    const sessionBookingDetails = await getSessionBookingDetails();
    setSessionBookingDetails(sessionBookingDetails);
  };

  useEffect(() => {
    if (!sessionId) return;
    fetchSessionDetails();
    fetchProfile();
    fetchSessionBookingDetails();
  }, [sessionId]);

  // Listen for authentication state changes
  useEffect(() => {
    const handleAuthChange = async () => {
      const result = await getProfile();
      if (result && result.success && result.data) setProfile(result.data);
    };

    window.addEventListener("auth-state-changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, []);

  if (!sessionDetails || !profile || !sessionBookingDetails) return null;

  return (
    <Stack
      direction={"column"}
      spacing={"20px"}
      justifyContent={"center"}
      height={"100%"}
      width={"100%"}
      alignItems={"center"}
    >
      <Typography variant={"h4"} color={"primary.main"}>
        Vedic Mind & Heart Therapy
      </Typography>
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "12px",
          width: "461px",
          border: "1px solid #E0E0E0",
        }}
      >
        <Image
          height={300}
          width={461}
          src={sessionDetails?.image}
          alt={"Evolve Session"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
      <Stack
        direction={"column"}
        spacing={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant={"h5"} color={"primary.main"}>
          {sessionDetails?.title}
        </Typography>
        {sessionDetails?.num_sessions > 1 && (
          <Typography variant={"body1"} color={"primary.main"}>
            <Stack direction={"row"} spacing={"0px"} alignItems={"center"}>
              {Array.from({ length: sessionDetails?.num_sessions }).map(
                (_, index) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor:
                          index === 0 ? "primary.main" : "#E0E0E0",
                        color: "primary.contrastText",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant={"body2"}
                        color={"primary.contrastText"}
                        fontFamily={"monospace"}
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                    {index !== sessionDetails?.num_sessions - 1 && (
                      <Box
                        sx={{
                          width: "20px",
                          height: "5px",
                          backgroundColor: "#E0E0E0",
                        }}
                      />
                    )}
                  </React.Fragment>
                )
              )}
            </Stack>
          </Typography>
        )}
      </Stack>
      <SessionSummary
        profile={profile}
        sessionBookingDetails={sessionBookingDetails}
      />
    </Stack>
  );
};
