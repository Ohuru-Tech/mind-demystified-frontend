"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import {
  acceptFollowRequestAction,
  rejectFollowRequestAction,
} from "@/app/actions/community";

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

interface NotificationCardProps {
  notification: Notification;
  onRead?: (notificationId: number) => void;
  onFollowAction?: () => void;
}

export default function NotificationCard({
  notification,
  onRead,
  onFollowAction,
}: NotificationCardProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const getNotificationIcon = () => {
    switch (notification.notification_type) {
      case "like":
        return "mdi:heart";
      case "comment":
        return "mdi:comment";
      case "follow":
        return "mdi:account-plus";
      default:
        return "mdi:bell";
    }
  };

  const getNotificationColor = () => {
    switch (notification.notification_type) {
      case "like":
        return "error.main";
      case "comment":
        return "primary.main";
      case "follow":
        return "success.main";
      default:
        return "text.secondary";
    }
  };

  const handleClick = () => {
    // Mark as read when clicked
    if (!notification.read && onRead) {
      onRead(notification.id);
    }

    // Navigate based on notification type
    if (notification.post_slug) {
      router.push(`/community/posts/${notification.post_slug}`);
    } else if (notification.requester_info?.id) {
      router.push(`/community/profile/${notification.requester_info.id}`);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.requester_info?.id) {
      router.push(`/community/profile/${notification.requester_info.id}`);
    }
  };

  const handleAcceptFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.requester_info?.id) return;

    try {
      const result = await acceptFollowRequestAction(
        notification.requester_info.id
      );
      if (result.success) {
        onFollowAction?.();
      } else {
        console.error("Failed to accept follow request:", result.error);
      }
    } catch (error) {
      console.error("Error accepting follow request:", error);
    }
  };

  const handleRejectFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.requester_info?.id) return;

    try {
      const result = await rejectFollowRequestAction(
        notification.requester_info.id
      );
      if (result.success) {
        onFollowAction?.();
      } else {
        console.error("Failed to reject follow request:", result.error);
      }
    } catch (error) {
      console.error("Error rejecting follow request:", error);
    }
  };

  // Handle null requester_info
  if (!notification.requester_info) {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: notification.read
            ? "transparent"
            : "rgba(25, 118, 210, 0.04)",
          borderRadius: "12px",
          p: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: notification.read
              ? "rgba(0, 0, 0, 0.02)"
              : "rgba(25, 118, 210, 0.08)",
          },
        }}
        onClick={handleClick}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: getNotificationColor(),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon
              icon={getNotificationIcon()}
              width={20}
              height={20}
              color="white"
            />
          </Box>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {notification.message}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {notification.activity_time_info}
            </Typography>
          </Stack>

          {!notification.read && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                flexShrink: 0,
              }}
            />
          )}
        </Stack>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: notification.read
            ? "transparent"
            : "rgba(25, 118, 210, 0.04)",
          borderRadius: "12px",
          p: 0,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: notification.read
              ? "rgba(0, 0, 0, 0.02)"
              : "rgba(25, 118, 210, 0.08)",
          },
        }}
        onClick={handleClick}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: getNotificationColor(),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon
              icon={getNotificationIcon()}
              width={20}
              height={20}
              color="white"
            />
          </Box>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ cursor: "pointer" }}
                onClick={handleUserClick}
              >
                {notification.requester_info?.name || "Unknown User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.requester_info?.name
                  ? notification.message
                      .replace(notification.requester_info.name, "")
                      .trim()
                  : notification.message}
              </Typography>
            </Stack>

            <Typography variant="caption" color="text.secondary">
              {notification.activity_time_info}
            </Typography>

            {(() => {
              // Check for action_requested field with fallbacks
              const actionRequested =
                notification.action_requested ||
                (notification as any).action_required ||
                (notification as any).actionRequired;

              // Check if this is a pending request (needs action) vs accepted request (just informational)
              const isPendingRequest = actionRequested === true;
              const isAcceptedRequest =
                notification.message.toLowerCase().includes("accepted") ||
                notification.message
                  .toLowerCase()
                  .includes("accepted your follow request");

              const shouldShowButtons =
                notification.notification_type === "follow" &&
                notification.requester_info &&
                isPendingRequest &&
                !isAcceptedRequest; // Don't show buttons for accepted requests

              return shouldShowButtons ? (
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAcceptFollow}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2,
                      py: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleRejectFollow}
                    sx={{
                      borderColor: "error.main",
                      color: "error.main",
                      "&:hover": {
                        borderColor: "error.dark",
                        backgroundColor: "error.light",
                        color: "white",
                      },
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 2,
                      py: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    Reject
                  </Button>
                </Stack>
              ) : null;
            })()}
          </Stack>

          <Stack direction="column" spacing={1} alignItems="flex-end">
            {!notification.read && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  flexShrink: 0,
                }}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderColor: "divider",
        borderWidth: "1px",
        borderStyle: "solid",
        padding: "2%",
        borderRadius: "12px",
        backgroundColor: notification.read
          ? "white"
          : "rgba(25, 118, 210, 0.02)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: notification.read
            ? "rgba(0, 0, 0, 0.02)"
            : "rgba(25, 118, 210, 0.04)",
        },
      }}
      onClick={handleClick}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: getNotificationColor(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon
            icon={getNotificationIcon()}
            width={24}
            height={24}
            color="white"
          />
        </Box>

        <Stack spacing={1} sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
              onClick={handleUserClick}
            >
              {notification.requester_info?.name || "Unknown User"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {notification.requester_info?.name
                ? notification.message
                    .replace(notification.requester_info.name, "")
                    .trim()
                : notification.message}
            </Typography>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {notification.activity_time_info}
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1} alignItems="flex-end">
          {!notification.read && (
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                flexShrink: 0,
              }}
            />
          )}

          {(() => {
            // Check for action_requested field with fallbacks
            const actionRequested =
              notification.action_requested ||
              (notification as any).action_required ||
              (notification as any).actionRequired;

            // Check if this is a pending request (needs action) vs accepted request (just informational)
            const isPendingRequest = actionRequested === true;
            const isAcceptedRequest =
              notification.message.toLowerCase().includes("accepted") ||
              notification.message
                .toLowerCase()
                .includes("accepted your follow request");

            const shouldShowButtons =
              notification.notification_type === "follow" &&
              notification.requester_info &&
              isPendingRequest &&
              !isAcceptedRequest; // Don't show buttons for accepted requests

            return shouldShowButtons ? (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAcceptFollow}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2,
                    py: 0.5,
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleRejectFollow}
                  sx={{
                    borderColor: "error.main",
                    color: "error.main",
                    "&:hover": {
                      borderColor: "error.dark",
                      backgroundColor: "error.light",
                      color: "white",
                    },
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2,
                    py: 0.5,
                  }}
                >
                  Reject
                </Button>
              </Stack>
            ) : null;
          })()}
        </Stack>
      </Stack>
    </Box>
  );
}
