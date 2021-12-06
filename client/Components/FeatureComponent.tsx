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
    // <section>
    //   <Container maxWidth="lg">
    //     <Box py={6}>
    //       <Grid container spacing={4}>

    //         <Grid item xs={4}>
    //           <Button startIcon={<AcUnitIcon/>} />
    //           <Typography>It Cool</Typography>
    //           <Typography>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    //             Nunc consequat interdum varius sit amet mattis vulputate enim nulla. 
    //           </Typography>
    //         </Grid>

    //         <Grid item xs={4}>
    //           <Button startIcon={<AccessibilityIcon/>} />
    //           <Typography>Anyone Can Use It</Typography>
    //           <Typography>
    //             Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. 
    //             Eu volutpat odio facilisis mauris.
    //             </Typography>
    //         </Grid>

    //         <Grid item xs={4}>
    //           <Button startIcon={<AddTaskIcon/>} />
    //           <Typography>CRUD CRUD CRUD CRUD</Typography>
    //           <Typography>
    //             empus egestas sed sed risus. Morbi non arcu risus quis varius quam. 
    //             Lacus suspendisse faucibus interdum posuere lorem. 
    //             Rhoncus est pellentesque elit ullamcorper dignissim. 
    //             </Typography>
    //         </Grid>

    //       </Grid>
    //     </Box>
    //   </Container>
    // </section>

    <section>
      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StorageIcon color="secondary" fontSize="large" />
              <Typography variant="h6" component="h3" gutterBottom={true}>Visualize</Typography>
              <Typography variant="body1" component="p">Connect to your SQL database to visualize your table and relationship data displayed in real-time, with our interactive graphical interface.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <CreateIcon color="secondary" fontSize="large" />
              <Typography variant="h6" component="h3" gutterBottom={true}>Generate</Typography>
              <Typography variant="body1" component="p">Generate accurate, usable GraphQL schema and resolvers that can be exported and utlized in your application.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchIcon color="primary" fontSize="large" />
              <Typography variant="h6" component="h3" gutterBottom={true}>Experiment</Typography>
              <Typography variant="body1" component="p">Connect to our Graphiql sandbox to demo your GraphQL queries and mutations, using your newly generated schemas as reference</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default FeatureComponent;