import { createTheme } from '@mui/material/styles';

import { brandColors } from './brand-colors';

export const themeConfig = createTheme({
  palette: {
    primary: {
      main: brandColors.green.main,
      dark: brandColors.green.dark,
      contrastText: brandColors.green.contrast,
    },
    secondary: {
      main: brandColors.navy.main,
      light: brandColors.navy.light,
      dark: brandColors.navy.dark,
    },
    error: {
      main: brandColors.error,
      contrastText: brandColors.paper,
    },
    success: {
      main: brandColors.success,
      contrastText: brandColors.paper,
    },
    warning: {
      main: brandColors.warning,
      contrastText: brandColors.paper,
    },
    info: {
      main: brandColors.info,
      contrastText: brandColors.paper,
    },
    background: {
      default: brandColors.canvas,
      paper: brandColors.paper,
    },
    text: {
      primary: '#2d3436',
      secondary: '#636e72',
      disabled: '#565e61',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    body1: { fontWeight: 600 },
    body2: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          '&.toolbar': {
            background: brandColors.gradients.arch,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(18, 64, 106, 0.06)',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: brandColors.gradients.authHero,
          },
        },
      },
    },
  },
});
