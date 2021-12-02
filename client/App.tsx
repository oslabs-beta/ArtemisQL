import React from 'react';
import MainContainer from './Containers/MainContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer />
    </ThemeProvider>
  );
}

export default App;