"use client";

import { Box, Typography, Paper, Stack, Button, Chip } from "@mui/material";
import { Icon } from "@iconify/react";

interface HandsOnLessonProps {
  handsOn?: string;
  title: string;
}

export function HandsOnLesson({ handsOn, title }: HandsOnLessonProps) {
  if (!handsOn) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="400px"
        border="1px dashed"
        borderColor="divider"
        borderRadius={2}
        p={3}
      >
        <Icon
          icon="mdi:hand-coin-outline"
          width={48}
          height={48}
          color="#666"
        />
        <Typography variant="h6" color="text.secondary" mt={2}>
          No hands-on exercise available
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          This hands-on lesson doesn't have any content yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Chip
              icon={<Icon icon="mdi:hand-coin" />}
              label="Hands-on Exercise"
              color="primary"
              size="small"
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Practical Application
          </Typography>
        </Box>

        <Box
          sx={{
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              mt: 3,
              mb: 2,
              fontWeight: 600,
            },
            "& p": {
              mb: 2,
              lineHeight: 1.6,
            },
            "& ul, & ol": {
              mb: 2,
              pl: 3,
            },
            "& li": {
              mb: 1,
            },
            "& pre": {
              backgroundColor: "grey.100",
              p: 2,
              borderRadius: 1,
              overflow: "auto",
              fontSize: "0.875rem",
            },
            "& code": {
              backgroundColor: "grey.100",
              px: 1,
              py: 0.5,
              borderRadius: 0.5,
              fontSize: "0.875rem",
            },
          }}
          dangerouslySetInnerHTML={{ __html: handsOn }}
        />

        <Box
          sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" startIcon={<Icon icon="mdi:download" />}>
              Download Resources
            </Button>
            <Button variant="contained" startIcon={<Icon icon="mdi:check" />}>
              Mark as Complete
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
