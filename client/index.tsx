import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Router from './Router';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import './style.css'; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* 
  COLOR PALETTE:
  dark gray: '#282b2e'
  aquablue: 'rgb(54, 172, 170)'
  lime green: '#93C763'
  light gray: '#eeeeee'
  graphql pink: '#E10098'
  cobalt blue: '#00009f'
*/

const theme = createTheme({
  
  palette: {
    primary: {
      main: '#282b2e',
    },
    secondary: {
      main: 'rgb(54, 172, 170)',
    },
    warning: {
      main: '#E10098'
    },
    info: {
      main: '#00009f'
    },
    success: {
      main: '#93C763'
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'rgb(54, 172, 170)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'rgb(54, 172, 170)',
          },
        },
      },
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>
  ,
  document.getElementById('root'),
);