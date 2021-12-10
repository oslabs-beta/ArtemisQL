import React, { useState, useEffect } from 'react';
import { Container, Button, Grid } from '@mui/material';
import Highlight from 'react-highlight';
import { NoEncryptionTwoTone } from '@mui/icons-material';
import Switch from '@mui/material/Switch';

function SchemaComponent({schema, resolvers}) {
  
  const [text, setText] = useState(schema);
  const [right, setRight ] = useState('0px');
  const [showContainer, setShowContainer] = useState(true);

  const onChangleHandle = () => {
    const test = document.getElementById('test');
    if (showContainer) {
      setRight('-500px')
      test.className = 'slideOut';
      setShowContainer(false);
    } else {
      setRight('0px')
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
      <Grid item xs={1}>
        <Switch defaultChecked onChange={onChangleHandle} />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="xs"  id="test" style={{position: 'absolute', right: `${right}`, zIndex: '99' }}>
          <div style={{height: '790px', overflow: 'scroll', borderRadius: '5px' }}>
            <Highlight language="javascript">
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
  // color: 'rgb(54, 172, 170)',
  // backgroundColor: '#78909c',
  fontWeight: 'normal',
  // backgroundColor: 'primary',
  // borderColor: '#282b2e',
  borderWidth: 2,
}

export default SchemaComponent;