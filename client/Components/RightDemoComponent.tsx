import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CardMedia, Card, Link } from '@mui/material';

type Props = {
  image: any;
  text: string;
  number: string;
  stepHeader: string;
  stepDetails: string;
}

const RightDemoComponent = ({image, text, number, stepHeader, stepDetails}: Props) => {
  return (
    <>
      {/* text */}
      <Grid item xs={12} md={6}>
        <Box display="flex" height="100%">
          <Box my="auto">
            <Typography style={{textAlign: 'right', color: "#E10098"}} variant="h5">{number}</Typography>
            <Typography style={{textAlign: 'right', color: '#00009f'}} variant="h5" gutterBottom={true}>{stepHeader}</Typography>
            <Typography style={{textAlign: 'right'}} variant="body1" color="textSecondary" paragraph={true}>
              {stepDetails}
              <Link href="/sandbox" target="_blank" style={{textDecoration: "none", color: "#E10098"}}>
                {text}.
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* image */}
      <Grid item xs={12} md={6}>
        <Card style={{borderColor: '#93c763', borderWidth: 1, borderStyle: "solid"}}>
          <CardMedia className="media" image={image} />
        </Card>
      </Grid>
    </>
  );
};

export default RightDemoComponent;