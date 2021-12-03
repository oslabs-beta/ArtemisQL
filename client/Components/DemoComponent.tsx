import React, { useEffect, useState } from 'react';
import { Link, Box, Typography, Grid, Avatar, Container } from '@mui/material';
import LeftImageStepComponent from './LeftImageStepComponent';
import RightImageStepComponent from './RightImageStepComponent';

const DemoComponent = () => {
  return (
    // Demo Header
    <section>
      <Container maxWidth="sm">
        <Box pt={8} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom={true}>How to use ArtemisQL</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            A tool to visualize your Database's ERD, help generate GraphQL Schema's queries, mutations, types, resolvers.
          </Typography>
        </Box>
      </Container>

       {/* Demo Body */}
      <Container maxWidth="md">
        <Box pt={8} pb={10}>
          <Grid container spacing={6} className="stepContainer">
            {/* // Demo Body - Two parts - Image and Text */}
            <LeftImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" number={1} stepHeader="Enter in your PG URI" stepDetails="Get started by importing from an existing PG URI or use our sample database" />
            <RightImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" number={2} stepHeader="Enter in your PG URI" stepDetails="Get started by importing from an existing PG URI or use our sample database" />
            <LeftImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" number={3} stepHeader="Enter in your PG URI" stepDetails="Get started by importing from an existing PG URI or use our sample database" />
          </Grid>
        </Box>
      </Container>
    </section>

  );
};

export default DemoComponent;