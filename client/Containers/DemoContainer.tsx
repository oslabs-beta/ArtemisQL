import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import LeftDemoComponent from '../Components/LeftDemoComponent';
import RightDemoComponent from '../Components/RightDemoComponent';
import demo1 from '../assets/demo1.gif'
import demo2 from '../assets/demo2.gif'
import demo3 from '../assets/demo3.gif'
import demo4 from '../assets/demo4.gif'

const DemoContainer = () => {
  return (
    // Demo Header
    <section style={{backgroundColor: "#eeeeee", boxShadow: "0px 0px 0.25px 0.25px #282b2e"}} >
      <Container maxWidth="sm">
        <Box pt={8} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom={true}>How to use ArtemisQL</Typography>
          <Typography variant="body1" color="textSecondary">
            We've designed a simple and intuitive process to help you migrate from a REST API to 
            <span style={{color: '#E10098'}}> GraphQL</span>
            . Here's how it works.
          </Typography>
        </Box>
      </Container>

       {/* Demo Body */}
      <Container maxWidth="xl">
        <Box pt={8} pb={10}>
          <Grid container spacing={6} className="stepContainer">
            {/* // Demo Body - Two parts - Image and Text */}
            <LeftDemoComponent 
              image={demo1} 
              text=""
              number="01" 
              stepHeader="Connect to your SQL database" 
              stepDetails="Enter your PostgresQL URI or use our sample STAR WARS database to connect to our interactive dashboard." 
              />
            <RightDemoComponent 
              image={demo2} 
              text=""
              number="02" 
              stepHeader="Visualize your data" 
              stepDetails="Gain valuable insight into your database relationships with our interactive GUI. See your tables, columns, and data types rendered, along with each table's primary key, foreign keys, and foreign table connections using React Flow nodes, handles, and edges." 
              />
            <LeftDemoComponent 
              image={demo3} 
              text=""
              number="03" 
              stepHeader="Generate accurate GraphQL prototypes" 
              stepDetails="Access your newly generated GraphQL schema (type definitions, queries, and mutations) and resolvers (with SQL queries derived from your database) to copy and use in your application" 
              />
            <RightDemoComponent 
              image={demo4} 
              text=""
              number="04" 
              stepHeader="Demo your GraphQL queries and mutations" 
              stepDetails="Explore our Graphiql sandbox to connect to your database and begin experimenting with GraphQL by running queries and mutations using your newly generated schemas as reference." 
              />
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default DemoContainer;