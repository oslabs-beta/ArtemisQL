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
            We've designed a simple process to help you migrate from REST API too GraphQL. Here's how it works.
          </Typography>
        </Box>
      </Container>

       {/* Demo Body */}
      <Container maxWidth="xl">
        <Box pt={8} pb={10}>
          <Grid container spacing={6} className="stepContainer">
            {/* // Demo Body - Two parts - Image and Text */}
            <LeftImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9" number="01" stepHeader="Connect to your SQL database" stepDetails="Enter your PostgresQL URI to connect to your database or use our sample Star Wars database" />
            <RightImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" number="02" stepHeader="Visualize your data" stepDetails="Interact with your data in a new way to better understand table relationships" />
            <LeftImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" number="03" stepHeader="Access accurate GraphQL prototypes" stepDetails="Copy newly generated GraphQL schema and resolvers to use in your application" />
            <RightImageStepComponent image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" number="04" stepHeader="Demo your GraphQL queries and mutations " stepDetails="Connect to our Graphiql sandbox to demo your queries and mutations" />
          </Grid>
        </Box>
      </Container>
    </section>

  );
};

export default DemoComponent;