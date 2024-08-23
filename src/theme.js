import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D28D9',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F3F4F6',
    },
    text: {
      primary: '#000000',
      secondary: '#4C1D95',
    },
    action: {
      hover: '#D6BCFA',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#6D28D9',
        },
        body1: {
          color: '#000000',
        },
      },
    },
  },
});

export default theme;