export interface TimezoneOption {
  value: string;
  label: string;
  short: string;
}

export const majorTimezones: TimezoneOption[] = [
  { value: "UTC", label: "UTC", short: "UTC" },
  {
    value: "America/New_York",
    label: "Eastern Time (US & Canada)",
    short: "EST",
  },
  {
    value: "America/Chicago",
    label: "Central Time (US & Canada)",
    short: "CST",
  },
  {
    value: "America/Denver",
    label: "Mountain Time (US & Canada)",
    short: "MST",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (US & Canada)",
    short: "PST",
  },
  { value: "Europe/London", label: "London", short: "GMT" },
  { value: "Europe/Paris", label: "Paris", short: "CET" },
  { value: "Europe/Berlin", label: "Berlin", short: "CET" },
  { value: "Asia/Kolkata", label: "India Standard Time (IST)", short: "IST" },
  { value: "Asia/Tokyo", label: "Tokyo", short: "JST" },
  { value: "Asia/Singapore", label: "Singapore", short: "SGT" },
  { value: "Australia/Sydney", label: "Sydney", short: "AEST" },
];
