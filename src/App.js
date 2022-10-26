import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import Routes from "./routes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
