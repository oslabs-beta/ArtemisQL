import React from 'react';
import { Button, AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

// Renders: Footer
const FooterComponent = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar >
        <Typography py={4} variant="body2" color="inherit" justifytext="left">
          © 2021 ArtemisQL
        </Typography>
        <Button href="/" target="_blank" className="button" color="inherit" style={{marginLeft: "auto"}} startIcon={<MonetizationOnIcon/>}>Buy Us A Coffee</Button>
        <IconButton className="button" href="https://github.com/oslabs-beta/ArtemisQL" target="_blank" color="inherit">
          <GitHubIcon />
        </IconButton>
        <IconButton className="button" href="https://www.linkedin.com/" target="_blank" color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton className="button" href="https://medium.com/" target="_blank" color="inherit">
          <ArticleOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default FooterComponent;