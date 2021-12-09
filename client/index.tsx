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
*/

const theme = createTheme({
  
  palette: {
    primary: {
      main: '#93C763',
    },
    secondary: {
      main: '#93C763',
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