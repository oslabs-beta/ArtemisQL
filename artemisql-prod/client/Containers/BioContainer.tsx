import React, { useEffect, useState } from 'react';
import { Link, Container, Box, Typography, Grid, Avatar } from '@mui/material';
import BioComponent from '../Components/BioComponent';
import John_Lin from '../assets/john_lin_headshot.jpg';
import Johnny_Bryan from '../assets/johnnybryan.jpg';
import Taras from '../assets/taras.jpg';
import Jennifer_Chau from '../assets/jennifer_chau_headshot.jpg';

const profile = {
  JB: {
    fullName: 'Johnny Bryan',
    profilePic: Johnny_Bryan,
    gitHubLink:'https://github.com/johnnybryan',
    linkedInLink:'https://www.linkedin.com/in/john-bryan-10a3bbb9/'
  },
  JC: {
    fullName: 'Jennifer Chau',
    profilePic: Jennifer_Chau,
    gitHubLink:'https://github.com/jenniferchau',
    linkedInLink:'https://www.linkedin.com/in/jenniferchau512/'
  },
  JL: {
    fullName: 'John Lin',
    profilePic: John_Lin,
    gitHubLink:'https://github.com/itzJohn',
    linkedInLink:'https://www.linkedin.com/in/john-lin-/'
  },
  TS: {
    fullName: 'Taras Sukhoverskyi',
    profilePic: Taras,
    gitHubLink:'https://github.com/Tarantino23',
    linkedInLink:'https://www.linkedin.com/in/taras-sukhoverskyi-628642145/'
  },
};

const TeamBiosComponent = () => {
  return (
    <section>
      <Container maxWidth='lg'>
        <Box pt={8} pb={10} textAlign='center'>
          <Box mb={10}>
            <Typography variant="h5" component="h2" gutterBottom={true}>ArtemisQL Team</Typography>
          </Box>
          <Grid style={{fontSize:"6px", color:'#282b2e'}}  container spacing={6}>
            <BioComponent fullName={profile.JB.fullName} profilePic={profile.JB.profilePic} gitHubLink={profile.JB.gitHubLink} linkedInLink={profile.JB.linkedInLink} />
            <BioComponent fullName={profile.JC.fullName} profilePic={profile.JC.profilePic} gitHubLink={profile.JC.gitHubLink} linkedInLink={profile.JC.linkedInLink} />
            <BioComponent fullName={profile.JL.fullName} profilePic={profile.JL.profilePic} gitHubLink={profile.JL.gitHubLink} linkedInLink={profile.JL.linkedInLink} />
            <BioComponent fullName={profile.TS.fullName} profilePic={profile.TS.profilePic} gitHubLink={profile.TS.gitHubLink} linkedInLink={profile.TS.linkedInLink} />
          </Grid>
        </Box>
      </Container>
    </section>
  );
};
export default TeamBiosComponent;