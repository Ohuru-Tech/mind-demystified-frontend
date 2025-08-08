"use client";

import {
  Button,
  ButtonProps,
  Stack,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getFreeCallDetails,
  getSessionSubscriptionDetail,
} from "@/app/actions/session";
import { SessionsAPIs } from "@/utils/sessionsAPIs";
import Link from "next/link";

interface FreeCallButtonProps extends Omit<ButtonProps, "onClick"> {
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  text?: string;
  showPackages?: boolean;
  simple?: boolean;
}

export const FreeCallButton = ({
  variant = "contained",
  size = "medium",
  text = "Book a free call",
  showPackages = false,
  simple = true,
  ...buttonProps
}: FreeCallButtonProps) => {
  const [hasFreeCall, setHasFreeCall] = useState<boolean | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const [sessionPackages, setSessionPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUserStatus = async () => {
    try {
      setLoading(true);

      // Check for session subscription
      try {
        const sessionSubscriptionDetail = await getSessionSubscriptionDetail();
        if (sessionSubscriptionDetail) {
          setHasSubscription(true);
          setHasFreeCall(false);
          return;
        }
        // No subscription found, continue checking
      } catch (error) {
        // No subscription found, continue checking
      }

      // Check for free call
      try {
        const freeCallDetails = await getFreeCallDetails();
        if (freeCallDetails) {
          setHasFreeCall(true);
          setHasSubscription(false);
          return;
        }
      } catch (error) {
        // No free call found
      }

      // User has neither subscription nor free call
      setHasFreeCall(false);
      setHasSubscription(false);

      // Fetch session packages if we should show them
      if (showPackages) {
        try {
          const sessionAPIs = SessionsAPIs();
          const packages = await sessionAPIs.getSessionPackages();
          setSessionPackages(packages);
        } catch (error) {
          console.error("Error fetching session packages:", error);
        }
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      setHasFreeCall(false);
      setHasSubscription(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const handleClick = () => {
    router.push("/free-call");
  };

  // Don't show anything if loading
  if (loading) {
    return null;
  }

  // Don't show button if user has subscription or free call
  if (hasSubscription || hasFreeCall) {
    return null;
  }

  // Simple button rendering (default behavior)
  if (simple) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        {...buttonProps}
      >
        {text}
      </Button>
    );
  }

  // Full rendering with packages and message
  return (
    <Stack direction="column" spacing={4} alignItems="center">
      {showPackages && sessionPackages.length > 0 && (
        <Stack direction="column" spacing={3} alignItems="center">
          <Grid container spacing={"22px"}>
            {sessionPackages.map((sessionPackage) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={sessionPackage.id}>
                <Stack
                  direction={"column"}
                  spacing={"13px"}
                  alignItems={"center"}
                  sx={{
                    padding: "21px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    border: "1px solid #E0E0E0",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid #E0E0E0",
                      backgroundImage: `url(${sessionPackage.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "252px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundImage: `linear-gradient(
                          to bottom,
                          rgba(0, 0, 0, 0) 0%,
                          rgba(0, 0, 0, 1) 210%
                        )`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        paddingLeft: "20px",
                      }}
                    >
                      <Stack
                        direction={"column"}
                        spacing={"1px"}
                        sx={{ mb: "10px" }}
                      >
                        <Typography
                          variant="body2"
                          textAlign={"right"}
                          color={"white"}
                        >
                          <Stack
                            direction={"row"}
                            spacing={"10px"}
                            alignItems={"baseline"}
                          >
                            <Typography
                              variant="h2"
                              color={"white"}
                              component={"span"}
                              sx={{
                                fontFamily: "monospace",
                              }}
                            >
                              {sessionPackage.num_sessions}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={"white"}
                              component={"span"}
                            >
                              session
                              {sessionPackage.num_sessions > 1 ? "s" : ""}
                            </Typography>
                          </Stack>
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Stack direction={"column"} spacing={"10px"}>
                    <Typography variant="h6" textAlign={"left"}>
                      {sessionPackage.title}
                    </Typography>
                    <Typography variant="body2" textAlign={"left"}>
                      {sessionPackage.expectations}
                    </Typography>
                  </Stack>
                  <Divider flexItem />
                  <Stack
                    direction={"column"}
                    spacing={"10px"}
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="body2" textAlign={"left"}>
                      Price: ${sessionPackage.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "60%",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      component={Link}
                      href={`/sessions/${sessionPackage.id}`}
                    >
                      Book
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}

      <Stack direction="column" spacing={2} alignItems="center">
        <Typography variant="h4" textAlign="center">
          Start with a Free Consultation
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary">
          Book a free 15-minute consultation to discuss your needs
        </Typography>
        <Button
          variant={variant}
          size={size}
          onClick={handleClick}
          {...buttonProps}
        >
          {text}
        </Button>
      </Stack>
    </Stack>
  );
};
