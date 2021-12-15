import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CardMedia, Card } from '@mui/material';

type Props = {
  image: any;
  text: string;
  number: string;
  stepHeader: string;
  stepDetails: string;
}

// left or right either containers an image or some text
const LeftDemoComponent = ({image, text, number, stepHeader, stepDetails}: Props) => {
  return (

    <>
      <Grid item >
        <Card style={{borderColor: '#93c763', borderWidth: 1, borderStyle: "solid"}}>
          <CardMedia className="media" image={image} />
        </Card>
      </Grid>
      {/* text */}
      <Grid item xs={6} md={6}>
        <Box display="flex" height="100%">
          <Box my="auto">
            <Typography color="#E10098" variant="h5">{number}</Typography>
            <Typography variant="h5" color="#00009f" gutterBottom={true}>{stepHeader}</Typography>
            <Typography variant="body1" color="textSecondary" paragraph={true}>{stepDetails}</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
// borderStyle: "solid",
//   borderWidth: 2,
export default LeftDemoComponent;