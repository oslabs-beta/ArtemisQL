import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <section className='bgImage'>
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="h3" component="h2" gutterBottom={true}> ArtemisQL </Typography>
          <Typography variant="h5" color="textSecondary" paragraph={true}> GraphQL Migration Tool!</Typography>
          <Button variant="contained">
            <Link to={{ pathname: "/schema"}}> Try It Yourself </Link>
          </Button>
        </Box>
      </Container>
    </section>
  );
};
export default HeaderComponent;