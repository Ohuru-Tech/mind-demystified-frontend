"use client";

import { Collapse, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const FaqCard = ({
  question,
  answer,
  open,
  showDivider = true,
}: {
  question: string;
  answer: string;
  open?: boolean;
  showDivider?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(open || false);

  return (
    <Stack
      direction={"column"}
      sx={{
        cursor: "pointer",
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="body1" color={"primary.main"} textAlign={"left"}>
          {question}
        </Typography>
        <Icon
          icon={isOpen ? "mdi:expand-less" : "mdi:expand-more"}
          color={"#323232"}
          fontSize={"24px"}
        />
      </Stack>
      <Collapse in={isOpen}>
        <Typography textAlign={"justify"} sx={{ mt: 4 }}>
          {answer}
        </Typography>
      </Collapse>
      {showDivider && <Divider sx={{ mt: 4 }} />}
    </Stack>
  );
};
