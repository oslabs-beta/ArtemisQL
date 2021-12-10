import React, { useEffect, useState } from 'react';
import { Link, Box, Typography, Grid, Avatar, Container, CardActionArea, CardMedia, Card } from '@mui/material';
import flow from '../assets/demo.png'
// left or right either containers an image or some text
const LeftImageStepComponent = ({image, text, number, stepHeader, stepDetails}) => {
  // modulize the text ???
  return (
    // image
    <>
      <Grid item xs={6} md={6}>
        <Card style={{borderColor: '#93c763', borderWidth: 1, borderStyle: "solid", boxShadow: "0px 0px 0.25px 0.25px #93c763"}}>
          <CardMedia className="media" image={image} />
        </Card>
      </Grid>
      {/* text */}
      <Grid item xs={6} md={6}>
        <Box display="flex" height="100%">
          <Box my="auto">
            <Typography color="#E10098" variant="h5" component="h3">{number}</Typography>
            <Typography variant="h5" color='#00009f' component="h2" gutterBottom={true}>{stepHeader}</Typography>
            <Typography variant="body1" color="textSecondary" paragraph={true}>{stepDetails}</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
// borderStyle: "solid",
//   borderWidth: 2,
export default LeftImageStepComponent;