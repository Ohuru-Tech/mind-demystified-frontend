import { useState, useCallback } from "react";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { ErrorHandler, AppError } from "@/utils/errorHandler";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

interface UseApiOptions {
  showErrorSnackbar?: boolean;
  showSuccessSnackbar?: boolean;
  successMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: AppError) => void;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const {
    showErrorSnackbar = true,
    showSuccessSnackbar = false,
    successMessage = "Operation completed successfully",
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { showError, showSuccess } = useSnackbar();

  const execute = useCallback(
    async (apiCall: () => Promise<T>): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiCall();
        setState({ data: result, loading: false, error: null });

        if (showSuccessSnackbar) {
          showSuccess(successMessage);
        }

        onSuccess?.(result);
        return result;
      } catch (error) {
        const appError = ErrorHandler.handle(error);
        setState({ data: null, loading: false, error: appError });

        if (showErrorSnackbar) {
          showError(appError);
        }

        onError?.(appError);
        return null;
      }
    },
    [
      showErrorSnackbar,
      showSuccessSnackbar,
      successMessage,
      onSuccess,
      onError,
      showError,
      showSuccess,
    ]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const setError = useCallback((error: AppError) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setData = useCallback((data: T) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setError,
    setData,
  };
}

// Specialized hooks for common operations
export function useApiCall<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>(options);

  return {
    ...api,
    call: api.execute,
  };
}

export function useApiMutation<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>({
    showSuccessSnackbar: true,
    successMessage: "Changes saved successfully",
    ...options,
  });

  return {
    ...api,
    mutate: api.execute,
  };
}

export function useApiQuery<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>({
    showErrorSnackbar: true,
    ...options,
  });

  return {
    ...api,
    query: api.execute,
  };
}
