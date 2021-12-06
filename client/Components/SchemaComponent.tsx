import React, { useState, useEffect } from 'react';
import { Container, Button, Grid } from '@mui/material';
import Highlight from 'react-highlight';

function SchemaComponent({schema, resolvers}) {
  
  const [text, setText] = useState(schema);
  
  const copyCode = () => {
    navigator.clipboard.writeText(text);
    //console.log('code copied!')
  }

  return (
    <Grid item xs={12}>
      <Container>
        <div  style={{height: '790px', overflow: 'scroll', borderRadius: '5px' }}>
          <Highlight  language="javascript">
            {text}
          </Highlight>
        </div>
        <br/>

        <Grid container spacing={1} align="center" justify="space-around">
          <Grid item xs={3.6}>
            <Button id="schemaButton" fullWidth variant="contained" style={buttonStyles} onClick={() => setText(schema)}>Schema</Button>
          </Grid>
          <Grid item xs={4.8}>
            <Button id="resolverButton" fullWidth variant="contained" style={buttonStyles} onClick={() => setText(resolvers)}>Resolvers</Button>
          </Grid>
          <Grid item xs={3.6}>
            <Button id="exportButton" fullWidth variant="contained" style={buttonStyles} onClick={() => copyCode()}>Copy</Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

const buttonStyles = {
  color: 'white',
  backgroundColor: '#78909c',
  borderColor: '#78909c',
  borderWidth: 2
}

export default SchemaComponent;