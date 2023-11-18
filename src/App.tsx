import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { ColorModeContextProvider } from "./contexts/ThemeContext";
import { MainLayout } from "./views/MainLayout";

function App() {
  return (
    <ColorModeContextProvider>
      <NotificationContextProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </NotificationContextProvider>
    </ColorModeContextProvider>
  );
}

export default App;
