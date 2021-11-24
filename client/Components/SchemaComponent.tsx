import React from 'react'
import { Container, Button } from '@mui/material';



function SchemaComponent() {
  return (
    <div>
      <h1>Hello SchemaComponent</h1> 
      <Container fixed>
        <Button variant="outlined">Schema</Button>
        <Button variant="outlined">Resolver</Button>
      </Container>
    </div>
  )
}

export default SchemaComponent;