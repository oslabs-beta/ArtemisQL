import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <section className='bgImage'>
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom={true}> ArtemisQL </Typography>
          <Typography variant="h5" color="textSecondary" paragraph={true}> Decentralized, secure, private. The PiperNet is on it's way to revolutionize every smartphone, PC, and smart-fridge near you</Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary">
              <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/schema"}}> Try It Yourself </Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
};
export default HeaderComponent;