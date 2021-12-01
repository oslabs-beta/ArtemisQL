import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import Highlight from 'react-highlight';

function SchemaComponent({schema, resolvers}) {
  const [text, setText] = useState(schema);
  return (
    <div>
      <Container>
        <Button id="schemaButton" variant="outlined" onClick={() => setText(schema)}>Schema</Button>
        <Button id="resolverButton" variant="outlined" onClick={() => setText(resolvers)}>Resolvers</Button>
        <Highlight  language="javascript">
          {text}
        </Highlight>
      </Container>
    </div>
  )
}

export default SchemaComponent;