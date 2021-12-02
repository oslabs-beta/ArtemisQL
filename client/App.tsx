import React from 'react';
import MainContainer from './Containers/MainContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/* Our Color Palette
Blue Gray: #78909c
Light Gray: #eeeeee
Black Olive: #403D39
Eerie Black: #252422
Orange: #ff6d00
Lime green: #93c763
*/

const theme = createTheme({
  palette: {
    primary: {
      main: '#78909c',
    },
    secondary: {
      main: '#403D39',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#EB5E28',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer />
    </ThemeProvider>
  );
}

export default App;