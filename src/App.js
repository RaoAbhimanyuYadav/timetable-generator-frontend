import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/store/auth-context";
import Routes from "./routes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
