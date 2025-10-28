import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Mind Demystified",
  description:
    "Complete your purchase for courses and therapy sessions on Mind Demystified.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
