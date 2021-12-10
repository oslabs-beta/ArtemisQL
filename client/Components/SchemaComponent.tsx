import React, { useState, useEffect } from 'react';
import { Container, Button, Grid, Typography } from '@mui/material';
import Highlight from 'react-highlight';
import Switch from '@mui/material/Switch';

function SchemaComponent({schema, resolvers}) {
  
  const [text, setText] = useState(schema);
  const [right, setRight ] = useState('25px');
  const [showContainer, setShowContainer] = useState(true);

  const onChangeHandle = () => {
    const test = document.getElementById('test');
    if (showContainer) {
      setRight('-750px')
      test.className = 'slideOut';
      setShowContainer(false);
    } else {
      setRight('25px')
      test.className = 'slideIn';
      setShowContainer(true);
    }
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(text);
    //console.log('code copied!')
  };

  return (
    <Grid container justifyContent="flex-end" style={{position: 'absolute', top: '6vh', right: '0px', zIndex: '99' }}>
      <div style={{display: 'flex', alignItems: 'center', paddingTop: '25px', paddingRight: '15px'}} >
        <Typography>HIDE SCHEMA</Typography>
        <Switch defaultChecked onChange={onChangeHandle} />
      </div>
      <Grid item xs={12}>
        <Container maxWidth="xs"  id="test" style={{position: 'absolute', right: `${right}`, zIndex: '99' }}>
          <div style={{height: '790px', overflow: 'scroll', borderRadius: '5px' }}>
            <Highlight language="javascript" style={{borderRadius: '5px'}}>
              {text}
            </Highlight>
          </div>
          <br />
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
    </Grid>
    
  );
}

const buttonStyles = {
  fontWeight: 'normal',
  borderWidth: 2,
}

export default SchemaComponent;