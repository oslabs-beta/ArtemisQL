import React, { useEffect, useState } from 'react';
import { Link, Box, Typography, Grid, Avatar, Container, CardActionArea, CardMedia, Card } from '@mui/material';

// left or right either containers an image or some text
const LeftImageStepComponent = ({image, text, number, stepHeader, stepDetails}) => {
  // modulize the text ???
  return (
    // image
    <>
      <Grid item xs={6} md={6}>
        <Card>
          <CardMedia className="media" image={image} />
        </Card>
      </Grid>
      {/* text */}
      <Grid item xs={6} md={6}>
        <Box display="flex" height="100%">
          <Box my="auto">
            <Typography variant="h2" component="h3">{number}</Typography>
            <Typography variant="h4" component="h2" gutterBottom={true}>{stepHeader}</Typography>
            <Typography variant="body1" color="textSecondary" paragraph={true}>{stepDetails}</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default LeftImageStepComponent;