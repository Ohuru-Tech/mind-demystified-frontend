"use client";

import {
  Stack,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateAvailability } from "@/models/session";
import { useState, useEffect } from "react";
import customTimeFormat from "dayjs/plugin/customParseFormat";
import { getDateAvailability } from "@/app/actions/session";
import { Icon } from "@iconify/react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customTimeFormat);

interface TimePickerProps {
  selectedDate: Dayjs | null;
  onTimeSelect: (time: dayjs.Dayjs) => void;
  selectedTime: dayjs.Dayjs | null;
  onBook: () => void;
  loading: boolean;
  selectedTimezone: string;
  serverTimezone: string;
  reschedule?: boolean;
  onBack?: () => void;
  isMobile?: boolean;
}

export const TimePicker = ({
  selectedDate,
  onTimeSelect,
  selectedTime,
  onBook,
  loading,
  selectedTimezone,
  serverTimezone,
  reschedule = false,
  onBack,
  isMobile = false,
}: TimePickerProps) => {
  const [availableTimes, setAvailableTimes] = useState<dayjs.Dayjs[] | null>(
    null
  );
  const [timeLoading, setTimeLoading] = useState(false);

  const getAvailableTimes = async () => {
    if (!selectedDate) return;

    setTimeLoading(true);
    try {
      const dateAvailability = await getDateAvailability(
        selectedDate.format("YYYY-MM-DD"),
        serverTimezone
      );

      const availableTimes = dateAvailability.availabilities
        .filter((availability: DateAvailability) => availability.available)
        .map((availability: DateAvailability) => {
          return dayjs
            .tz(
              `${selectedDate.format("YYYY-MM-DD")} ${availability.time}`,
              "YYYY-MM-DD HH:mm:ss",
              serverTimezone
            )
            .tz(selectedTimezone);
        });

      setAvailableTimes(availableTimes);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([]);
    } finally {
      setTimeLoading(false);
    }
  };

  useEffect(() => {
    getAvailableTimes();
  }, [selectedDate, selectedTimezone, serverTimezone]);

  return (
    <Stack
      direction={"column"}
      spacing={isMobile ? "32px" : "52px"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ paddingTop: isMobile ? "0px" : "80px" }}
    >
      {/* Back button for mobile */}
      {isMobile && onBack && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{ width: "100%", mb: 2 }}
        >
          <IconButton onClick={onBack} sx={{ mr: 1 }}>
            <Icon icon="mdi:arrow-left" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Back to date selection
          </Typography>
        </Stack>
      )}

      <Stack direction={"column"} spacing={"16px"} alignItems={"center"}>
        <Typography
          variant="drawerHeading"
          sx={{ fontSize: isMobile ? "20px" : undefined }}
        >
          {selectedDate?.tz(selectedTimezone).format("dddd, MMMM D")}
        </Typography>
        {selectedTime && (
          <Typography variant="body1" color="primary.main">
            {selectedTime.format("hh:mm a")}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {selectedTimezone}
        </Typography>
      </Stack>

      {timeLoading ? (
        <CircularProgress size={24} />
      ) : availableTimes && availableTimes.length > 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            width: "100%",
            maxWidth: isMobile ? "100%" : "300px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {availableTimes.map((time: dayjs.Dayjs) => {
            return (
              <Button
                key={time.format("hh:mm a")}
                variant="outlined"
                color="primary"
                disabled={dayjs(time).isBefore(dayjs())}
                onClick={() => {
                  onTimeSelect(dayjs.tz(time, "hh:mm a", selectedTimezone));
                }}
                sx={{
                  minWidth: isMobile ? "80px" : "120px",
                  fontSize: isMobile ? "14px" : undefined,
                  backgroundColor:
                    selectedTime?.format("hh:mm a") === time.format("hh:mm a")
                      ? "#FBEBE3"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedTime?.format("hh:mm a") === time.format("hh:mm a")
                        ? "#FBEBE3"
                        : "rgba(50, 50, 50, 0.04)",
                  },
                }}
              >
                {time.format("hh:mm a")}
              </Button>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No available times for this date
        </Typography>
      )}

      <Button
        variant={"contained"}
        disabled={!selectedTime || !selectedDate || timeLoading}
        sx={{ width: isMobile ? "100%" : "60%" }}
        onClick={onBook}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : reschedule ? (
          "Reschedule"
        ) : (
          "Book"
        )}
      </Button>
    </Stack>
  );
};
