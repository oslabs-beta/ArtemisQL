import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/ArtemisQL.png';

const HeaderComponent = () => {
  return (
    <section className='bgImage'>
      <Container maxWidth="md">
        <Box py={4} pt={18} textAlign="center">
          {/* <img src={logo} alt="logo" style={{width: '500px'}}/> */}
          <Typography color="primary" variant="h1">Artemis<span style={{color: '#E10098'}}>QL</span></Typography>
          <Typography variant="h6" color="textSecondary" style={{fontWeight: 'normal'}}> Visualize your data, generate new prototypes, and explore the possibilities of GraphQL</Typography>
          <Box mt={4}>
            <Button className='button' variant='contained'>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: "/schema"}}> Get Started </Link>
            </Button>
            {/* <Link style={{ textDecoration: 'none', color: 'white'}} to={{ pathname: "/schema"}}> 
              <Button className="button" style={{fontWeight:"normal"}} color="inherit">Get Started</Button> 
            </Link> */}
          </Box>
        </Box>
      </Container>
    </section>
  );
};
export default HeaderComponent;