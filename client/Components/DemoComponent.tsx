import React, { useEffect, useState } from 'react';
import { Link, Box, Typography, Grid, Avatar, Container } from '@mui/material';
import LeftImageStepComponent from './LeftImageStepComponent';
import RightImageStepComponent from './RightImageStepComponent';
import demo1 from '../assets/demo.png'
import demo2 from '../assets/demo2.png'
import demo3 from '../assets/demo3.png'
import demo4 from '../assets/demo4.png'

const DemoComponent = () => {
  return (
    // Demo Header
    <section style={{backgroundColor: "#eeeeee", boxShadow: "0px 0px 0.25px 0.25px #282b2e"}} >
      <Container maxWidth="sm">
        <Box pt={8} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom={true}>How to use ArtemisQL</Typography>
          <Typography variant="body1" color="textSecondary">
            We've designed a simple and intuitive process to help you migrate from a REST API to GraphQL. Here's how it works.
          </Typography>
        </Box>
      </Container>

       {/* Demo Body */}
      <Container maxWidth="xl">
        <Box pt={8} pb={10}>
          <Grid container spacing={6} className="stepContainer">
            {/* // Demo Body - Two parts - Image and Text */}
            <LeftImageStepComponent image={demo1} number="01" stepHeader="Connect to your SQL database" stepDetails="Enter your PostgresQL URI or use our sample STAR WARS database to connect to our interactive dashboard." />
            <RightImageStepComponent image={demo2} number="02" stepHeader="Visualize your data" stepDetails="Gain valuable insight into your database relationships with our interactive GUI. See your tables, columns, and data types rendered, along with each table's primary key, foreign keys, and foreign table connections using React Flow nodes, handles, and edges." />
            <LeftImageStepComponent image={demo3} number="03" stepHeader="Generate accurate GraphQL prototypes" stepDetails="Access your newly generated GraphQL schema (type definitions, queries, and mutations) and resolvers (with SQL queries derived from your database) to copy and use in your application" />
            <RightImageStepComponent image={demo4} number="04" stepHeader="Demo your GraphQL queries and mutations " stepDetails="Explore our Graphiql sandbox to connect to your database and begin experimenting with GraphQL by running queries and mutations using your newly generated schemas as reference." />
          </Grid>
        </Box>
      </Container>
    </section>

  );
};

export default DemoComponent;