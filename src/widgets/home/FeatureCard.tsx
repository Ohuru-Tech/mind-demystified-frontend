import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

type FeatureCardProps = {
  title: string;
  description: React.ReactNode;
  image: string;
  href: string;
};

export const FeatureCard = ({
  title,
  description,
  image,
  href,
}: FeatureCardProps) => {
  return (
    <Stack
      direction={"column"}
      component={Link}
      href={href}
      spacing={2}
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          // "& .icon-container": {
          //   boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          // },
          "& .card-container": {
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        },
        textTransform: "none",
        textDecoration: "none",
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"center"}
        width={"100%"}
      >
        <Paper
          elevation={0}
          className="icon-container"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            borderColor: "divider",
            borderWidth: "1px",
            borderStyle: "solid",
            zIndex: 100,
            transition: "all 0.2s ease-in-out",
          }}
        >
          <img width={"48px"} height={"48px"} src={image} alt={title} />
        </Paper>
      </Stack>
      <Card
        elevation={0}
        className="card-container"
        sx={{
          width: "340px",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          borderColor: "divider",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "25px",
          position: "relative",
          top: "-44px",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <CardContent
          sx={{
            paddingBottom: "16px !important",
            paddingTop: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};
