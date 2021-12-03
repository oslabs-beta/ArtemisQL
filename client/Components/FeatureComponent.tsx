import React, { useEffect, useState } from 'react';
import { Container, Button, Box, Typography, Grid } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AddTaskIcon from '@mui/icons-material/AddTask';

const FeatureComponent = () => {
  return (
    <section>
      <Container maxWidth="lg">
        <Box py={8} textAlign="center">
          <Grid container spacing={4}>

            <Grid item xs={4}>
              <Button startIcon={<AcUnitIcon/>} />
              <Typography>It Cool</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Nunc consequat interdum varius sit amet mattis vulputate enim nulla. 
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Button startIcon={<AccessibilityIcon/>} />
              <Typography>Anyone Can Use It</Typography>
              <Typography>
                Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. 
                Eu volutpat odio facilisis mauris.
                </Typography>
            </Grid>

            <Grid item xs={4}>
              <Button startIcon={<AddTaskIcon/>} />
              <Typography>CRUD CRUD CRUD CRUD</Typography>
              <Typography>
                empus egestas sed sed risus. Morbi non arcu risus quis varius quam. 
                Lacus suspendisse faucibus interdum posuere lorem. 
                Rhoncus est pellentesque elit ullamcorper dignissim. 
                </Typography>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default FeatureComponent;