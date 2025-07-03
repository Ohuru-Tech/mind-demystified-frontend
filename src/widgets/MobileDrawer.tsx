"use client";

import { IconButton } from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";

export const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        sx={{
          display: { xs: "block", md: "none" },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "10px",
          padding: "5px",
          paddingBottom: "0px",
        }}
        onClick={() => setOpen(true)}
      >
        <Icon icon="mdi:menu" color="primary.main" fontSize={24} />
      </IconButton>
    </>
  );
};
