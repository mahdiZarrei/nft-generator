import { createTheme } from "@mui/material/styles";
import { yellow, blue } from "@mui/material/colors";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    info: {
      main: "#f7f7f7",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    info: {
      main: "#f7f7f7",
    },
  },
});
