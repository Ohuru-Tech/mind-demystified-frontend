import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { MindDemystifiedNavBar } from "@/widgets/NavBar";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Mind Demystified",
  description:
    "Access your learning progress, community, and wellness resources on Mind Demystified.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <MindDemystifiedNavBar />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
