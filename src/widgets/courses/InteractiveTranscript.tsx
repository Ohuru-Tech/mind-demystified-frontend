import { Stack, Typography } from "@mui/material";
import { WebVTTParser } from "webvtt-parser";
import { useMemo, useEffect, useRef, useState } from "react";

// Utility function to format seconds to MM:SS format
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const InteractiveTranscript = ({
  webvtt,
  onSegmentClick,
  playerRef,
}: {
  webvtt: string;
  onSegmentClick?: (time: number) => void;
  playerRef?: React.RefObject<any>;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const lastClickTime = useRef<number>(0);

  // Memoize parsed cues to prevent re-parsing on every render
  const parsed = useMemo(() => {
    if (!webvtt) return { cues: [] };
    const parser = new WebVTTParser();
    return parser.parse(webvtt);
  }, [webvtt]);

  // Poll for current time from video player using getElementById
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef?.current && !playerRef.current.paused()) {
        setCurrentTime(playerRef.current.currentTime());
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Find active cue based on current time
  useEffect(() => {
    const activeCueIndex = parsed.cues.findIndex(
      (cue) => currentTime >= cue.startTime && currentTime <= cue.endTime
    );

    if (activeCueIndex !== -1 && activeCueIndex !== activeIndex) {
      setActiveIndex(activeCueIndex);

      // Don't auto-scroll if user recently clicked (within 2 seconds)
      const now = Date.now();
      if (now - lastClickTime.current < 2000) {
        return;
      }

      // Throttle scrolling to prevent performance issues
      if (now - lastScrollTime.current > 300) {
        lastScrollTime.current = now;

        // Scroll to active segment
        if (activeRef.current && containerRef.current) {
          const container = containerRef.current;
          const activeElement = activeRef.current;

          // Calculate scroll position to keep active element visible
          const containerRect = container.getBoundingClientRect();
          const elementRect = activeElement.getBoundingClientRect();

          // Scroll earlier - when element is in the bottom quarter of the container
          const bottomThreshold =
            containerRect.bottom - containerRect.height * 0.4;
          if (
            elementRect.top < containerRect.top ||
            elementRect.bottom > bottomThreshold
          ) {
            container.scrollTo({
              top: activeElement.offsetTop - container.offsetTop - 20,
              behavior: "smooth",
            });
          }
        }
      }
    }
  }, [currentTime, parsed.cues, activeIndex]);

  useEffect(() => {
    if (activeIndex !== -1) {
      lastClickTime.current = Date.now();
    }
  }, [activeIndex]);

  const handleSegmentClick = (_startTime: number) => {
    // Record the click time to prevent auto-scroll interference
    lastClickTime.current = Date.now();

    if (onSegmentClick) {
      onSegmentClick(_startTime);
    }
  };

  return (
    <Stack
      ref={containerRef}
      direction={"column"}
      sx={{ height: "60vh", overflow: "auto" }}
      spacing={2}
    >
      {parsed.cues.map((cue, index) => {
        const isActive = index === activeIndex;

        return (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"flex-start"}
            spacing={2}
            ref={isActive ? activeRef : null}
            onClick={() => handleSegmentClick(cue.startTime)}
            sx={{
              backgroundColor: isActive ? "primary.main" : "transparent",
              color: isActive ? "primary.contrastText" : "text.primary",
              borderRadius: 1,
              p: 1,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: isActive ? "primary.dark" : "action.hover",
              },
            }}
          >
            <Typography
              variant="body2"
              minWidth={"50px"}
              sx={{
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: isActive ? "primary.contrastText" : "text.secondary",
              }}
            >
              {formatTime(cue.startTime)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                lineHeight: 1.4,
                color: isActive ? "primary.contrastText" : "text.secondary",
              }}
            >
              {cue.text}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
