import { Container, Toolbar } from "@mui/material";
import { LearningPageLoadingState } from "@/widgets/common/LoadingState";

export default function LearningLoading() {
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <LearningPageLoadingState />
      </Container>
    </>
  );
}
