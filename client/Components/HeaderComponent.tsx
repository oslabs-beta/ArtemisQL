import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <section className='bgImage'>
      <Container maxWidth="md">
        <Box py={4} pt={18} textAlign="center">
          <Typography py={6} color="primary" variant="h1" fontSize="8rem">Artemis<span style={{color: '#E10098'}}>QL</span></Typography>
          <Typography variant="h6" color="textSecondary" style={{fontWeight: 'normal'}}> Visualize your data, generate new prototypes, and explore the possibilities of GraphQL</Typography>
          <Box mt={4}>
            <Button className='button' variant='contained' size='large'>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: "/schema"}}> Get Started </Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeaderComponent;