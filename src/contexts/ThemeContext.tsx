import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect } from "react";
import { customPalette, darkPalette } from "../themes/theme";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
});

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider: React.FC<any> = ({ children }) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          localStorage.setItem(
            "themeMode",
            prevMode === "light" ? "dark" : "light"
          );
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const themeObj = localStorage.getItem("theme");
    if (themeObj) {
      setMode(themeObj === "dark" ? "dark" : "light");
    } else {
      setMode("light");
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  return useContext(ColorModeContext);
};
