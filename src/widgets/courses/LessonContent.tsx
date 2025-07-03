"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import { LessonVideoPlayer } from "./LessonVideoPlayer";
import { InteractiveTranscript } from "./InteractiveTranscript";
import { AssessmentLesson } from "./AssessmentLesson";
import { HandsOnLesson } from "./HandsOnLesson";
import { CourseAssessment } from "@/models/course";
import { markLessonComplete } from "@/app/actions/course";

interface LessonContentProps {
  lessonId: string;
  lessonType: "video" | "document" | "assessment" | "hands_on";
  title: string;
  completed?: boolean;
  video?: string;
  webvtt?: string;
  document_markdown?: string;
  assessment?: CourseAssessment;
  handsOn?: string;
}

export function LessonContent({
  lessonId,
  lessonType,
  title,
  completed,
  video,
  webvtt = "",
  document_markdown,
  assessment,
  handsOn,
}: LessonContentProps) {
  const videoPlayerRef = useRef<any>(null);

  const handleVideoPlayerReady = (player: any) => {
    videoPlayerRef.current = player;
  };

  const handleTranscriptSegmentClick = (time: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime(time);
    }
  };

  const handleVideoEnded = async () => {
    await markLessonComplete(lessonId);
  };

  // Render different content based on lesson type
  const renderLessonContent = () => {
    switch (lessonType) {
      case "video":
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: {
                    xs: "200px",
                    lg: "400px",
                  },
                }}
              >
                {video ? (
                  <LessonVideoPlayer
                    key={`video-${lessonId}`}
                    source={video}
                    playerDimensions={{
                      width: "100%",
                      height: "100%",
                    }}
                    onReady={handleVideoPlayerReady}
                    onEnded={handleVideoEnded}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    border="1px dashed"
                    borderColor="divider"
                    borderRadius={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No video available for this lesson
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                mt={2}
                sx={{
                  height: { xs: "300px", lg: "auto" },
                  overflow: "auto",
                }}
              >
                <InteractiveTranscript
                  webvtt={webvtt}
                  onSegmentClick={handleTranscriptSegmentClick}
                  playerRef={videoPlayerRef}
                />
              </Box>
            </Grid>
          </Grid>
        );

      case "document":
        // For document lessons, we'll render a placeholder and handle it in the parent
        return null;

      case "assessment":
        return (
          <AssessmentLesson
            assessment={assessment}
            title={title}
            lessonId={lessonId}
            completed={completed}
          />
        );

      case "hands_on":
        return <HandsOnLesson handsOn={handsOn} title={title} />;

      default:
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="400px"
            border="1px dashed"
            borderColor="divider"
            borderRadius={2}
          >
            <Typography variant="body2" color="text.secondary">
              Unknown lesson type: {lessonType}
            </Typography>
          </Box>
        );
    }
  };

  return renderLessonContent();
}
