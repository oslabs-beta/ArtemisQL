import React from 'react';
import { Button, AppBar, Typography, Container, Toolbar } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FeedIcon from '@mui/icons-material/Feed';

const FooterComponent = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body2" color="inherit" justifytext="left">
          © 2021 ArtemisQL
        </Typography>
        <Button href="/" target="_blank" className="button" color="inherit" startIcon={<MonetizationOnIcon />} style={{ marginLeft: 'auto' }}>Donation</Button>
        <Button href="/sandbox" target="_blank" className="button" color="inherit" startIcon={<LinkedInIcon />}></Button>
        <Button href="/" target="_blank" className="button" color="inherit" startIcon={<FeedIcon />}></Button>
      </Toolbar>
    </AppBar>
  );
};

export default FooterComponent;