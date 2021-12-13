import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <section className='bgImage'>
      <Container maxWidth="md">
        <Box py={4} pt={25} textAlign="center">
          <Typography py={6} color="primary" variant="h1" fontSize="8rem">
            <span className="a">A</span>
            <span className="r">r</span>
            <span className="t">t</span>
            <span className="e">e</span>
            <span className="m">m</span>
            <span className="i">i</span>
            <span className="s">s</span>
            <span className="q" style={{color: "#E10098"}}>Q</span>
            <span className="l" style={{color: "#E10098"}}>L</span>
          </Typography>
          <Typography className="subheader" variant="h6" color="textSecondary" style={{fontWeight: 'normal'}}> Visualize your data, generate new prototypes, and explore the possibilities of GraphQL</Typography>
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