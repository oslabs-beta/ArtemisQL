import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import NavComponent from './Components/NavComponent';

const Router = () => (
  <BrowserRouter>
    <NavComponent />
    <Switch>
      <Route path="/" element={<App />} />
      <Route path="/schema" element={<Dashboard />} />
    </Switch>
  </BrowserRouter>
);

export default Router; 