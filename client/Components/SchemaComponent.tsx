import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import Highlight from 'react-highlight';

function SchemaComponent({schema, resolvers}) {
  
  const [text, setText] = useState(schema);
  
  const copyCode = () => {
    navigator.clipboard.writeText(text);
    console.log('code copied!')
  }

  return (
    <div>
      <Container>
        <div  style={{height: '750px', overflow: 'scroll', borderRadius: '5px' }}>
          <Highlight  language="javascript">
            {text}
          </Highlight>
        </div>
        <br/>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button id="schemaButton" variant="outlined" style={buttonStyles} onClick={() => setText(schema)}>Schema</Button>
          <Button id="resolverButton" variant="outlined" style={buttonStyles} onClick={() => setText(resolvers)}>Resolvers</Button>
          <Button id="exportButton" variant="outlined" style={buttonStyles} onClick={() => copyCode()}>Copy</Button>
        </div>
      </Container>
    </div>
  );
}

const buttonStyles = {
  color: 'white',
  backgroundColor: '#93c763',
  borderWidth: 2,
  borderColor: '#93c763'
}
export default SchemaComponent;