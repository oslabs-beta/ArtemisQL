import React from 'react'
import { Container, Button } from '@mui/material';
import Highlight from 'react-highlight';




function SchemaComponent({schemaType}) {
  return (
    <div>
      <h1>Schema / Resolvers</h1> 
      <Container fixed>
        <Button variant="outlined">Schema</Button>
        <Button variant="outlined">Resolvers</Button>
        <Highlight language="javascript">
          {schemaType}
        </Highlight>
      </Container>
    </div>
  )
}

export default SchemaComponent;