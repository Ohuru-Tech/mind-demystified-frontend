"use client";

import {
  Grid,
  Container,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Box,
  Link,
  Button,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getSessionSubscriptionDetail } from "../actions/session";
import Image from "next/image";
import { SessionSubscriptionDetail } from "@/models/session";
import { SessionTracking } from "@/widgets/sessions/SessionTracking";
import { SessionSummary } from "@/widgets/sessions/SessionSummary";
import { FreeCallSummary } from "@/widgets/sessions/FreeCallSummary";
import { FreeCallButton } from "@/widgets/common/FreeCallButton";
import { Profile } from "@/models/profile";
import { getProfile } from "../actions/profile";
import { getFreeCallDetails } from "../actions/session";
import { FreeCallBookingDetails } from "@/models/session";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { useRouter } from "next/navigation";
import { TherapyPlansSessionClient } from "@/widgets/therapy/TherapyPlansSessionClient";

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(isBetween);

export default function SessionsPage() {
  const queryParams = useSearchParams();
  const paymentDone = queryParams.get("paymentDone");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [sessionSubscriptionDetail, setSessionSubscriptionDetail] =
    useState<SessionSubscriptionDetail | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [freeCallDetails, setFreeCallDetails] =
    useState<FreeCallBookingDetails | null>(null);
  const [isSessionHappening, setIsSessionHappening] = useState(false);
  const [isFreeCallHappening, setIsFreeCallHappening] = useState(false);
  const [loadSessionOptions, setLoadSessionOptions] = useState<boolean>(false);

  const router = useRouter();
  const fetchProfile = async () => {
    const result = await getProfile();
    if (result && result.success && result.data) {
      setProfile(result.data);
    }
  };

  useEffect(() => {
    if (paymentDone) {
      setShowSnackbar(true);
    }
  }, [paymentDone]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleJoinSession = () => {
    const zoomLink = sessionSubscriptionDetail?.scheduled_session.zoom_link;
    if (zoomLink) {
      window.open(zoomLink, "_blank");
    } else {
      // Show an alert or handle the case where zoom link is not available
      alert(
        "Zoom link is not available for this session. Please contact support."
      );
    }
  };

  const fetchSessionSubscriptionDetail = async () => {
    try {
      const sessionSubscriptionDetail = await getSessionSubscriptionDetail();
      if (!sessionSubscriptionDetail) {
        // No user logged in or no subscription found
        setSessionSubscriptionDetail(null);
        return;
      }
      setSessionSubscriptionDetail(sessionSubscriptionDetail);
      const sessionDateTime = dayjs.tz(
        `${sessionSubscriptionDetail?.scheduled_session.session_date} ${sessionSubscriptionDetail?.scheduled_session.session_time}`,
        "YYYY-MM-DD HH:mm:ss",
        sessionSubscriptionDetail?.scheduled_session.selected_timezone
      );
      const now = dayjs().tz(
        sessionSubscriptionDetail?.scheduled_session.selected_timezone
      );

      // Check if session is happening (within 1 hour of session time)
      const oneHourAfter = sessionDateTime.add(1, "hour");

      const isSessionHappening = now.isBetween(
        sessionDateTime,
        oneHourAfter,
        null,
        "[]"
      );
      setIsSessionHappening(isSessionHappening);

      if (
        sessionSubscriptionDetail?.completed_sessions ===
        sessionSubscriptionDetail?.package.num_sessions
      ) {
        setLoadSessionOptions(true);
      }
    } catch (error) {
      // Don't automatically show therapy plans if user has no subscription
      // They might have a free call instead
      setSessionSubscriptionDetail(null);
    }
  };

  const handleBookNextSession = () => {
    router.push(`/sessions/${sessionSubscriptionDetail?.package.id}`);
  };

  const fetchFreeCallDetails = async () => {
    try {
      const details = await getFreeCallDetails();

      // If no free call details returned, set to null
      if (!details) {
        setFreeCallDetails(null);
        return;
      }

      // Check if free call time has passed (more than 1 hour after call time)
      if (details) {
        const callDateTime = dayjs.tz(
          `${details.session_date} ${details.session_time}`,
          "YYYY-MM-DD HH:mm:ss",
          details.selected_timezone
        );
        const now = dayjs().tz(details.selected_timezone);
        const oneHourAfter = callDateTime.add(1, "hour");

        // If more than 1 hour has passed since the call time, don't show it
        if (now.isAfter(oneHourAfter)) {
          setFreeCallDetails(null);
          return;
        }

        // Check if free call is happening (within 1 hour of call time)
        const isHappening = now.isBetween(
          callDateTime,
          oneHourAfter,
          null,
          "[]"
        );
        setIsFreeCallHappening(isHappening);
      }

      setFreeCallDetails(details);
    } catch (error) {
      // Free call doesn't exist or error occurred
      setFreeCallDetails(null);
    }
  };

  const handleJoinFreeCall = () => {
    if (freeCallDetails?.zoom_link) {
      window.open(freeCallDetails.zoom_link, "_blank");
    } else {
      alert(
        "Zoom link is not available for this call. Please contact support."
      );
    }
  };

  const handleRescheduleFreeCall = () => {
    router.push("/free-call/reschedule");
  };

  useEffect(() => {
    fetchProfile();
    fetchSessionSubscriptionDetail();
    fetchFreeCallDetails();
  }, []);

  if (loadSessionOptions || (!freeCallDetails && !sessionSubscriptionDetail)) {
    return (
      <Container maxWidth={"lg"} sx={{ paddingTop: "120px" }}>
        <TherapyPlansSessionClient />
      </Container>
    );
  }

  return (
    <Container maxWidth={"lg"} sx={{ paddingTop: "120px" }}>
      <Stack direction={"column"} spacing={2} alignItems={"center"}>
        <Typography variant="h2" textAlign={"center"}>
          Vedic Mind & Heart Therapy
        </Typography>
      </Stack>

      {/* Free Call Section */}
      {freeCallDetails ? (
        <Box sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}>
          <Stack direction={"column"} spacing={"20px"} alignItems={"center"}>
            {profile && (
              <FreeCallSummary
                profile={profile}
                freeCallBookingDetails={freeCallDetails}
                opacity={freeCallDetails.completed ? 0.6 : 1}
              />
            )}
            <Stack direction={"row"} spacing={"20px"}>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  (!freeCallDetails.completed && !isFreeCallHappening) ||
                  (!freeCallDetails.completed && !freeCallDetails.zoom_link)
                }
                onClick={handleJoinFreeCall}
              >
                {freeCallDetails.completed ? "Book Session" : "Join Call"}
              </Button>
              {!freeCallDetails.completed && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleRescheduleFreeCall}
                >
                  Reschedule
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      ) : (
        !sessionSubscriptionDetail && (
          <Box sx={{ mt: 4, mb: 4 }}>
            <Stack direction={"column"} spacing={2} alignItems={"center"}>
              <FreeCallButton
                variant="contained"
                size="large"
                text="Book Free Call"
                sx={{ mt: 2 }}
                simple={false}
                showPackages={true}
              />
            </Stack>
          </Box>
        )
      )}

      {/* Session Section */}
      {sessionSubscriptionDetail ? (
        <Grid container spacing={8} mt={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              direction={"column"}
              spacing={"20px"}
              alignItems={"flex-end"}
            >
              <Box
                sx={{
                  height: "300px",
                  maxWidth: "460px",
                  borderRadius: "12px",
                  border: "1px solid #E0E0E0",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={sessionSubscriptionDetail?.package.image || ""}
                  alt="Session 1"
                  width={460}
                  height={300}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                textAlign={"left"}
                width={"100%"}
                sx={{ maxWidth: "460px" }}
              >
                {sessionSubscriptionDetail?.package.title}
              </Typography>
              <Box sx={{ maxWidth: "460px", width: "100%" }}>
                <SessionTracking
                  total={sessionSubscriptionDetail?.package.num_sessions || 0}
                  completed={sessionSubscriptionDetail?.completed_sessions || 0}
                  width={"100%"}
                />
              </Box>
              <Stack
                direction={"row"}
                width={"100%"}
                sx={{
                  maxWidth: "460px",
                }}
                justifyContent={"space-between"}
              >
                <Typography variant={"body2"} textAlign={"left"}>
                  {sessionSubscriptionDetail?.completed_sessions} /{" "}
                  {sessionSubscriptionDetail?.package.num_sessions} sessions
                </Typography>
                <Typography variant={"body2"} textAlign={"right"}>
                  {sessionSubscriptionDetail?.package.num_sessions
                    ? ((sessionSubscriptionDetail?.completed_sessions || 0) /
                        sessionSubscriptionDetail?.package.num_sessions) *
                      100
                    : 0}
                  % completed
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack
              direction={"column"}
              spacing={"20px"}
              alignItems={"flex-start"}
            >
              <Typography variant="h5" textAlign={"left"}>
                {sessionSubscriptionDetail?.scheduled_session.completed
                  ? "Previous Session"
                  : "Upcoming Session"}
              </Typography>
              {profile && sessionSubscriptionDetail?.scheduled_session && (
                <SessionSummary
                  profile={profile}
                  sessionBookingDetails={
                    sessionSubscriptionDetail?.scheduled_session
                  }
                  opacity={
                    sessionSubscriptionDetail?.scheduled_session.completed
                      ? 0.6
                      : 1
                  }
                />
              )}
              {sessionSubscriptionDetail?.scheduled_session.completed && (
                <Typography variant="body2" textAlign={"left"}>
                  Missed this session ?{" "}
                  <Link
                    href={`/sessions/${sessionSubscriptionDetail?.package.id}/reschedule`}
                  >
                    Reschedule
                  </Link>
                </Typography>
              )}
              <Stack direction={"row"} spacing={"20px"}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    (!sessionSubscriptionDetail?.scheduled_session.completed &&
                      !isSessionHappening) ||
                    (!sessionSubscriptionDetail?.scheduled_session.completed &&
                      !sessionSubscriptionDetail?.scheduled_session.zoom_link)
                  }
                  onClick={
                    sessionSubscriptionDetail?.scheduled_session.completed
                      ? handleBookNextSession
                      : handleJoinSession
                  }
                >
                  {sessionSubscriptionDetail?.scheduled_session.completed
                    ? "Book next"
                    : "Join session"}
                </Button>
                {!sessionSubscriptionDetail?.scheduled_session.completed && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      router.push(
                        `/sessions/${sessionSubscriptionDetail?.scheduled_session.id}/reschedule`
                      );
                    }}
                  >
                    Reschedule
                  </Button>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      ) : null}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Payment Successful
        </Alert>
      </Snackbar>
    </Container>
  );
}
