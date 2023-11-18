import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

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
    const themeObj = localStorage.getItem("themeMode");

    // const prefersDarkMode = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;

    if (themeObj) {
      setMode(themeObj === "dark" ? "dark" : "light");
    } else {
      setMode("light");
    }

    // const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // const handleChange = () => {
    //   setMode(mediaQuery.matches ? "dark" : "light");
    // };

    // mediaQuery.addEventListener("change", handleChange);

    // return () => {
    //   mediaQuery.removeEventListener("change", handleChange);
    // };
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
