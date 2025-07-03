export type SessionPackage = {
  id: string;
  title: string;
  expectations: string;
  price: number;
  num_sessions: number;
  image: string;
};

export type SessionSubscription = {
  id: string;
  package: SessionPackage;
  completed: boolean;
  paid: boolean;
};

export type Availability = {
  day: string;
  time: string;
};

export type DateAvailability = {
  time: string;
  available: boolean;
  day_name: string;
};

export type DateAvailabilityResponse = {
  availabilities: DateAvailability[];
};

export type AvailabilityResponse = {
  availabilities: Availability[];
  next_availability: string;
  server_timezone: string;
};

export type SessionBookingDetails = {
  id: string;
  session_date: string;
  session_time: string;
  selected_timezone: string;
  server_timezone: string;
  completed: boolean;
  zoom_link?: string;
};

export type SessionPackageCheckout = SessionPackage & {
  per_session_price: number;
};

export type SessionSubscriptionDetail = SessionSubscription & {
  scheduled_session: SessionBookingDetails;
  completed_sessions: number;
};

// Free Call Types
export type FreeCallAvailability = {
  day: string;
  time: string;
};

export type FreeCallDateAvailability = {
  time: string;
  available: boolean;
  day_name: string;
};

export type FreeCallDateAvailabilityResponse = {
  availabilities: FreeCallDateAvailability[];
};

export type FreeCallAvailabilityResponse = {
  availabilities: FreeCallAvailability[];
  next_availability: string;
  server_timezone: string;
};

export type FreeCallBookingDetails = {
  id: string;
  session_date: string;
  session_time: string;
  selected_timezone: string;
  server_timezone: string;
  completed: boolean;
  zoom_link?: string;
};
