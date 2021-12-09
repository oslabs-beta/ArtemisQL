import React from 'react';
// import { Container, TextField, Link } from '@mui/material';
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
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Link } from 'react-router-dom';
import a_logo from '../assets/cropped-A-logo.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

const NavComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
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
          {/* <Link href="/" variant="h5" color="inherit" underline="none" sx={{ flexGrow: 2 }}>
            <img src={logo} alt="logo" style={{width: '260px', height: '90px'}}/>
          </Link> */}
          <Link to={{ pathname: "/"}}>
            <img src={a_logo} alt="logo" style={{width: '70px'}}/>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/schema"}}> 
            <Button className="button" color="inherit" startIcon={<PlayCircleFilledIcon />}>Get Started</Button> 
          </Link>
          <Button style={{ textDecoration: 'none', color: 'white' }} href="/sandbox" target="_blank" className="button" color="inherit" startIcon={<BugReportIcon />}> Sandbox</Button>
          <IconButton style={{ marginLeft: 'auto', color: 'white' }} href="https://github.com/oslabs-beta/ArtemisQL" target="_blank" className="button" color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton style={{ color: 'white' }} href="https://www.linkedin.com/" target="_blank" className="button" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton style={{ color: 'white' }} href="https://medium.com/" target="_blank" className="button" color="inherit">
            <ArticleOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavComponent;