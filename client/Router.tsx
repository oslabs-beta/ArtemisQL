import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import App from './App';
import MainContainer from './Containers/MainContainer';
import NavComponent from './Components/NavComponent';

const Router = () => (
  <BrowserRouter>
    <NavComponent />
    <Switch>
      <Route path="/" element={<App />} />
      <Route path="/schema" element={<MainContainer />} />
    </Switch>
  </BrowserRouter>

);

export default Router; 