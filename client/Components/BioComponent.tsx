import React, { useEffect, useState } from 'react';
import { Link, Box, Typography, Grid, Avatar } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const BioComponent = ({ profilePic, fullName, gitHubLink, linkedInLink }) => {
  return (
    <Grid item xs={12} md={3}>
      <Avatar alt="" src={profilePic} className='avatar' />
      <Box mb={2}>
        <Typography variant="h6" component="h4" gutterBottom={true}>{fullName}</Typography>
      </Box>
      <Link href={gitHubLink} target="_blank">
        <GitHubIcon style={{fill: "black"}}/>
      </Link>
      <Link href={linkedInLink} target="_blank">
        <LinkedInIcon style={{fill: "black"}} />
      </Link>
    </Grid>
  );
};
export default BioComponent;