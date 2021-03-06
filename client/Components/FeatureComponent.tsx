import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// Renders feature components: "visualize", "generate", and "explore", icons, and body text
const FeatureComponent = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Box pt={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div style={{display: 'flex', paddingBottom: '4px'}}>
                <StorageIcon className="icon1" color="warning" fontSize="large" />
                <Typography className="vis" pl={1} variant="h6" component="h3" color="#00009f" gutterBottom={true}>VISUALIZE</Typography>
              </div>
              <Typography className="body1" variant="body1" component="p">
                Connect to your SQL database to our interactive dashboard to visualize your table and relationship data displayed in real-time.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} >
              <div style={{display: 'flex', paddingBottom: '3px'}}>
                <AutoGraphIcon className="icon2"color="warning" fontSize="large" />
                <Typography className="gen" pl={1} variant="h6" component="h3" color='#00009f' gutterBottom={true}>GENERATE</Typography>
              </div>
              <Typography className="body2" variant="body1" component="p">
                Generate accurate and exportable GraphQL schema and resolvers tailored to your specific database needs.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <div style={{display: 'flex'}}>
               <TravelExploreIcon className="icon3" color="warning" fontSize="large" />
                <Typography className="exp" pl={1} variant="h6" component="h3" color="#00009f" gutterBottom={true}>EXPLORE</Typography>
              </div>
              <Typography className="body3" variant="body1" component="p">
                Connect to our Graphiql sandbox to demo your GraphQL queries and mutations, using your newly generated schemas as reference.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default FeatureComponent;