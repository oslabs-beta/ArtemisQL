import React, { useEffect, useState } from 'react';
import FlowComponent from '../Components/FlowComponent';
import SchemaComponent from '../Components/SchemaComponent';
import Grid from '@mui/material/Grid';

function MainContainer() {
  const [data, setData] = useState({});
  const [schemaType, setSchemaType] = useState('');

  useEffect(() => { 
    fetch('/submit')
      .then((res) => res.json())
      // store data in state.
      .then(({cache, finalString}) => {
        setData(cache);
        setSchemaType(finalString);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // render two components
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={11} md={8}>
        <FlowComponent data={data} />
      </Grid>
      <Grid item xs={11} md={3}>
        <SchemaComponent schemaType={schemaType} />
      </Grid>
    </Grid>
  )
}

export default MainContainer;