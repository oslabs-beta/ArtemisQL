import React from 'react'
import FlowComponent from '../Components/FlowComponent'
import SchemaComponent from '../Components/SchemaComponent'

function MainContainer() {
  return (
    // render two components
    <div>
      <FlowComponent />
      <SchemaComponent />
    </div>
  )
}

export default MainContainer;