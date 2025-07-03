"use client";

import { getProfile } from "@/app/actions/profile";
import { Profile } from "@/models/profile";
import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const width = "320px";

const navigationItems = [
  {
    title: "My Learning",
    href: "/learning",
    icon: "hugeicons:online-learning-01",
  },
  {
    title: "Sessions",
    href: "/sessions",
    icon: "material-symbols:calendar-clock",
  },
  {
    title: "Explore",
    href: "/explore",
    icon: "mdi:bookshelf",
  },
  {
    title: "Community",
    href: "/community",
    icon: "fluent:people-community-12-filled",
  },
];

const NavigationItem = ({
  item,
}: {
  item: (typeof navigationItems)[number];
}) => {
  const pathname = usePathname();
  const isSelected = pathname === item.href;
  return (
    <Stack
      direction={"row"}
      spacing={"15px"}
      width={"273px"}
      component={Link}
      href={item.href}
      height={"72px"}
      sx={{
        borderRadius: "10px",
        backgroundColor: isSelected ? "primary.main" : "transparent",
        color: isSelected ? "primary.contrastText" : "primary.main",
        paddingLeft: "16px",
        textDecoration: "none",
      }}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Icon
        height={32}
        width={32}
        icon={item.icon}
        color={isSelected ? "#FAF9F6" : "#323232"}
      />
      <Typography
        variant="h6"
        color={isSelected ? "primary.contrastText" : "primary.main"}
      >
        {item.title}
      </Typography>
    </Stack>
  );
};

export const MobileNavigationDrawer = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(60);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      if (result && result.success && result.data) setProfile(result.data);
    };
    fetchProfile();
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const handleAuthChange = async () => {
      const result = await getProfile();
      if (result && result.success && result.data) setProfile(result.data);
    };

    window.addEventListener("auth-state-changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, []);

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "transparent",
          paddingTop: "10px",
          visibility: { xs: !isOpen ? "visible" : "hidden", md: "hidden" },
        }}
        elevation={0}
      >
        <Toolbar>
          {!isOpen && (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ width: "100%", zIndex: 2 }}
            >
              <IconButton onClick={() => setIsOpen(true)}>
                <Icon icon="mdi:menu" />
              </IconButton>
              <Avatar src={profile?.profile.image} />
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      {isOpen && (
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: width,
            height: "100vh",
            paddingTop: "10px",
            borderRight: "1px solid",
            borderColor: "divider",
            zIndex: 1,
            backgroundColor: "white",
          }}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            sx={{ width: "100%" }}
          >
            <IconButton onClick={() => setIsOpen(false)}>
              <Icon icon="mdi:close" />
            </IconButton>
          </Stack>
          <Stack
            direction={"column"}
            spacing={"20px"}
            sx={{ width: "100%" }}
            alignItems={"center"}
          >
            <Image
              src={"/logoDarkBig.png"}
              alt="Profile"
              width={90}
              height={119}
            />
            {navigationItems.map((item) => (
              <NavigationItem item={item} key={item.title} />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};
