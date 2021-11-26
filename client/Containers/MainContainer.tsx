import React from 'react'
import FlowComponent from '../Components/FlowComponent'
import SchemaComponent from '../Components/SchemaComponent'
import Grid from '@mui/material/Grid'


function MainContainer() {
  return (
    // render two components
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={11} md={8}>
        <FlowComponent />
      </Grid>
      <Grid item xs={11} md={3}>
        <SchemaComponent />
      </Grid>
    </Grid>
  )
}

export default MainContainer;