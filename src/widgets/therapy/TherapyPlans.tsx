"use client";

import {
  alpha,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { SessionPackage } from "@/models/session";
import { useEffect, useState } from "react";
import { getSessionPackages } from "@/app/actions/session";

export const TherapyPlans = () => {
  const [sessionPackages, setSessionPackages] = useState<SessionPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const packages = await getSessionPackages();
        setSessionPackages(packages);
      } catch (err) {
        console.error("Failed to fetch session packages:", err);
        setError("Failed to load session packages");
        setSessionPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionPackages();
  }, []);

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        position: "relative",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
      }}
    >
      <Box
        sx={{
          width: "253px",
          height: "253px",
          position: "absolute",
          left: "0px",
          top: "0px",
          backgroundColor: alpha("#F59B84", 0.5),
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          width: "253px",
          height: "253px",
          position: "absolute",
          right: "0px",
          bottom: "0px",
          backgroundColor: alpha("#F59B84", 0.5),
          filter: "blur(150px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Stack
        direction={"column"}
        mt={"220px"}
        spacing={"100px"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Typography variant="h2" textAlign={"center"}>
          Consider Starting With...
        </Typography>
      </Stack>

      {loading ? (
        // Show loading state
        <Stack
          direction={"column"}
          spacing={"20px"}
          mt={"100px"}
          alignItems={"center"}
          sx={{
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Typography variant="h6" textAlign={"center"}>
            Loading session packages...
          </Typography>
        </Stack>
      ) : error ? (
        // Show error state
        <Stack
          direction={"column"}
          spacing={"20px"}
          mt={"100px"}
          alignItems={"center"}
          sx={{
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Typography variant="h6" textAlign={"center"}>
            {error}
          </Typography>
          <Typography
            variant="body2"
            textAlign={"center"}
            color="text.secondary"
          >
            Please try again later or contact us for assistance.
          </Typography>
        </Stack>
      ) : sessionPackages.length > 0 ? (
        <Grid container spacing={"22px"} mt={"100px"}>
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
                      {/* <Typography
                        variant="body1"
                        textAlign={"left"}
                        color={"white"}
                      >
                        {sessionPackage.title}
                      </Typography> */}
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
                            session{sessionPackage.num_sessions > 1 ? "s" : ""}
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
      ) : (
        // Show a fallback message when no session packages are available
        <Stack
          direction={"column"}
          spacing={"20px"}
          mt={"100px"}
          alignItems={"center"}
          sx={{
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #E0E0E0",
          }}
        >
          <Typography variant="h6" textAlign={"center"}>
            Session packages are currently unavailable
          </Typography>
          <Typography
            variant="body2"
            textAlign={"center"}
            color="text.secondary"
          >
            Please try again later or contact us for assistance.
          </Typography>
        </Stack>
      )}
    </Container>
  );
};
