"use client";

import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LoginModal } from "@/widgets/login/LoginModal";
import { getProfile } from "@/app/actions/profile";
import { logout } from "@/app/actions/login";
import { Profile } from "@/models/profile";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Therapy",
    href: "/therapy",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const loggedInNavigationItems = [
  {
    title: "My Learning",
    href: "/learning",
  },
  {
    title: "Explore",
    href: "/courses",
  },
  {
    title: "Therapy",
    href: "/sessions",
  },
  {
    title: "Community",
    href: "/community",
  },
];

const NavigationItem = ({
  item,
}: {
  item: (typeof navigationItems | typeof loggedInNavigationItems)[number];
}) => {
  const pathname = usePathname();
  const isSelected = pathname === item.href;

  return (
    <Typography
      variant="body2"
      component={Link}
      href={item.href}
      sx={{
        textDecoration: isSelected ? "underline" : "none",
        color: "#323232",
        fontWeight: isSelected ? 600 : 400,
        "&:hover": {
          color: "#323232",
          opacity: 0.8,
        },
      }}
    >
      {item.title}
    </Typography>
  );
};

type NavBarProps = {
  elevation?: boolean;
};

export const MindDemystifiedNavBar = (props: NavBarProps) => {
  const { elevation = false } = props;
  const [open, setOpen] = useState(false);
  const [loginButtonOpen, setLoginButtonOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        setIsLoggedIn(false);
        setProfile(null);
        handleProfileMenuClose();
        // Optionally redirect to home page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  function getCTA() {
    if (!isLoggedIn) {
      return (
        <Button
          variant="contained"
          sx={{
            paddingLeft: "22px",
            paddingRight: "22px",
            paddingTop: "5px",
            paddingBottom: "5px",
            display: { xs: "none", md: "block", lg: "block" },
          }}
          onClick={() => {
            setLoginButtonOpen(true);
          }}
        >
          Log In
        </Button>
      );
    }

    if (isLoggedIn) {
      return (
        <IconButton onClick={handleProfileMenuOpen} sx={{ padding: 0 }}>
          <Avatar
            src={profile?.profile.social_image || profile?.profile.image}
            alt={profile?.name || "Profile"}
            sx={{
              width: 40,
              height: 40,
              fontSize: "1rem",
              backgroundColor: "primary.main",
            }}
          >
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
        </IconButton>
      );
    }
  }

  const fetchProfile = async () => {
    try {
      const result = await getProfile();
      if (result.success && result.data) {
        setIsLoggedIn(true);
        setProfile(result.data);
      } else {
        setIsLoggedIn(false);
        setProfile(null);
      }
      // If the api call fails, the user is not logged in
    } catch (error) {
      setIsLoggedIn(false);
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const handleAuthChange = () => {
      fetchProfile();
    };

    window.addEventListener("auth-state-changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, []);

  return (
    <>
      <AppBar
        data-testid="navbar"
        sx={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(254, 251, 245, 0.8)",
          paddingTop: "10px",
          paddingBottom: "10px",
          boxShadow: elevation ? "0 8px 16px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Toolbar>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ width: { xs: "90%", md: "70%" } }}
            >
              {isLoggedIn ? (
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <IconButton
                    sx={{
                      display: { xs: "block", md: "none" },
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "10px",
                      padding: "5px",
                      paddingBottom: "0px",
                    }}
                    onClick={() => setOpen(!open)}
                  >
                    <Icon
                      icon="mdi:menu"
                      style={{
                        color: "#323232",
                      }}
                      fontSize={24}
                    />
                  </IconButton>
                  <Box sx={{ paddingRight: "0%" }}>
                    <Link href={"/"}>
                      <Image
                        style={{ cursor: "pointer" }}
                        src={"/logo.png"}
                        alt="logo"
                        width={46}
                        height={61}
                      />
                    </Link>
                  </Box>
                </Stack>
              ) : (
                <Box sx={{ paddingRight: "8%" }}>
                  <Link href={"/"}>
                    <Image
                      style={{ cursor: "pointer" }}
                      src={"/logo.png"}
                      alt="logo"
                      width={46}
                      height={61}
                    />
                  </Link>
                </Box>
              )}
              <Stack
                direction={"row"}
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {isLoggedIn
                  ? loggedInNavigationItems.map((item) => {
                      if (
                        item.href === "/community" &&
                        !profile?.profile?.has_community
                      ) {
                        return <></>;
                      }
                      return <NavigationItem item={item} key={item.title} />;
                    })
                  : navigationItems.map((item) => (
                      <NavigationItem item={item} key={item.title} />
                    ))}
              </Stack>
              <Stack direction={"row"} spacing={1}>
                {!isLoggedIn && (
                  <IconButton
                    sx={{
                      display: { xs: "block", md: "none" },
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "10px",
                      padding: "5px",
                      paddingBottom: "0px",
                    }}
                    onClick={() => setOpen(!open)}
                  >
                    <Icon
                      icon="mdi:menu"
                      style={{
                        color: "#323232",
                      }}
                      fontSize={24}
                    />
                  </IconButton>
                )}
                {getCTA()}
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          width: "90vw",
          paddingTop: open ? "30%" : "0px",
          paddingLeft: open ? "5%" : "0px",
          height: open ? "100vh" : "0px",
          transition:
            "height 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-left 0.3s ease-in-out",
          overflow: "hidden",
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#FEFBF5",
        }}
      >
        {isLoggedIn
          ? loggedInNavigationItems.map((item) => {
              if (
                item.href === "/community" &&
                !profile?.profile?.has_community
              ) {
                return null;
              }
              return (
                <Typography
                  key={item.title}
                  component={Link}
                  href={item.href}
                  variant="h5"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Typography>
              );
            })
          : navigationItems.map((item) => (
              <Typography
                key={item.title}
                component={Link}
                href={item.href}
                variant="h5"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Typography>
            ))}
        {/* <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          width={"100%"}
          sx={{ marginTop: "15% !important" }}
          onClick={() => setOpen(false)}
        >
          {getCTA()}
        </Stack> */}
      </Stack>
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{
            minWidth: "150px",
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.light",
              color: "error.contrastText",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <LoginModal
        open={loginButtonOpen}
        onClose={() => setLoginButtonOpen(false)}
      />
    </>
  );
};
