import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/ArtemisQL.png';

const HeaderComponent = () => {
  return (
    <section className='bgImage'>
      <Container maxWidth="md">
        <Box py={8} pt={18} textAlign="center">
          <img src={logo} alt="logo" style={{width: '700px'}}/>
          <Typography variant="h5" color="textSecondary" paragraph={true}> Visualize your data, generate new prototypes, and discover the power of GraphQL</Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary">
              <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/schema"}}> Get Started </Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
};
export default HeaderComponent;