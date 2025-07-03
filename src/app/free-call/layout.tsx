import theme from "@/theme";
import { MindDemystifiedNavBar } from "@/widgets/NavBar";
import { Box, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Consultation - Mind Demystified",
  description:
    "Book a free 15-minute consultation call to discuss your mental health needs with our professionals.",
};

export default function FreeCallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body style={{ backgroundColor: "#FEFBF5" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <MindDemystifiedNavBar elevation />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
