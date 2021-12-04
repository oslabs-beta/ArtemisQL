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
              <StorageIcon color="primary" fontSize="large" />
              <Typography variant="h6" component="h3" gutterBottom={true}>Visualize</Typography>
              <Typography variant="body1" component="p">Easily visualize your PostgresQL database with all relationships between your tables in our interactive GUI.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <CreateIcon color="primary" fontSize="large" />
              <Typography variant="h6" component="h3" gutterBottom={true}>Generate</Typography>
              <Typography variant="body1" component="p">ArtemisQL will automatically generate GraphQL schemas (types, mutations, queries) and resolvers based on your relational database.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchIcon color="primary" fontSize="large" />
              <Typography variant="h6" component="h3" gutterBottom={true}>Export</Typography>
              <Typography variant="body1" component="p">"Loading data" will soon be forgotten same way as floppy discs. With PiperNet algorithm, every data could travel faster than it was ever imaginable.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default FeatureComponent;