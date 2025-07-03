import React from "react";
import { Box, Typography, Button, Stack, Alert, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";
import { AppError } from "@/utils/errorHandler";

interface ErrorStateProps {
  error: string | AppError;
  onRetry?: () => void;
  onBack?: () => void;
  variant?: "alert" | "card" | "page";
  showIcon?: boolean;
  fullHeight?: boolean;
  sx?: any;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  onBack,
  variant = "alert",
  showIcon = true,
  fullHeight = false,
  sx = {},
}) => {
  const theme = useTheme();
  const errorMessage = typeof error === "string" ? error : error.message;
  const errorType = typeof error === "string" ? "unknown" : error.type;

  const getErrorIcon = () => {
    switch (errorType) {
      case "network":
        return "mdi:wifi-off";
      case "authentication":
        return "mdi:account-lock";
      case "authorization":
        return "mdi:shield-off";
      case "validation":
        return "mdi:alert-circle";
      case "server":
        return "mdi:server-off";
      default:
        return "mdi:alert-circle";
    }
  };

  const getErrorColor = () => {
    switch (errorType) {
      case "network":
        return theme.palette.warning.main;
      case "authentication":
        return theme.palette.info.main;
      case "authorization":
        return theme.palette.error.main;
      case "validation":
        return theme.palette.warning.main;
      case "server":
        return theme.palette.error.main;
      default:
        return theme.palette.error.main;
    }
  };

  const renderAlert = () => (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        )
      }
      sx={{ width: "100%" }}
    >
      {errorMessage}
    </Alert>
  );

  const renderCard = () => (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        textAlign: "center",
        ...sx,
      }}
    >
      <Stack spacing={2} alignItems="center">
        {showIcon && (
          <Icon
            icon={getErrorIcon()}
            width={48}
            height={48}
            color={getErrorColor()}
          />
        )}
        <Typography variant="h6" color="text.primary">
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {errorMessage}
        </Typography>
        <Stack direction="row" spacing={2}>
          {onBack && (
            <Button variant="outlined" onClick={onBack}>
              Go Back
            </Button>
          )}
          {onRetry && (
            <Button variant="contained" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );

  const renderPage = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...(fullHeight && { height: "100vh" }),
        p: 4,
        ...sx,
      }}
    >
      <Stack spacing={3} alignItems="center" maxWidth={400}>
        {showIcon && (
          <Icon
            icon={getErrorIcon()}
            width={64}
            height={64}
            color={getErrorColor()}
          />
        )}
        <Typography variant="h4" color="text.primary" textAlign="center">
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {errorMessage}
        </Typography>
        <Stack direction="row" spacing={2}>
          {onBack && (
            <Button variant="outlined" size="large" onClick={onBack}>
              Go Back
            </Button>
          )}
          {onRetry && (
            <Button variant="contained" size="large" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );

  const renderContent = () => {
    switch (variant) {
      case "alert":
        return renderAlert();
      case "card":
        return renderCard();
      case "page":
        return renderPage();
      default:
        return renderAlert();
    }
  };

  return renderContent();
};

// Specialized error components
export const PageErrorState: React.FC<{
  error: string | AppError;
  onRetry?: () => void;
  onBack?: () => void;
}> = ({ error, onRetry, onBack }) => (
  <ErrorState
    error={error}
    onRetry={onRetry}
    onBack={onBack}
    variant="page"
    fullHeight
  />
);

export const CardErrorState: React.FC<{
  error: string | AppError;
  onRetry?: () => void;
}> = ({ error, onRetry }) => (
  <ErrorState error={error} onRetry={onRetry} variant="card" />
);

export const AlertErrorState: React.FC<{
  error: string | AppError;
  onRetry?: () => void;
}> = ({ error, onRetry }) => (
  <ErrorState error={error} onRetry={onRetry} variant="alert" />
);

// Empty state component
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "card" | "page";
  sx?: any;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "mdi:inbox-outline",
  action,
  variant = "card",
  sx = {},
}) => {
  const renderCard = () => (
    <Box
      sx={{
        p: 4,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        textAlign: "center",
        ...sx,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Icon icon={icon} width={48} height={48} color="#666" />
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {description}
        </Typography>
        {action && (
          <Button variant="contained" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </Stack>
    </Box>
  );

  const renderPage = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        p: 4,
        ...sx,
      }}
    >
      <Stack spacing={3} alignItems="center" maxWidth={400}>
        <Icon icon={icon} width={64} height={64} color="#666" />
        <Typography variant="h4" color="text.secondary" textAlign="center">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {description}
        </Typography>
        {action && (
          <Button variant="contained" size="large" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </Stack>
    </Box>
  );

  return variant === "page" ? renderPage() : renderCard();
};
