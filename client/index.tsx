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
import style from './style.css'

/* Our Color Palette
  Floral White: #FFFCF2
  Pale Silver: #CCC5B9
  Black Olive:#403D39
  Eerie Black: #252422
  Flame: #EB5E28
  Dark Blue: #31394D

  Blue Gray: #78909C
  Light Gray: #EEEEEE
  Black Olive: #403D39
  Eerie Black: #252422
  Orange: #FF6D00
  Lime green: #93C763

  johnny palette:
  dark gray: '#282b2e'
  aquablue: 'rgb(54, 172, 170)'
  lime green: '#93C763'
  light gray: '#eeeeee'
  reactpink: '#FF0072'
  graphqlpink: '#E10098'
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
    }
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