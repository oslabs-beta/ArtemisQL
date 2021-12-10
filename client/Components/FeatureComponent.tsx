import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography, Grid } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AddTaskIcon from '@mui/icons-material/AddTask';
import StorageIcon from '@mui/icons-material/Storage';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

const FeatureComponent = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Box py={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StorageIcon color="warning" fontSize="large" />
              <Typography variant="h5" component="h3" color="#00009f" gutterBottom={true}>VISUALIZE</Typography>
              <Typography variant="body1" component="p">Connect to your SQL database to our interactive dashboard to visualize your table and relationship data displayed in real-time.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <CreateIcon color="warning" fontSize="large" />
              <Typography variant="h5" component="h3" color='#00009f' gutterBottom={true}>GENERATE</Typography>
              <Typography variant="body1" component="p">Generate accurate, exportable GraphQL schema and resolvers tailored to your database specifications.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchIcon color="warning" fontSize="large" />
              <Typography variant="h5" component="h3" color="#00009f" gutterBottom={true}>EXPLORE</Typography>
              <Typography variant="body1" component="p">Connect to our Graphiql sandbox to demo your GraphQL queries and mutations, using your newly generated schemas as reference.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default FeatureComponent;