// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Use dark mode for a black background
    primary: {
      main: '#6a1b9a', // Purple color
    },
    secondary: {
      main: '#c62828', // Accent color (optional)
    },
    background: {
      default: '#000000', // Black background
      paper: '#424242', // Dark grey for paper elements
    },
    text: {
      primary: '#ffffff', // White text for visibility
      secondary: '#e0e0e0', // Lighter grey for secondary text
    },
  },
});

export default theme;
