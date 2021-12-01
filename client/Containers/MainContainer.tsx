import React, { useEffect, useState } from 'react';
import FlowComponent from '../Components/FlowComponent';
import SchemaComponent from '../Components/SchemaComponent';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function MainContainer() {
  const [data, setData] = useState({});
  const [schema, setSchema] = useState('');
  const resolvers;

  useEffect(() => { 
    fetch('/submit')
      .then((res) => res.json())
      // store data in state.
      .then(({cache, finalString}) => {
        setData(cache);
        setSchema(finalString);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // render two components
    <div>
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
            <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>
              ArtemisQL
            </Typography>
            <Button color="inherit">Docs</Button>
            <Button color="inherit">Github</Button>
            <Button color="inherit">Team</Button>
            <Button color="inherit">Playground</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br/>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={8}>
          <FlowComponent data={data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SchemaComponent schema={schema} resolvers={fakeResolver}/>
        </Grid>
      </Grid>
    </div>
    
  )
}

const fakeResolver = `
const resolvers = {
  Query: {    

    person: (parent, args) => {
      const query = 'SELECT * FROM people WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },

    people: () => {
      const query = 'SELECT * FROM people';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },

    film: (parent, args) => {
      const query = 'SELECT * FROM films WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },

    films: () => {
      const query = 'SELECT * FROM films';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },

    planet: (parent, args) => {
      const query = 'SELECT * FROM planets WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },

    planets: () => {
      const query = 'SELECT * FROM planets';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },

    speciesById: (parent, args) => {
      const query = 'SELECT * FROM species WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },

    species: () => {
      const query = 'SELECT * FROM species';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },

    vessel: (parent, args) => {
      const query = 'SELECT * FROM vessels WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },

    vessels: () => {
      const query = 'SELECT * FROM vessels';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },

    starshipSpec: (parent, args) => {
      const query = 'SELECT * FROM starship_specs WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },

    starshipSpecs: () => {
      const query = 'SELECT * FROM starship_specs';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
`
export default MainContainer;