import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Vinho
    },
    secondary: {
      main: "#54070a", // Dourado
    },
    text: {
      primary: "#ffff99", // Branco
    },
    background: {
      default: "#000000", // Fundo preto
      paper: "#1A1A1A", // Fundo para elementos em destaque
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffff99",
        },
      },
    },
  },
});

export default theme;
