import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography, Grid } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AddTaskIcon from '@mui/icons-material/AddTask';
import StorageIcon from '@mui/icons-material/Storage';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const FeatureComponent = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Box py={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div style={{display: 'flex'}}>
                <StorageIcon color="warning" fontSize="large" />
                <Typography pl={1} variant="h6" component="h3" color="#00009f" gutterBottom={true}>VISUALIZE</Typography>
              </div>
              <Typography variant="body1" component="p">Connect to your SQL database to our interactive dashboard to visualize your table and relationship data displayed in real-time.</Typography>
            </Grid>
            <Grid item xs={12} md={4} >
              <div style={{display: 'flex'}}>
                <AutoGraphIcon color="warning" fontSize="large" />
                <Typography pl={1} variant="h6" component="h3" color='#00009f' gutterBottom={true}>GENERATE</Typography>
              </div>
              <Typography variant="body1" component="p">Generate accurate and exportable GraphQL schema and resolvers tailored to your specific database needs.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{display: 'flex'}}>
               <TravelExploreIcon color="warning" fontSize="large" />
                <Typography pl={1} variant="h6" component="h3" color="#00009f" gutterBottom={true}>EXPLORE</Typography>
              </div>
              <Typography variant="body1" component="p">Connect to our Graphiql sandbox to demo your GraphQL queries and mutations, using your newly generated schemas as reference.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default FeatureComponent;