"use client";

import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Badge,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getUnreadNotificationCount,
  markNotificationsAsRead,
} from "@/app/actions/community";

const menu = [
  {
    label: "Home",
    icon: "/home.svg",
    selectedIcon: "/home-selected.svg",
    href: "/community",
  },
  {
    label: "Notifications",
    icon: "/notification.svg",
    selectedIcon: "/notification-selected.svg",
    href: "/community/notifications",
  },
  {
    label: "Bookmarks",
    icon: "/bookmark.svg",
    selectedIcon: "/bookmark-selected.svg",
    href: "/community/bookmarks",
  },
  {
    label: "Profile",
    icon: "/profile.svg",
    selectedIcon: "/profile-selected.svg",
    href: "/community/profile",
  },
];

export function CommunityDrawerMobile() {
  const router = useRouter();
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(5); // TEMPORARILY HARDCODED FOR TESTING

  const fetchUnreadCount = async () => {
    try {
      const result = await getUnreadNotificationCount();
      if (result.success && result.data) {
        const count = result.data.unread_count || 0;
        setUnreadCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    // If navigating to notifications, mark them as read
    if (newValue === "/community/notifications" && unreadCount > 0) {
      // Mark all notifications as read
      markNotificationsAsRead([]).then(() => {
        setUnreadCount(0);
      });
    }
    router.push(newValue);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  useEffect(() => {
    fetchUnreadCount();
    // Set up interval to refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    // Listen for notification read events
    const handleNotificationRead = () => {
      fetchUnreadCount();
    };
    window.addEventListener("notification-read", handleNotificationRead);
    return () => {
      clearInterval(interval);
      window.removeEventListener("notification-read", handleNotificationRead);
    };
  }, []);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { md: "none" },
        backdropFilter: "blur(200px)",
        backgroundColor: "rgba(250, 249, 246, 0.95)",
        boxShadow: "0 -8px 16px rgba(0,0,0,0.1)",
        borderTop: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <BottomNavigation
        value={pathname}
        onChange={handleNavigation}
        sx={{
          backgroundColor: "transparent",
          "& .MuiBottomNavigationAction-root": {
            color: "text.secondary",
            "&.Mui-selected": {
              color: "primary.main",
            },
          },
        }}
      >
        {menu.map((item) => (
          <BottomNavigationAction
            key={item.label}
            value={item.href}
            icon={
              item.label === "Notifications" ? (
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  invisible={false}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      minWidth: "18px",
                      height: "18px",
                    },
                  }}
                >
                  <Image
                    src={isActive(item.href) ? item.selectedIcon : item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                </Badge>
              ) : (
                <Image
                  src={isActive(item.href) ? item.selectedIcon : item.icon}
                  alt={item.label}
                  width={30}
                  height={30}
                />
              )
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

interface CommunityDrawerProps {
  onPostClick?: () => void;
}

export function CommunityDrawer({ onPostClick }: CommunityDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(5); // TEMPORARILY HARDCODED FOR TESTING

  const fetchUnreadCount = async () => {
    try {
      const result = await getUnreadNotificationCount();
      if (result.success && result.data) {
        setUnreadCount(result.data.unread_count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleNavigation = (href: string) => {
    // If navigating to notifications, mark them as read
    if (href === "/community/notifications" && unreadCount > 0) {
      // Mark all notifications as read
      markNotificationsAsRead([]).then(() => {
        setUnreadCount(0);
      });
    }
    router.push(href);
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick();
    } else {
      handleNavigation("/community");
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    // Set up interval to refresh unread count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    // Listen for notification read events
    const handleNotificationRead = () => {
      fetchUnreadCount();
    };
    window.addEventListener("notification-read", handleNotificationRead);
    return () => {
      clearInterval(interval);
      window.removeEventListener("notification-read", handleNotificationRead);
    };
  }, []);

  return (
    <>
      <Stack
        direction={"column"}
        alignItems={"flex-end"}
        width={"100%"}
        height={"83vh"}
        mt={0}
        sx={{ position: "sticky", top: 0, left: 0, overflowY: "hidden" }}
        pt={5}
        borderRight={"1px solid #E0E0E0"}
      >
        <Box pr={{ xs: 2, lg: 8 }}>
          <Stack
            direction={"column"}
            justifyContent={"flex-end"}
            spacing={"52px"}
            width={"100%"}
          >
            <Typography
              variant="drawerHeading"
              textAlign={"left"}
              sx={{
                display: {
                  xs: "none",
                  md: "none",
                  lg: "block",
                },
              }}
            >
              Community
            </Typography>
            <Stack
              direction={"column"}
              spacing={"30px"}
              sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}
            >
              {menu.map((item) => {
                return item.label === "Notifications" ? (
                  <Badge
                    key={item.label}
                    badgeContent={unreadCount}
                    color="error"
                    invisible={false}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.75rem",
                        minWidth: "18px",
                        height: "18px",
                      },
                    }}
                  >
                    <Image
                      src={isActive(item.href) ? item.selectedIcon : item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                    />
                  </Badge>
                ) : (
                  <Image
                    key={item.label}
                    src={isActive(item.href) ? item.selectedIcon : item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                );
              })}
            </Stack>
            <Stack
              direction={"column"}
              spacing={"40px"}
              sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
            >
              {menu.map((item) => (
                <Stack
                  key={item.label}
                  direction={"row"}
                  spacing={"20px"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.label === "Notifications" ? (
                    <Badge
                      badgeContent={unreadCount}
                      color="error"
                      invisible={false}
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "0.75rem",
                          minWidth: "18px",
                          height: "18px",
                        },
                      }}
                    >
                      <Image
                        src={
                          isActive(item.href) ? item.selectedIcon : item.icon
                        }
                        alt={item.label}
                        width={30}
                        height={30}
                      />
                    </Badge>
                  ) : (
                    <Image
                      src={isActive(item.href) ? item.selectedIcon : item.icon}
                      alt={item.label}
                      width={30}
                      height={30}
                    />
                  )}
                  <Typography
                    color={"primary.main"}
                    variant={isActive(item.href) ? "h6" : "body2"}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostClick}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: 600,
                display: {
                  xs: "none",
                  md: "none",
                  lg: "block",
                },
              }}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
