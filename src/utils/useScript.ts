import { useEffect, useState } from "react";

interface UseScriptOptions {
  shouldPreventLoad?: boolean;
  removeOnUnmount?: boolean;
}

interface UseScriptReturn {
  ready: boolean;
  error: boolean;
  loading: boolean;
}

export const useScript = (
  src: string,
  options: UseScriptOptions = {}
): UseScriptReturn => {
  const { shouldPreventLoad = false, removeOnUnmount = false } = options;

  const [state, setState] = useState<UseScriptReturn>({
    ready: false,
    error: false,
    loading: true,
  });

  useEffect(() => {
    if (shouldPreventLoad) {
      setState({
        ready: false,
        error: false,
        loading: false,
      });
      return;
    }

    // Check if script already exists
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.head.appendChild(script);

      // Store status in attribute on script
      const setAttributeFromEvent = (event: Event) => {
        script?.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error"
        );
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      // Grab existing script status from attribute and set to state accordingly
      setState({
        ready: script.getAttribute("data-status") === "ready",
        error: script.getAttribute("data-status") === "error",
        loading: script.getAttribute("data-status") === "loading",
      });
    }

    // Event handler to update state in instance
    const setStateFromEvent = (event: Event) => {
      setState({
        ready: event.type === "load",
        error: event.type === "error",
        loading: false,
      });
    };

    // Add event listeners
    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }

      if (removeOnUnmount && script) {
        script.remove();
      }
    };
  }, [src, shouldPreventLoad, removeOnUnmount]);

  return state;
};
