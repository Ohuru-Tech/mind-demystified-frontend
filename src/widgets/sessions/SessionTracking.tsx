import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type SessionTrackingProps = {
  total: number;
  completed: number;
  width?: string;
};

export const SessionTracking = ({
  total,
  completed,
  width = "100%",
}: SessionTrackingProps) => {
  const widthIsPercentage = width.includes("%");
  const requestedWidth = width.replace("px", "").replace("%", "");
  const widthInPx = parseInt(requestedWidth);
  const barWidth =
    (widthInPx - (widthIsPercentage ? 8.7 : 40) * total) / (total - 1);
  const circleWidth = widthIsPercentage ? 8.7 : 40;

  return (
    <Stack
      direction={"row"}
      spacing={"0px"}
      alignItems={"center"}
      width={`${widthIsPercentage ? 100 : widthInPx}${
        widthIsPercentage ? "%" : "px"
      }`}
    >
      {Array.from({ length: total }).map((_, index) => (
        <React.Fragment key={index}>
          <Box
            sx={{
              width: `${circleWidth}${widthIsPercentage ? "%" : "px"}`,
              height: "40px",
              borderRadius: "50%",
              backgroundColor: index < completed ? "primary.main" : "#E0E0E0",
              color: "primary.contrastText",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: index === completed ? "1px solid #323232" : "none",
            }}
          >
            <Typography
              variant={"body2"}
              color={
                index < completed ? "primary.contrastText" : "primary.main"
              }
              fontFamily={"monospace"}
            >
              {index + 1}
            </Typography>
          </Box>
          {index !== total - 1 && (
            <Box
              sx={{
                width: widthIsPercentage ? `${barWidth}%` : `${barWidth}px`,
                height: "7px",
                backgroundColor: index < completed ? "primary.main" : "#E0E0E0",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};
