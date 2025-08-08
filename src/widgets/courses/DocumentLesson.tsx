import { Box, Typography, Stack, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { markLessonComplete } from "@/app/actions/course";

// Add revalidation for DocumentLesson component - 60 seconds
export const revalidate = 60;

interface DocumentLessonProps {
  document_markdown?: string;
  title: string;
  lessonId: string;
  completed: boolean;
}

// Custom MDX components using your typography system
const mdxComponents = {
  h1: (props: any) => (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      sx={{ mt: 4, mb: 2, fontWeight: 600 }}
    >
      {props.children}
    </Typography>
  ),
  h2: (props: any) => (
    <Typography
      variant="h5"
      component="h2"
      gutterBottom
      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
    >
      {props.children}
    </Typography>
  ),
  h3: (props: any) => (
    <Typography
      variant="h6"
      component="h3"
      gutterBottom
      sx={{ mt: 3, mb: 2, fontWeight: 600 }}
    >
      {props.children}
    </Typography>
  ),
  h4: (props: any) => (
    <Typography
      variant="subtitle1"
      component="h4"
      gutterBottom
      sx={{ mt: 2, mb: 1, fontWeight: 600 }}
    >
      {props.children}
    </Typography>
  ),
  h5: (props: any) => (
    <Typography
      variant="subtitle2"
      component="h5"
      gutterBottom
      sx={{ mt: 2, mb: 1, fontWeight: 600 }}
    >
      {props.children}
    </Typography>
  ),
  h6: (props: any) => (
    <Typography
      variant="body1"
      component="h6"
      gutterBottom
      sx={{ mt: 2, mb: 1, fontWeight: 600 }}
    >
      {props.children}
    </Typography>
  ),
  p: (props: any) => (
    <Typography variant="body1" component="p" sx={{ mb: 2, lineHeight: 1.6 }}>
      {props.children}
    </Typography>
  ),
  ul: (props: any) => (
    <Box component="ul" sx={{ mb: 2, pl: 3 }}>
      {props.children}
    </Box>
  ),
  ol: (props: any) => (
    <Box component="ol" sx={{ mb: 2, pl: 3 }}>
      {props.children}
    </Box>
  ),
  li: (props: any) => (
    <Typography variant="body1" component="li" sx={{ mb: 1 }}>
      {props.children}
    </Typography>
  ),
  blockquote: (props: any) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        pl: 2,
        ml: 0,
        fontStyle: "italic",
        backgroundColor: "grey.50",
        py: 1,
        mb: 2,
      }}
    >
      <Typography variant="body1" sx={{ fontStyle: "italic" }}>
        {props.children}
      </Typography>
    </Box>
  ),
  code: (props: any) => (
    <Box
      component="code"
      sx={{
        backgroundColor: "grey.100",
        px: 1,
        py: 0.5,
        borderRadius: 0.5,
        fontSize: "0.875rem",
        fontFamily: "monospace",
      }}
    >
      {props.children}
    </Box>
  ),
  pre: (props: any) => (
    <Box
      component="pre"
      sx={{
        backgroundColor: "grey.100",
        p: 2,
        borderRadius: 1,
        overflow: "auto",
        fontSize: "0.875rem",
        fontFamily: "monospace",
        mb: 2,
      }}
    >
      {props.children}
    </Box>
  ),
  strong: (props: any) => (
    <Typography component="span" sx={{ fontWeight: 600 }}>
      {props.children}
    </Typography>
  ),
  em: (props: any) => (
    <Typography component="span" sx={{ fontStyle: "italic" }}>
      {props.children}
    </Typography>
  ),
  a: (props: any) => (
    <Typography
      component="a"
      href={props.href}
      sx={{
        color: "primary.main",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {props.children}
    </Typography>
  ),
};

export async function DocumentLesson({
  document_markdown,
  title,
  lessonId,
  completed,
}: DocumentLessonProps) {
  async function markLessonCompleteAction() {
    "use server";
    await markLessonComplete(lessonId);
  }

  if (!document_markdown) {
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
          icon="mdi:file-document-outline"
          width={48}
          height={48}
          color="#666"
        />
        <Typography variant="h6" color="text.secondary" mt={2}>
          No document available
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          This reading lesson doesn't have any content yet.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ maxHeight: "600px", overflow: "auto" }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reading Lesson
            </Typography>
          </Box>
          <Box>
            <MDXRemote source={document_markdown} components={mdxComponents} />
          </Box>
        </Stack>
      </Box>
      {!completed && (
        <Stack direction="row" justifyContent="flex-end">
          <form action={markLessonCompleteAction}>
            <Button variant="contained" color="primary" type="submit">
              Mark as Complete
            </Button>
          </form>
        </Stack>
      )}
    </>
  );
}
