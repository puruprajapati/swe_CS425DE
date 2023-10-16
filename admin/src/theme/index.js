import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#ffffff',
    },
    activate: {
      main: '#229a16',
      contrastText: '#229a16',
    },
    deactivate: {
      main: '#b72136',
      contrastText: '#b72136',
    },
    delete: {
      main: '#64748B',
      contrastText: '#ffffff',
    }
  },
});
