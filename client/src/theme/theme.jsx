// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

export default function ThemeProvider({ children }) {
  const theme = createTheme({
    shape: {
      borderRadius: 3,
      inputBorderRadius: 3,
    },
    customShadows: {
      dropdown: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Your desired shadow value
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
