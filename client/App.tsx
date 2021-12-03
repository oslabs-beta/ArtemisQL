import React from 'react';
import NavComponent from './Components/NavComponent'
import MainContainer from './Containers/MainContainer';
import HeaderComponent from './Components/HeaderComponent'
import FeatureComponent from './Components/FeatureComponent'
import TeamBiosComponent from './Components/TeamBiosComponent'
import DemoComponent from './Components/DemoComponent'

function App() {
  return (
    <div>
      <HeaderComponent />
      <FeatureComponent />
      <DemoComponent />
      <TeamBiosComponent />
    </div>
  );
}

export default App;