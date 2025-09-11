import {
  alpha,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { FreeCallButton } from "@/widgets/common/FreeCallButton";
import Link from "next/link";

export const TherapySession = () => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        position: "relative",
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
        marginTop: "220px",
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
        spacing={"120px"}
        textAlign={"center"}
        sx={{ position: "relative", width: "100%", zIndex: 1 }}
      >
        <Stack direction={"column"} spacing={"10px"}>
          <Typography variant="h2">Vedic Mind & Heart Therapy</Typography>
          <Typography variant="body1">
            One-on-one sessions for your every need.
          </Typography>
        </Stack>
        <Stack direction={"column"} spacing={"62px"}>
          <Stack
            direction={"column"}
            spacing={"16px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{
                flexWrap: "wrap",
                rowGap: "16px",
                columnGap: "16px",
              }}
            >
              <Card
                sx={{
                  width: { xs: "350px", md: "403px" },
                  height: "245px",
                  borderRadius: "18px",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              >
                <Stack
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant={"body1"} color={"primary.main"}>
                    Mental Wellbeing
                  </Typography>
                </Stack>
              </Card>
              <Card
                sx={{
                  width: { xs: "350px", md: "403px" },
                  height: "245px",
                  borderRadius: "18px",
                  backgroundImage: "url(/mentalWellbeing.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{
                flexWrap: "wrap",
                rowGap: "16px",
                columnGap: "16px",
              }}
            >
              <Card
                sx={{
                  width: { xs: "350px", md: "262px" },
                  height: "245px",
                  borderRadius: "18px",
                  backgroundImage: "url(/workLifeBalanceLeft.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              />
              <Card
                sx={{
                  width: { xs: "350px", md: "262px" },
                  height: "245px",
                  borderRadius: "18px",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              >
                <Stack
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant={"body1"} color={"primary.main"}>
                    Work Life <br /> Balance
                  </Typography>
                </Stack>
              </Card>
              <Card
                sx={{
                  width: { xs: "350px", md: "262px" },
                  height: "245px",
                  borderRadius: "18px",
                  backgroundImage: "url(/workLifeBalanceRight.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{
                flexWrap: "wrap",
                rowGap: "16px",
                columnGap: "16px",
              }}
            >
              <Card
                sx={{
                  width: { xs: "350px", md: "262px" },
                  height: "245px",
                  borderRadius: "18px",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              >
                <Stack
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant={"body1"} color={"primary.main"}>
                    Relationship
                  </Typography>
                </Stack>
              </Card>
              <Card
                sx={{
                  width: { xs: "350px", md: "262px" },
                  height: "245px",
                  borderRadius: "18px",
                  backgroundImage: "url(/relationship.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              />
              <Card
                sx={{
                  width: { xs: "350px", md: "262px" },
                  height: "245px",
                  borderRadius: "18px",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              >
                <Stack
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant={"body1"} color={"primary.main"}>
                    Boundaries
                  </Typography>
                </Stack>
              </Card>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{
                flexWrap: "wrap",
                rowGap: "16px",
                columnGap: "16px",
              }}
            >
              <Card
                sx={{
                  width: { xs: "350px", md: "403px" },
                  height: "245px",
                  borderRadius: "18px",
                  backgroundImage: "url(/trauma.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              />
              <Card
                sx={{
                  width: { xs: "350px", md: "403px" },
                  height: "245px",
                  borderRadius: "18px",
                  borderWidth: "1px",
                  borderColor: "divider",
                  borderStyle: "solid",
                }}
                elevation={0}
              >
                <Stack
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography variant={"body1"} color={"primary.main"}>
                    Trauma
                  </Typography>
                </Stack>
              </Card>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            spacing={"16px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FreeCallButton variant="contained" text="Book a Call" />
            <Button LinkComponent={Link} href="/therapy" variant="outlined">
              See More
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
