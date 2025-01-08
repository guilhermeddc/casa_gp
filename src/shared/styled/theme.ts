import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Preto
    },
    secondary: {
      main: "#ffff99", // Dourado
    },
    text: {
      primary: "#FFFFFF", // Branco
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
