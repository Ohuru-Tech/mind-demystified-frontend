"use client";

import {
  Box,
  CircularProgress,
  Grid,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { SessionDetails } from "@/widgets/sessions/SessionDetails";
import { DateCalendar } from "@/widgets/sessions/DateCalendar";
import { TimePicker } from "@/widgets/sessions/TimePicker";
import {
  createSubscribedPackage,
  getAvailability,
  getSubscribedPackages,
  getSessionSubscriptionDetail,
  rescheduleSession,
} from "@/app/actions/session";
import { useParams, useRouter } from "next/navigation";
import { SessionSubscriptionDetail } from "@/models/session";

// Extend dayjs with timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

type ViewMode = "date" | "time";

export default function ReschedulePage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverTimezone, setServerTimezone] = useState<string>("UTC");
  const [sessionSubscriptionDetail, setSessionSubscriptionDetail] =
    useState<SessionSubscriptionDetail | null>(null);
  const [initialAvailability, setInitialAvailability] = useState<any>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("date");
  const router = useRouter();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const fetchSessionSubscriptionDetail = async () => {
    try {
      const sessionSubscriptionDetail = await getSessionSubscriptionDetail();
      if (!sessionSubscriptionDetail) {
        // No user logged in or no subscription found
        setSessionSubscriptionDetail(null);
        return;
      }
      setSessionSubscriptionDetail(sessionSubscriptionDetail);
    } catch (error) {
      // Handle error silently
      setSessionSubscriptionDetail(null);
    }
  };

  const handleReschedule = async () => {
    setLoading(true);

    try {
      await rescheduleSession(
        id as string,
        selectedDate?.format("YYYY-MM-DD") || "",
        selectedTime?.format("HH:mm:ss") || "",
        selectedTimezone
      );
    } catch (error) {
      // Handle error silently
    }

    router.push("/sessions");
    setLoading(false);
  };

  const fetchSubscribedPackages = async () => {
    try {
      const subscribedPackage = await getSubscribedPackages();
      if (!subscribedPackage) {
        // No user logged in or no subscription found, create a new one
        await createSubscribedPackage(id as string);
        return;
      }
      if (subscribedPackage.package.id.toString() !== (id as string)) {
        await createSubscribedPackage(id as string);
      }
    } catch (error) {
      // If createSubscribedPackage fails (e.g., user not authenticated), handle silently
      console.log("Error creating subscribed package:", error);
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

  useEffect(() => {
    setSelectedDate(selectedDate?.tz(selectedTimezone) || null);
    setSelectedTime(selectedTime?.tz(selectedTimezone) || null);
  }, [selectedTimezone]);

  const fetchData = async () => {
    await fetchSessionSubscriptionDetail();
    await fetchSubscribedPackages();
    await fetchAvailability();
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  if (loading) {
    return <CircularProgress size={40} />;
  }

  // Mobile layout
  if (isMobile) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
        <Toolbar />
        <Box sx={{ p: 2 }}>
          {/* Session Details Card */}
          {sessionSubscriptionDetail && (
            <Box sx={{ mb: 3, mt: 2 }}>
              <SessionDetails
                sessionDetails={sessionSubscriptionDetail.package}
                isMobile={true}
              />
            </Box>
          )}

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
            borderRight: "1px solid #E0E0E0",
            pt: "100px",
            height: "100%",
          }}
        >
          {sessionSubscriptionDetail && (
            <SessionDetails
              sessionDetails={sessionSubscriptionDetail.package}
            />
          )}
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
