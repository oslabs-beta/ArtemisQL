import React from 'react';
import { Container, TextField, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/ArtemisQL.png';
// import { Link } from 'react-router-dom';

const NavComponent = () => {
  const NavToGithub = () => {
    window.open('https://github.com/oslabs-beta/ArtemisQL', '_blank');
  };

  // static app bar
  // DEMO button should lead to /schema
  // make sandbox open to tab
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography color="#EB5E28" variant="h4" component="div" sx={{ flexGrow: 2 }}>
            ArtemisQL
          </Typography> */}
          <Link href="/" variant="h5" color="inherit" underline="none" sx={{ flexGrow: 2 }}>
            <img src={logo} alt="logo" style={{width: '260px', height: '90px'}}/>
          </Link>
          {/* <Button className="button" color="inherit" startIcon={<ArticleIcon />}>Docs</Button> */}
          <Button href="https://github.com/oslabs-beta/ArtemisQL" target="_blank" className="button" color="inherit" startIcon={<GitHubIcon />}>Github</Button>
          <Button href="/schema" target="_blank" className="button" color="inherit" startIcon={<GitHubIcon />}>Demo</Button>
          {/* <Button className="button" color="inherit" startIcon={<GroupsIcon />}>Team</Button> */}
          <Button href="/sandbox" target="_blank" className="button" color="inherit" startIcon={<BugReportIcon />}>Sandbox</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavComponent;