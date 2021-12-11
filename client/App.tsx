import React from 'react';
import HeaderComponent from './Components/HeaderComponent'
import FeatureComponent from './Components/FeatureComponent'
import BioContainer from './Containers/BioContainer'
import FooterComponent from './Components/FooterComponent'
import DemoContainer from './Containers/DemoContainer'

function App() {
  return (
    <div>
      <HeaderComponent />
      <FeatureComponent />
      <DemoContainer />
      <BioContainer />
      <FooterComponent />
    </div>
  );
}

export default App;