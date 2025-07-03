"use client";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Chip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  CourseAssessment,
  AssessmentValidationResponse,
} from "@/models/course";
import { validateAssessment } from "@/app/actions/course";

interface AssessmentLessonProps {
  assessment?: CourseAssessment;
  title: string;
  lessonId: string;
  completed?: boolean;
}

type QuizFormData = {
  [questionId: string]: string;
};

type AssessmentState = "not-started" | "in-progress" | "completed";

export function AssessmentLesson({
  assessment,
  title,
  lessonId,
  completed = false,
}: AssessmentLessonProps) {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>(
    completed || assessment?.latest_attempt ? "completed" : "not-started"
  );
  const [validationResult, setValidationResult] =
    useState<AssessmentValidationResponse | null>(
      assessment?.latest_attempt
        ? {
            lesson_id: lessonId,
            total_questions: assessment.latest_attempt.total_questions,
            correct_answers: assessment.latest_attempt.correct_answers,
            score_percentage: assessment.latest_attempt.score_percentage,
            passed: assessment.latest_attempt.passed,
            lesson_completed: assessment.latest_attempt.lesson_completed,
            question_results: assessment.latest_attempt.answers,
          }
        : null
    );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<QuizFormData>({
    mode: "onChange",
  });

  const watchedValues = watch();

  if (!assessment) {
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
          icon="mdi:clipboard-check-outline"
          width={48}
          height={48}
          color="#666"
        />
        <Typography variant="h6" color="text.secondary" mt={2}>
          No assessment available
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          This assessment lesson doesn't have any content yet.
        </Typography>
      </Box>
    );
  }

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true);
    try {
      const answers = Object.entries(data).map(
        ([question_id, selected_answer_id]) => ({
          question_id: String(question_id),
          selected_answer_id: String(selected_answer_id),
        })
      );

      const result = await validateAssessment(lessonId, answers);

      if (result.success && result.data) {
        setValidationResult(result.data);
        setAssessmentState("completed");
      } else {
        throw new Error(result.error || "Failed to validate assessment");
      }
    } catch (error) {
      // Handle error silently or show user-friendly message
    } finally {
      setIsSubmitting(false);
    }
  };

  if (assessmentState === "not-started") {
    const hasAttempt = assessment?.latest_attempt;

    return (
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#fff",
          height: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ height: "100%", justifyContent: "center" }}
        >
          <Icon
            icon="mdi:clipboard-check"
            width={64}
            height={64}
            color={"#323232"}
          />

          <Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Assessment Quiz
            </Typography>
          </Box>

          <Alert severity="info" sx={{ maxWidth: 400 }}>
            <Typography variant="body2">
              This assessment contains {assessment.total_questions} questions.
              You need to score at least 70% to pass. Make sure you're ready
              before starting.
            </Typography>
          </Alert>

          {hasAttempt ? (
            <Alert severity="success" sx={{ maxWidth: 400 }}>
              <Typography variant="body2">
                This assessment has already been completed. You can view your
                results below.
              </Typography>
            </Alert>
          ) : null}

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (hasAttempt) {
                setAssessmentState("completed");
              } else {
                setAssessmentState("in-progress");
              }
            }}
            sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            {hasAttempt ? "View Results" : "Start Assessment"}
          </Button>
        </Stack>
      </Paper>
    );
  }

  if (assessmentState === "completed" && validationResult) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
          height: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Icon
                icon={
                  validationResult.passed
                    ? "mdi:check-circle"
                    : "mdi:close-circle"
                }
                width={64}
                height={64}
                color={validationResult.passed ? "#4CAF50" : "#F44336"}
              />
              <Typography variant="h4" gutterBottom mt={2}>
                {validationResult.passed
                  ? "Congratulations!"
                  : "Assessment Complete"}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Your Score: {validationResult.score_percentage}%
              </Typography>
              <Chip
                label={validationResult.passed ? "PASSED" : "FAILED"}
                sx={{
                  backgroundColor: validationResult.passed
                    ? "#4CAF50"
                    : "#F44336",
                  color: "#FAF9F6",
                  mt: 1,
                }}
                variant="filled"
              />
              {assessment?.latest_attempt && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Completed on:{" "}
                  {new Date(
                    assessment.latest_attempt.created_at
                  ).toLocaleDateString()}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Results Summary
              </Typography>
              <Typography variant="body1">
                Correct Answers: {validationResult.correct_answers} /{" "}
                {validationResult.total_questions}
              </Typography>
              <Typography variant="body1">
                Score: {validationResult.score_percentage}%
              </Typography>
              <Typography variant="body1">
                Status: {validationResult.passed ? "Passed" : "Failed"} (70%
                required to pass)
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Question Results
              </Typography>
              <Stack spacing={2}>
                {validationResult.question_results.map((result, index) => (
                  <Paper
                    key={result.question_id}
                    elevation={0}
                    sx={{ p: 2, border: 1, borderColor: "divider" }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Question {index + 1}: {result.question_text}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Your Answer: {result.selected_answer_text}
                      </Typography>
                      {!result.is_correct && result.correct_answer_text && (
                        <Typography variant="body2" color="error.main">
                          Correct Answer: {result.correct_answer_text}
                        </Typography>
                      )}
                      <Chip
                        label={result.is_correct ? "Correct" : "Incorrect"}
                        size="small"
                        sx={{
                          alignSelf: "flex-start",
                          backgroundColor: result.is_correct
                            ? "#4CAF50"
                            : "#F44336",
                          color: "#FAF9F6",
                        }}
                      />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        height: "600px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Stack spacing={3} sx={{ height: "100%" }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Assessment in Progress - {assessment.total_questions} Questions
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Stack spacing={4}>
              {assessment.questions.map((question, questionIndex) => {
                const questionId = String(question.id);
                return (
                  <Box key={questionId}>
                    <FormControl
                      component="fieldset"
                      error={!!errors[questionId]}
                      fullWidth
                    >
                      <FormLabel component="legend" sx={{ mb: 2 }}>
                        <Typography variant="h6">
                          Question {questionIndex + 1}: {question.question}
                        </Typography>
                      </FormLabel>

                      <Controller
                        name={questionId}
                        control={control}
                        rules={{ required: "Please select an answer" }}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            {question.answer_choices.map((choice) => (
                              <FormControlLabel
                                key={choice.id}
                                value={String(choice.id)}
                                control={<Radio />}
                                label={choice.answer}
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />

                      {errors[questionId] && (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          {errors[questionId]?.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
                );
              })}
            </Stack>
          </Box>

          <Box
            sx={{
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              flexShrink: 0,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={{ xs: "center", sm: "left" }}
              >
                {
                  Object.values(watchedValues).filter(
                    (answer) => answer && answer.trim() !== ""
                  ).length
                }{" "}
                of {assessment.total_questions} questions answered
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setAssessmentState("not-started")}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Back to Instructions
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={!isValid || isSubmitting}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Assessment"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}
