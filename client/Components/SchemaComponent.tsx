import React, { useState, useEffect } from 'react';
import { Container, Button, Grid, Typography } from '@mui/material';
import Highlight from 'react-highlight';
import Switch from '@mui/material/Switch';

type Props = {
  schema: string;
  resolvers: string;
}

function SchemaComponent({schema, resolvers}: Props) {
  const [text, setText] = useState(schema);
  const [position, setPosition] = useState('0px');
  const [showContainer, setShowContainer] = useState(true);

  // modifies schema tab position state on switch change
  const onSwitch = () => {
    const tab:any = document.getElementById('tab');
    if (showContainer) {
      setPosition('-1000px')
      tab.className = 'slideOut';
      setShowContainer(false);
    } else {
      setPosition('25px')
      tab.className = 'slideIn';
      setShowContainer(true);
    }
  };
  
  // copies current text to clipboard to be exported
  const copyCode = () => {
    navigator.clipboard.writeText(text);
  };

  // renders switch, code container, and buttons
  return (
    <Grid container justifyContent="flex-end" style={containerStyle}>
      <div style={switchStyle}>
        <Typography>SHOW SCHEMA</Typography>
        <Switch defaultChecked onChange={onSwitch} />
      </div>
      <Grid item xs={12}>
        <Container maxWidth="xs" id="tab" style={{ position: 'absolute', right: `${position}`, zIndex: '99' }}>
          <div style={{ height: '75vh', overflow: 'scroll', borderRadius: '5px' }}>
            <Highlight language="javascript" style={{borderRadius: '5px'}}>
              {text}
            </Highlight>
          </div>
          <br />
          <Grid container spacing={1} align="center" justify="space-around" mb={4}>
            <Grid item xs={3.6}>
              <Button id="schemaButton" fullWidth variant="contained" style={buttonStyle} onClick={() => setText(schema)}>Schema</Button>
            </Grid>
            <Grid item xs={4.8}>
              <Button id="resolverButton" fullWidth variant="contained" style={buttonStyle} onClick={() => setText(resolvers)}>Resolvers</Button>
            </Grid>
            <Grid item xs={3.6}>
              <Button id="exportButton" fullWidth variant="contained" style={buttonStyle} onClick={() => copyCode()}>Copy</Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

// COMPONENT STYLING
const containerStyle = {
  position: 'absolute', 
  top: '5vh', 
  right: '0px', 
  zIndex: '99'
}

const switchStyle = {
  display: 'flex', 
  alignItems: 'center', 
  marginTop: '5vh', 
  marginBottom: '10px', 
  marginRight: '25px', 
  paddingLeft: '10px', 
  borderStyle: 'solid', 
  borderWidth: '1px', 
  borderColor: '#403D39', 
  borderRadius: '5px', 
  backgroundColor:'#eeeeee'
}

const buttonStyle = {
  fontWeight: 'normal',
  borderWidth: 2,
}

export default SchemaComponent;