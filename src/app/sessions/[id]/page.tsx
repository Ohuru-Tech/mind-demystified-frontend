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
import { SessionPackage, SessionSubscription } from "@/models/session";
import {
  createSubscribedPackage,
  getAvailability,
  getSessionDetails,
  getSubscribedPackages,
  bookSession,
  getSessionSubscriptionDetail,
} from "@/app/actions/session";
import { useParams, useRouter } from "next/navigation";

// Extend dayjs with timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

type ViewMode = "date" | "time";

export default function SessionDetailPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverTimezone, setServerTimezone] = useState<string>("UTC");
  const [sessionDetails, setSessionDetails] = useState<SessionPackage>();
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

  const fetchSessionDetails = async () => {
    const sessionDetails = await getSessionDetails(id as string);
    setSessionDetails(sessionDetails);
  };

  const handleBook = async () => {
    setLoading(true);

    try {
      const response = await bookSession(
        id as string,
        selectedDate?.format("YYYY-MM-DD") || "",
        selectedTime?.format("HH:mm:ss") || "",
        selectedTimezone
      );

      if (response.needs_payment) {
        router.push(`/checkout/session/${id}`);
        return;
      }
    } catch (error) {
      // Handle error silently
    }

    router.push("/sessions");
    setLoading(false);
  };

  const fetchSubscribedPackages = async () => {
    try {
      const subscribedPackage = await getSubscribedPackages();
      if (subscribedPackage.paid && !subscribedPackage.completed) {
        router.push("/sessions");
        return;
      }
      if (
        subscribedPackage.package.id.toString() !== (id as string) ||
        subscribedPackage.completed
      ) {
        await createSubscribedPackage(id as string);
      }
    } catch (error) {
      await createSubscribedPackage(id as string);
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
    await fetchSessionDetails();
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
          {sessionDetails && (
            <Box sx={{ mb: 3, mt: 2 }}>
              <SessionDetails sessionDetails={sessionDetails} isMobile={true} />
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
                serverTimezone={serverTimezone}
                initialAvailability={initialAvailability}
                isMobile={true}
              />
            ) : (
              <TimePicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
                onBook={handleBook}
                loading={loading}
                selectedTimezone={selectedTimezone}
                serverTimezone={serverTimezone}
                onBack={handleBackToDate}
                isMobile={true}
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
          {sessionDetails && <SessionDetails sessionDetails={sessionDetails} />}
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
            serverTimezone={serverTimezone}
            initialAvailability={initialAvailability}
          />
        </Grid>
        <Grid size={{ lg: 3 }}>
          <TimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            onBook={handleBook}
            loading={loading}
            selectedTimezone={selectedTimezone}
            serverTimezone={serverTimezone}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
