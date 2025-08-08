"use client";

import {
  Box,
  CircularProgress,
  Grid,
  Toolbar,
  Alert,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateCalendar } from "@/widgets/sessions/DateCalendar";
import { TimePicker } from "@/widgets/sessions/TimePicker";
import {
  getAvailability,
  getFreeCallDetails,
  rescheduleFreeCall,
  getSessionSubscriptionDetail,
} from "@/app/actions/session";
import { useRouter } from "next/navigation";
import { FreeCallBookingDetails } from "@/models/session";

// Extend dayjs with timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

type ViewMode = "date" | "time";

export default function FreeCallReschedulePage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverTimezone, setServerTimezone] = useState<string>("UTC");
  const [freeCallDetails, setFreeCallDetails] =
    useState<FreeCallBookingDetails | null>(null);
  const [initialAvailability, setInitialAvailability] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("date");
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Check if user has subscription and redirect if they do
  const checkSubscription = async () => {
    try {
      const sessionSubscriptionDetail = await getSessionSubscriptionDetail();
      if (sessionSubscriptionDetail) {
        router.push("/sessions");
        return;
      }
      // No subscription found, continue with free call rescheduling
      console.log(
        "No subscription found, proceeding with free call rescheduling"
      );
    } catch (error) {
      // User doesn't have subscription, continue with free call rescheduling
      console.log(
        "No subscription found, proceeding with free call rescheduling"
      );
    }
  };

  // Custom handler to reset selectedTime when date changes
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
    if (isMobile) {
      setViewMode("time"); // Switch to time picker on mobile when date is selected
    }
  };

  const handleBackToDate = () => {
    setViewMode("date");
  };

  const fetchFreeCallDetails = async () => {
    try {
      setError(null);
      const details = await getFreeCallDetails();
      setFreeCallDetails(details);
      setSelectedTimezone(details?.selected_timezone || "UTC");

      // Set initial date and time from existing free call
      if (details) {
        setSelectedDate(
          dayjs.tz(
            `${details.session_date} ${details.session_time}`,
            "YYYY-MM-DD HH:mm:ss",
            details.selected_timezone
          )
        );
        setSelectedTime(
          dayjs.tz(
            `${details.session_date} ${details.session_time}`,
            "YYYY-MM-DD HH:mm:ss",
            details.selected_timezone
          )
        );
      }
    } catch (error) {
      console.error("Error fetching free call details:", error);
      // Redirect to login if user is not authenticated
      if (
        error instanceof Error &&
        error.message === "User not authenticated"
      ) {
        router.push("/login");
        return;
      }
      setError("Failed to fetch free call details. Please try again.");
      router.push("/sessions");
    }
  };

  const fetchAvailability = async () => {
    const availability = await getAvailability();
    setInitialAvailability(availability); // Store initial availability data

    // Set the server timezone as default
    if (availability.server_timezone) {
      setSelectedTimezone(availability.server_timezone);
      setServerTimezone(availability.server_timezone);
      setSelectedDate(
        dayjs.tz(
          availability.next_availability,
          "YYYY-MM-DD HH:mm:ss",
          availability.server_timezone
        )
      );
      setSelectedTime(
        dayjs.tz(
          availability.next_availability,
          "YYYY-MM-DD HH:mm:ss",
          availability.server_timezone
        )
      );
    }
    setLoading(false);
  };

  const handleReschedule = async () => {
    setLoading(true);
    setError(null);

    try {
      await rescheduleFreeCall(
        selectedDate?.format("YYYY-MM-DD") || "",
        selectedTime?.format("HH:mm:ss") || "",
        selectedTimezone
      );
      router.push("/sessions");
    } catch (error) {
      console.error("Error rescheduling free call:", error);
      // Redirect to login if user is not authenticated
      if (
        error instanceof Error &&
        error.message === "User not authenticated"
      ) {
        router.push("/login");
        return;
      }

      // Handle validation errors from the serializer
      if (error instanceof Error) {
        const errorMessage = error.message;
        if (errorMessage.includes("time slot is already booked")) {
          setError(
            "This time slot is already booked. Please select a different time."
          );
        } else if (
          errorMessage.includes("already booked for a therapy session")
        ) {
          setError(
            "This time slot is already booked for a therapy session. Please select a different time."
          );
        } else {
          setError("Failed to reschedule free call. Please try again.");
        }
      } else {
        setError("Failed to reschedule free call. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);
        await checkSubscription();
        await fetchFreeCallDetails();
        await fetchAvailability();
      } catch (error) {
        console.error("Error initializing page:", error);
      } finally {
        setLoading(false);
      }
    };
    initializePage();
  }, []);

  useEffect(() => {
    setSelectedDate(selectedDate?.tz(selectedTimezone) || null);
    setSelectedTime(selectedTime?.tz(selectedTimezone) || null);
  }, [selectedTimezone]);

  if (!freeCallDetails) {
    return (
      <Box sx={{ height: "calc(100vh - 69px)" }}>
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // Mobile layout
  if (isMobile) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
        <Toolbar />
        <Box sx={{ p: 2 }}>
          {/* Free Call Reschedule Details Card */}
          <Box sx={{ mb: 3, mt: 2 }}>
            <Card
              elevation={0}
              sx={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                backgroundColor: "white",
              }}
            >
              <Stack direction={"column"} spacing={"16px"}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "20px", fontWeight: 600 }}
                >
                  Reschedule Free Call
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reschedule your free 15-minute consultation call to a time
                  that works better for you.
                </Typography>
                {error && (
                  <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}
                {freeCallDetails && (
                  <Stack direction={"column"} spacing={"8px"}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Current Appointment:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs
                        .tz(
                          `${freeCallDetails.session_date} ${freeCallDetails.session_time}`,
                          "YYYY-MM-DD HH:mm:ss",
                          freeCallDetails.selected_timezone
                        )
                        .format("dddd, MMMM D, YYYY [at] hh:mm A")}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Box>

          {/* Date or Time Picker */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              p: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {viewMode === "date" ? (
              <DateCalendar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                selectedTimezone={selectedTimezone}
                onTimezoneChange={setSelectedTimezone}
                loading={loading}
                initialAvailability={initialAvailability}
                isMobile={true}
              />
            ) : (
              <TimePicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
                onBook={handleReschedule}
                loading={loading}
                selectedTimezone={selectedTimezone}
                serverTimezone={serverTimezone}
                onBack={handleBackToDate}
                isMobile={true}
                reschedule={true}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  // Desktop layout (unchanged)
  return (
    <Box sx={{ height: "calc(100vh - 69px)" }}>
      <Toolbar />
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid
          size={{ lg: 3 }}
          sx={{
            pl: 4,
            pr: 4,
            borderRight: "1px solid #E0E0E0",
            pt: "100px",
            height: "100%",
          }}
        >
          <Stack
            direction={"column"}
            spacing={"62px"}
            justifyContent={"center"}
          >
            <Stack direction={"column"} spacing={"32px"}>
              <Typography variant="h5">Reschedule Free Call</Typography>
              <Typography variant="body2">
                Reschedule your free 15-minute consultation call to a time that
                works better for you.
              </Typography>
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
            </Stack>

            {freeCallDetails && (
              <Stack direction={"column"} spacing={"16px"}>
                <Typography variant="h6">Current Appointment:</Typography>
                <Typography variant="body2">
                  {dayjs
                    .tz(
                      `${freeCallDetails.session_date} ${freeCallDetails.session_time}`,
                      "YYYY-MM-DD HH:mm:ss",
                      freeCallDetails.selected_timezone
                    )
                    .format("dddd, MMMM D, YYYY [at] hh:mm A")}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid
          size={{ lg: 6 }}
          sx={{
            paddingTop: "100px",
            pl: 4,
            borderRight: "1px solid #E0E0E0",
            pr: 4,
          }}
        >
          <DateCalendar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            selectedTimezone={selectedTimezone}
            onTimezoneChange={setSelectedTimezone}
            loading={loading}
            initialAvailability={initialAvailability}
          />
        </Grid>
        <Grid size={{ lg: 3 }}>
          <TimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            onBook={handleReschedule}
            loading={loading}
            selectedTimezone={selectedTimezone}
            serverTimezone={serverTimezone}
            reschedule={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
