import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import Highlight from 'react-highlight';

function SchemaComponent({schema, resolvers}) {
  const [text, setText] = useState(schema);
  return (
    <div>
      <Container>
        <Button id="schemaButton" variant="outlined" style={buttonStyles} onClick={() => setText(schema)}>Schema</Button>
        <Button id="resolverButton" variant="outlined" style={buttonStyles} onClick={() => setText(resolvers)}>Resolvers</Button>
        <Button id="exportButton" variant="outlined" style={buttonStyles} onClick={() => console.log('button clicked!')}>Copy</Button>
        <Highlight  language="javascript">
          {text}
        </Highlight>
      </Container>
    </div>
  );
}

const buttonStyles = {
  marginRight: 10,
  color: '#282b2e',
  borderWidth: 2,
  borderColor: '#93c763'
}
export default SchemaComponent;