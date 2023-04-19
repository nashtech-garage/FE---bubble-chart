
import {
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { blue } from '@mui/material/colors';
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[400],
        },
        background: {
          default: "#272325",
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },

  },
});

export default theme;