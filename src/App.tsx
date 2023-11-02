import React, { useEffect, useLayoutEffect } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./views/MainLayout";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { customPalette, darkPalette } from "./themes/theme";
import { NotificationContextProvider } from "./contexts/NotificationContext";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: customPalette,
            divider: customPalette[200],
            background: {
              default: "#fff",
            },
            text: {
              primary: "#000",
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: customPalette,
            divider: customPalette[200],
            background: {
              default: darkPalette["bg"],
              paper: customPalette[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light",
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationContextProvider>
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </NotificationContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
