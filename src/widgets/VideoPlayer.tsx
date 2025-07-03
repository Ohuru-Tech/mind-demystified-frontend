import { Box } from "@mui/material";
import { useEffect, useRef, useCallback } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@/styles/custom-video-styles.css";

export const VideoPlayer = ({
  options,
  onReady,
  playerDimensions,
  onEnded,
}: {
  options: typeof videojs.options;
  onReady: (player: typeof videojs.players) => void;
  playerId?: string;
  playerDimensions?: {
    width: string;
    height: string;
  };
  onEnded?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const setVideoRef = useCallback(
    (element: HTMLVideoElement | null) => {
      videoRef.current = element;

      if (element && !initializedRef.current) {
        initializedRef.current = true;

        const player = videojs(element, options, () => {
          playerRef.current = player;

          // Remove vjs-fluid class if fluid is set to false
          if (options.fluid === false) {
            player.removeClass("vjs-fluid");
          }

          player.on("ended", () => {
            onEnded && onEnded();
          });

          onReady && onReady(player);
        });
      }
    },
    [options, onReady, onEnded]
  );

  useEffect(() => {
    // If we already have a player and the source changed, update it
    if (playerRef.current && initializedRef.current) {
      playerRef.current.src(options.sources);
    }
  }, [options]);

  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  return (
    <Box data-vjs-player style={playerDimensions}>
      <video ref={setVideoRef} className="video-js vjs-big-play-centered" />
    </Box>
  );
};
