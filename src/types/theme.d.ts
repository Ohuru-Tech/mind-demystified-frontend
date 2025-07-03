export {};

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    drawerHeading: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    drawerHeading?: React.CSSProperties;
  }
}

// Update the Typography component's variant prop
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    drawerHeading: true;
  }
}
