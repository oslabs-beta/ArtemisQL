import React, { useEffect, useState } from 'react';
import { Link, Container, Box, Typography, Grid, Avatar } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import BioComponent from './BioComponent';

const profile = {
  JB: {
    fullName: 'Johnny Bryan',
    profilePic:'https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    gitHubLink:'https://github.com/johnnybryan',
    linkedInLink:'https://www.linkedin.com/in/john-bryan-10a3bbb9/'
  },
  JC: {
    fullName: 'Jennifer Chau',
    profilePic:'https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    gitHubLink:'https://github.com/jenniferchau',
    linkedInLink:'https://www.linkedin.com/in/jenniferchau512/'
  },
  JL: {
    fullName: 'John Lin',
    profilePic:'https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    gitHubLink:'https://github.com/itzJohn',
    linkedInLink:''
  },
  TS: {
    fullName: 'Taras Sukhoverskyi',
    profilePic:'https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
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
            <Typography variant="h4" component="h2" gutterBottom={true}>Our Team</Typography>
          </Box>
          <Grid container spacing={6}>
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