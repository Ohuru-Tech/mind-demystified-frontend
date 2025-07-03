"use client";

import {
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar as MuiDateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Image from "next/image";
import { gilroyMedium, gilroyRegular } from "@/theme";
import { majorTimezones } from "@/utils/timezones";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface DateCalendarProps {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  selectedTimezone: string;
  loading: boolean;
  onTimezoneChange: (timezone: string) => void;
  initialAvailability?: any; // Add prop for initial availability data
  isMobile?: boolean;
}

export const DateCalendar = ({
  selectedDate,
  onDateChange,
  selectedTimezone,
  loading,
  onTimezoneChange,
  initialAvailability,
  isMobile = false,
}: DateCalendarProps) => {
  const shouldDisableDate = (date: Dayjs) => {
    if (loading) return true; // Disable all dates while loading

    // Convert date to selected timezone for comparison
    const dateInSelectedTZ = date.tz(selectedTimezone);
    const todayInSelectedTZ = dayjs().tz(selectedTimezone).startOf("day");

    // Disable past dates
    if (dateInSelectedTZ.isBefore(todayInSelectedTZ)) {
      return true;
    }

    // Use initial availability data if available
    if (initialAvailability && initialAvailability.availabilities) {
      const dayName = dateInSelectedTZ.format("dddd"); // Get day name like "Wednesday"
      const hasAvailability = initialAvailability.availabilities.some(
        (availability: any) => {
          // Compare day names (availability.day contains day names like "Wednesday")
          return availability.day === dayName;
        }
      );
      return !hasAvailability;
    }

    return false; // Default to available if no availability data
  };

  const handleTimezoneChange = (newTimezone: string) => {
    onTimezoneChange(newTimezone);
  };

  return (
    <Stack
      direction={"column"}
      spacing={isMobile ? "32px" : "52px"}
      justifyContent={"center"}
      alignItems={"flex-start"}
    >
      <Typography
        variant="drawerHeading"
        sx={{ fontSize: isMobile ? "20px" : undefined }}
      >
        Select a date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDateCalendar
          value={selectedDate}
          onChange={onDateChange}
          shouldDisableDate={shouldDisableDate}
          dayOfWeekFormatter={(weekday) =>
            `${weekday.format("ddd").toUpperCase()}`
          }
          sx={{
            width: "100%",
            borderRadius: "12px",
            backgroundColor: "white",
            filter: isMobile
              ? "none"
              : "drop-shadow(0px 9px 52px rgba(0, 0, 0, 0.1))",
            ".MuiDayCalendar-header": { justifyContent: "space-around" },
            ".MuiDayCalendar-weekContainer": {
              justifyContent: "space-around",
            },
            ".MuiPickersDay-root": {
              color: "primary.main",
              fontFamily: `${gilroyRegular.style.fontFamily}`,
              fontSize: isMobile ? "14px" : "16px",
              "&.Mui-selected": {
                color: "primary.contrastText",
                backgroundColor: "primary.main",
              },
            },
          }}
        />
      </LocalizationProvider>
      <Stack direction={"column"} spacing={"16px"} sx={{ width: "100%" }}>
        <Typography
          variant="drawerHeading"
          sx={{ fontSize: isMobile ? "18px" : undefined }}
        >
          Timezone
        </Typography>
        <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
          <Image src={"/timezone.svg"} alt={"time"} width={25} height={25} />
          <FormControl size="small" sx={{ minWidth: isMobile ? 220 : 220 }}>
            <Select
              value={selectedTimezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              sx={{
                fontFamily: gilroyMedium.style.fontFamily,
                fontSize: isMobile ? "16px" : "20px",
                color: "primary.main",
                background: "#FAF9F6",
                borderRadius: "8px",
              }}
            >
              {majorTimezones.map((tz) => (
                <MenuItem key={tz.value} value={tz.value}>
                  {tz.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};
