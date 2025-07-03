"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { AppError } from "@/utils/errorHandler";

interface SnackbarContextType {
  showSuccess: (message: string) => void;
  showError: (message: string | AppError) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const showSuccess = (message: string) => {
    showSnackbar(message, "success");
  };

  const showError = (message: string | AppError) => {
    const errorMessage =
      typeof message === "string" ? message : message.message;
    showSnackbar(errorMessage, "error");
  };

  const showWarning = (message: string) => {
    showSnackbar(message, "warning");
  };

  const showInfo = (message: string) => {
    showSnackbar(message, "info");
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const value: SnackbarContextType = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          zIndex: 9999,
        }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", maxWidth: "400px" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
