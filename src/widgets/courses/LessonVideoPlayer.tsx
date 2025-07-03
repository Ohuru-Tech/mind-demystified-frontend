"use client";

import { VideoPlayer } from "@/widgets/VideoPlayer";

export const LessonVideoPlayer = ({
  source,
  playerDimensions,
  onReady,
  onEnded,
}: {
  source: string;
  playerDimensions?: {
    width: string;
    height: string;
  };
  onReady?: (player: any) => void;
  onEnded?: () => void;
}) => {
  const videoJSOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    aspectRatio: "16:9",
    sources: [
      {
        src: source,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    if (onReady) {
      onReady(player);
    }
  };

  return (
    <VideoPlayer
      playerDimensions={playerDimensions}
      options={videoJSOptions}
      onReady={handlePlayerReady}
      onEnded={onEnded}
    />
  );
};
