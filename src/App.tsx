import React from "react";
import "./App.scss";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { MainLayout } from "./views/MainLayout";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { ColorModeContextProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ColorModeContextProvider>
      <NotificationContextProvider>
        <HashRouter>
          <MainLayout />
        </HashRouter>
      </NotificationContextProvider>
    </ColorModeContextProvider>
  );
}

export default App;
