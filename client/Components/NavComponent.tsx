import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


// Renders: NAV BAR: app logo, "get started" button, "sandbox" button, github, linked-in, and medium icons
const NavComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to={{ pathname: "/"}}>
            <img src={logo} alt="logo" style={{width: '80px'}}/>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/schema"}}> 
            <Button style={{fontWeight:"normal"}} color="inherit" startIcon={<PlayCircleFilledIcon />}>Get Started</Button> 
          </Link>
          <Button href="/sandbox" target="_blank" style={{fontWeight:"normal"}} color="inherit" startIcon={<BugReportIcon />}> Sandbox</Button>
          <IconButton style={{ marginLeft: 'auto'}} href="https://github.com/oslabs-beta/ArtemisQL" target="_blank" color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com/company/artemisql" target="_blank" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://medium.com/@helloartemisql/introducing-artemisql-2d39cf391437" target="_blank" color="inherit">
            <ArticleOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavComponent;