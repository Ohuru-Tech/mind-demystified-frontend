"use client";

import { createTheme, responsiveFontSizes } from "@mui/material";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import { alpha } from "@mui/material";
import { drawerWidth } from "./widgets/courses/CourseAccessDrawer";

export const gilroyBold = localFont({
  src: "./fonts/Gilroy-Bold.ttf",
  display: "swap",
});

export const gilroySemiBold = localFont({
  src: "./fonts/Gilroy-SemiBold.ttf",
  display: "swap",
});

export const gilroyMedium = localFont({
  src: "./fonts/Gilroy-Medium.ttf",
  display: "swap",
});

export const gilroyRegular = localFont({
  src: "./fonts/Gilroy-Regular.ttf",
  display: "swap",
});

const playflairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

let theme = createTheme({
  palette: {
    primary: {
      main: "#323232",
      contrastText: "#FAF9F6",
    },
    divider: "#C9BCB6",
    text: {
      primary: "#FAF9F6",
      secondary: "#323232",
      disabled: "#9B9CA1",
    },
  },
  typography: {
    h1: {
      fontFamily: `${playflairDisplay.style.fontFamily}`,
      fontSize: "100px",
      color: "#323232",
      fontWeight: 600,
    },
    h2: {
      fontFamily: `${playflairDisplay.style.fontFamily}`,
      fontSize: "64px",
      color: "#323232",
      fontWeight: 600,
    },
    h3: {
      fontFamily: `${playflairDisplay.style.fontFamily}`,
      color: "#323232",
      fontSize: "60px",
      fontWeight: 700,
    },
    h4: {
      fontFamily: `${playflairDisplay.style.fontFamily}`,
      fontSize: "40px",
      fontWeight: 600,
      color: "#323232",
    },
    h5: {
      fontFamily: `${playflairDisplay.style.fontFamily}`,
      fontSize: "30px",
      color: "#323232",
      fontWeight: 600,
    },
    h6: {
      fontFamily: `${gilroyBold.style.fontFamily}`,
      fontSize: "20px",
      color: "#323232",
    },
    body1: {
      fontFamily: `${gilroyMedium.style.fontFamily}`,
      fontSize: "20px",
      color: alpha("#323232", 0.65),
    },
    body2: {
      fontFamily: `${gilroyMedium.style.fontFamily}`,
      fontSize: "18px",
      color: alpha("#323232", 0.65),
    },
    subtitle1: {
      fontFamily: `${gilroyBold.style.fontFamily}`,
      fontSize: "16px",
      color: alpha("#323232", 0.65),
    },
    subtitle2: {
      fontFamily: `${gilroyMedium.style.fontFamily}`,
      fontSize: "14px",
      color: alpha("#323232", 0.65),
    },
    drawerHeading: {
      fontFamily: `${playflairDisplay.style.fontFamily}`,
      fontSize: "24px",
      color: "#323232",
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FBEBE3",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#323232",
            borderWidth: "1px",
          },
          color: "#323232",
        },
        input: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontFamily: `${gilroyRegular.style.fontFamily}`,
          color: "#323232",
          borderBottom: "none",
          "::after": {
            display: "none",
          },
          "::before": {
            display: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          backgroundColor: "#323232",
          color: "#FAF9F6",
          fontFamily: `${gilroySemiBold.style.fontFamily}`,
          fontSize: "20px",
          borderRadius: "8px",
        },
        outlined: {
          backgroundColor: "#FAF9F6",
          color: "#323232",
          fontFamily: `${gilroySemiBold.style.fontFamily}`,
          fontSize: "20px",
          borderRadius: "8px",
          "&.Mui-disabled": {
            opacity: 0.4,
          },
        },
        text: {
          backgroundColor: "#FBEBE3",
          fontFamily: `${gilroySemiBold.style.fontFamily}`,
          fontSize: "16px",
          color: "#323232",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: alpha("#323232", 0.24),
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "8px",
          backgroundColor: "transparent",
          color: alpha("#323232", 0.65),
          fontSize: "14px",
        },
        filled: {
          backgroundColor: "#323232",
          color: "#FAF9F6",
          fontSize: "14px",
          borderRadius: "8px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: `${gilroyMedium.style.fontFamily}`,
          fontSize: "20px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
          boxSizing: "border-box",
          zIndex: -1,
          backgroundColor: "#FEFBF5",
          borderRight: "none",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "50px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: `${gilroyMedium.style.fontFamily}`,
          fontSize: "16px",
          color: alpha("#323232", 0.65),
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
