import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Router from './Router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './style.css'; 

/* Our Color Palette
  Floral White: #FFFCF2
  Pale Silver: #CCC5B9
  Black Olive:#403D39
  Eerie Black: #252422
  Flame: #EB5E28
  Dark Blue: #31394D
*/

const theme = createTheme({
  
  palette: {
    primary: {
      main: '#252422',
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

ReactDOM.render(
  <ThemeProvider theme={theme}><Router /></ThemeProvider>
  ,
  document.getElementById('root'),
);