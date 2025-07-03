"use client";

import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Collapse,
  IconButton as MuiIconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";

// Sample notes data
const sampleNotes = [
  {
    id: 1,
    content:
      "This lesson covers the fundamental principles of mindfulness meditation. Key takeaway: focus on breathing and present moment awareness.",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    content:
      "Important reminder: practice daily for at least 10 minutes to see consistent results. The guided meditation was particularly helpful.",
    timestamp: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    content:
      "Question for next session: How to handle distractions during meditation? The instructor mentioned techniques but I'd like to practice more.",
    timestamp: "2024-01-13T09:15:00Z",
  },
];

// Utility function to format timestamp
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const NotesWidget = () => {
  const [notes, setNotes] = useState(sampleNotes);
  const [newNote, setNewNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(true);

  const handleSubmit = async () => {
    if (!newNote.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newNoteObj = {
      id: Date.now(),
      content: newNote.trim(),
      timestamp: new Date().toISOString(),
    };

    setNotes([newNoteObj, ...notes]);
    setNewNote("");
    setIsSubmitting(false);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Stack direction={"column"} spacing={2} sx={{ height: "100%" }}>
      <Typography variant={"h6"}>Add a note</Typography>
      <TextField
        label={"Note"}
        placeholder={"Add a note"}
        multiline
        rows={4}
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Stack direction={"row"} width={"100%"} justifyContent={"flex-start"}>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={handleSubmit}
          disabled={!newNote.trim() || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </Stack>
      <Divider />
      <Stack direction={"column"} spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant={"h6"}>Notes ({notes.length})</Typography>
          <MuiIconButton
            size="small"
            onClick={() => setNotesExpanded(!notesExpanded)}
          >
            <Icon
              icon={notesExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
              width={20}
              height={20}
            />
          </MuiIconButton>
        </Stack>
        <Collapse in={notesExpanded}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{
              overflow: "auto",
            }}
          >
            {notes.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No notes yet. Start by adding your first note above.
              </Typography>
            ) : (
              notes.map((note) => (
                <Card key={note.id} sx={{ width: "100%" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography variant="caption" color="text.secondary">
                          {formatTimestamp(note.timestamp)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteNote(note.id)}
                          sx={{ color: "error.main" }}
                        >
                          <Icon icon="mdi:delete" width={16} height={16} />
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {note.content}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
};
