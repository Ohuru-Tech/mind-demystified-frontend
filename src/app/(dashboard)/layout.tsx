import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Box } from "@mui/material";
import { MindDemystifiedNavBar } from "@/widgets/NavBar";
import { SnackbarProvider } from "@/contexts/SnackbarContext";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang={"en"}>
      <body style={{ backgroundColor: "#FEFBF5" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <MindDemystifiedNavBar />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
