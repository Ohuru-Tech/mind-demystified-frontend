import { AxiosError } from "axios";

export interface AppError {
  message: string;
  type:
    | "network"
    | "validation"
    | "authentication"
    | "authorization"
    | "server"
    | "unknown";
  code?: string;
  details?: any;
}

export class ErrorHandler {
  static handle(error: unknown): AppError {
    if (error instanceof AxiosError) {
      return this.handleAxiosError(error);
    }

    if (error instanceof Error) {
      return this.handleGenericError(error);
    }

    return {
      message: "An unexpected error occurred",
      type: "unknown",
    };
  }

  private static handleAxiosError(error: AxiosError): AppError {
    const status = error.response?.status;
    const data = error.response?.data;

    // Network errors
    if (!error.response) {
      return {
        message: "Network error. Please check your internet connection.",
        type: "network",
      };
    }

    // HTTP status based errors
    switch (status) {
      case 400:
        return this.handleValidationError(data);
      case 401:
        return {
          message: "Authentication required. Please log in again.",
          type: "authentication",
          code: "UNAUTHORIZED",
        };
      case 403:
        return {
          message: "You don't have permission to perform this action.",
          type: "authorization",
          code: "FORBIDDEN",
        };
      case 404:
        return {
          message: "The requested resource was not found.",
          type: "server",
          code: "NOT_FOUND",
        };
      case 429:
        return {
          message: "Too many requests. Please try again later.",
          type: "server",
          code: "RATE_LIMITED",
        };
      case 500:
        return {
          message: "Server error. Please try again later.",
          type: "server",
          code: "INTERNAL_SERVER_ERROR",
        };
      default:
        return {
          message: "An error occurred. Please try again.",
          type: "server",
          code: `HTTP_${status}`,
        };
    }
  }

  private static handleValidationError(data: any): AppError {
    if (typeof data === "string") {
      return {
        message: data,
        type: "validation",
      };
    }

    if (Array.isArray(data)) {
      return {
        message: data[0] || "Validation error",
        type: "validation",
        details: data,
      };
    }

    if (typeof data === "object" && data !== null) {
      // Handle nested validation errors
      const errorMessages = Object.values(data).flat();
      const firstMessage = Array.isArray(errorMessages)
        ? errorMessages[0]
        : "Validation error";

      return {
        message:
          typeof firstMessage === "string" ? firstMessage : "Validation error",
        type: "validation",
        details: data,
      };
    }

    return {
      message: "Invalid data provided",
      type: "validation",
    };
  }

  private static handleGenericError(error: Error): AppError {
    // Handle specific error messages
    if (error.message.includes("User not authenticated")) {
      return {
        message: "Please log in to continue",
        type: "authentication",
      };
    }

    if (error.message.includes("Not authenticated")) {
      return {
        message: "Please log in to continue",
        type: "authentication",
      };
    }

    return {
      message: error.message || "An unexpected error occurred",
      type: "unknown",
    };
  }

  static getErrorMessage(error: AppError): string {
    return error.message;
  }

  static shouldRetry(error: AppError): boolean {
    return error.type === "network" || error.type === "server";
  }

  static isAuthenticationError(error: AppError): boolean {
    return error.type === "authentication";
  }

  static isAuthorizationError(error: AppError): boolean {
    return error.type === "authorization";
  }

  static isValidationError(error: AppError): boolean {
    return error.type === "validation";
  }
}

// Common error messages
export const ErrorMessages = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  AUTHENTICATION_ERROR: "Please log in to continue.",
  AUTHORIZATION_ERROR: "You don't have permission to perform this action.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  LOADING_ERROR: "Failed to load data. Please try again.",
  SAVE_ERROR: "Failed to save changes. Please try again.",
  DELETE_ERROR: "Failed to delete item. Please try again.",
  UPLOAD_ERROR: "Failed to upload file. Please try again.",
} as const;
