import React from 'react';
import { Container, TextField } from '@mui/material';
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

const NavComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="#EB5E28" variant="h4" component="div" sx={{ flexGrow: 2 }}>
            ArtemisQL
          </Typography>
          <Button className="button" color="inherit" startIcon={<ArticleIcon />}>Docs</Button>
          <Button className="button" color="inherit" startIcon={<GitHubIcon />}>Github</Button>
          <Button className="button" color="inherit" startIcon={<GroupsIcon />}>Team</Button>
          <Button className="button" color="inherit" startIcon={<BugReportIcon />}>Playground</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavComponent;