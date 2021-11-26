import React, { useEffect, useState } from 'react';
import FlowComponent from '../Components/FlowComponent';
import SchemaComponent from '../Components/SchemaComponent';
import Grid from '@mui/material/Grid';

function MainContainer() {
  const [data, setData] = useState({});

  useEffect(() => { 
    fetch('/submit')
      .then((res) => res.json())
      // store data in state.
      .then((tables) => setData(tables));
  }, []);

  return (
    // render two components
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={11} md={8}>
        <FlowComponent data={data} />
      </Grid>
      <Grid item xs={11} md={3}>
        <SchemaComponent />
      </Grid>
    </Grid>
  )
}

export default MainContainer;