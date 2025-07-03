"use client";

import {
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { getProfile } from "@/app/actions/profile";
import {
  getNotifications,
  markNotificationsAsRead,
} from "@/app/actions/community";
import NotificationCard from "@/widgets/community/NotificationCard";
import { LoadingState } from "@/widgets/common/LoadingState";
import { ErrorState, EmptyState } from "@/widgets/common/ErrorState";
import { useSnackbar } from "@/contexts/SnackbarContext";

interface Notification {
  id: number;
  notification_type: "like" | "comment" | "follow";
  post_slug: string | null;
  comment_slug: string | null;
  requester_info: {
    id: number;
    name: string;
    email: string;
    profile: {
      id: number;
      image: string | null;
      bio: string;
      has_community: boolean;
      social_image: string | null;
    };
    followers_count: number;
    following_count: number;
  } | null;
  message: string;
  read: boolean;
  created_at: string;
  activity_time_info: string;
  action_requested?: boolean;
}

interface NotificationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [markingAsRead, setMarkingAsRead] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 10;
  const { showError } = useSnackbar();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const fetchNotifications = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const result = await getNotifications(limit, isInitial ? 0 : offset);

      if (result.success && result.data) {
        const newNotifications = result.data.results;

        if (isInitial) {
          setNotifications(newNotifications);
        } else {
          setNotifications((prev) => [...prev, ...newNotifications]);
        }
        setHasMore(!!result.data.next);
        setOffset(isInitial ? limit : offset + limit);
      } else {
        setError(result.error || "Failed to load notifications");
        showError(result.error || "Failed to load notifications");
      }
    } catch (err) {
      const errorMessage = "Failed to load notifications";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch profile first
      const result = await getProfile();
      const profileData =
        result && result.success && result.data ? result.data : null;
      setProfile(profileData);

      // Then fetch notifications
      await fetchNotifications(true);
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNotifications(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.read);
    if (unreadNotifications.length === 0) return;

    try {
      setMarkingAsRead(true);
      const notificationIds = unreadNotifications.map((n) => n.id);
      const result = await markNotificationsAsRead(notificationIds);

      if (result.success) {
        // Update local state to mark notifications as read
        setNotifications((prev) =>
          prev.map((notification) => ({
            ...notification,
            read: true,
          }))
        );

        // Dispatch event to update unread count in drawer
        window.dispatchEvent(new CustomEvent("notification-read"));
      } else {
        console.error("Failed to mark notifications as read:", result.error);
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    } finally {
      setMarkingAsRead(false);
    }
  };

  const handleNotificationRead = async (notificationId: number) => {
    try {
      // Call API to mark notification as read
      const result = await markNotificationsAsRead([notificationId]);

      if (result.success) {
        // Update local state to mark notification as read
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );

        // Dispatch event to update unread count in drawer
        window.dispatchEvent(new CustomEvent("notification-read"));
      } else {
        console.error("Failed to mark notification as read:", result.error);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (error && notifications.length === 0) {
    return (
      <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={() => fetchNotifications(true)}>
          Try Again
        </Button>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={4}
      width="100%"
      sx={{
        mt: { xs: 2, md: 4 },
        pb: { md: 4 },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: { xs: 2, md: 4 } }}
      >
        <Typography variant="h4" fontWeight={600}>
          Notifications
        </Typography>
        {unreadCount > 0 &&
          (isMobile ? (
            <Tooltip
              title={
                markingAsRead
                  ? "Marking..."
                  : `Mark all as read (${unreadCount})`
              }
            >
              <IconButton
                onClick={handleMarkAllAsRead}
                disabled={markingAsRead}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  "&:disabled": {
                    backgroundColor: "grey.300",
                    color: "grey.500",
                  },
                }}
              >
                {markingAsRead ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Icon icon="mdi:check-all" width={20} height={20} />
                )}
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant="outlined"
              onClick={handleMarkAllAsRead}
              disabled={markingAsRead}
              sx={{ borderRadius: "20px" }}
            >
              {markingAsRead
                ? "Marking..."
                : `Mark all as read (${unreadCount})`}
            </Button>
          ))}
      </Stack>

      {/* Notifications List */}
      <Stack spacing={{ xs: 0, md: 2 }}>
        {notifications.map((notification, index) => (
          <Box key={notification.id}>
            <NotificationCard
              notification={notification}
              onRead={handleNotificationRead}
              onFollowAction={() => {
                // Refresh notifications after follow action
                fetchNotifications(true);
              }}
            />
            {index < notifications.length - 1 && (
              <Divider
                sx={{
                  mt: 2,
                  mb: 2,
                  borderColor: "divider",
                  display: { xs: "block", lg: "none" },
                }}
              />
            )}
          </Box>
        ))}

        {/* Loading State */}
        {loading && (
          <Stack alignItems="center" sx={{ py: 2 }}>
            <CircularProgress />
          </Stack>
        )}

        {/* Load More Button */}
        {!loading && hasMore && (
          <Stack alignItems="center" sx={{ py: 2 }}>
            <Button variant="outlined" onClick={handleLoadMore}>
              Load More Notifications
            </Button>
          </Stack>
        )}

        {/* No More Notifications */}
        {!loading && !hasMore && notifications.length > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ py: 2 }}
          >
            No more notifications to load
          </Typography>
        )}

        {/* Empty State */}
        {!loading && notifications.length === 0 && !error && (
          <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No notifications yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              When you receive notifications, they'll appear here.
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
