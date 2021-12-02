import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import StorageIcon from '@mui/icons-material/Storage';
import SendIcon from '@mui/icons-material/Send';
import FlowComponent from '../Components/FlowComponent';
import SchemaComponent from '../Components/SchemaComponent';
import axios from 'axios';


function MainContainer() {
  const [data, setData] = useState({});
  const [schemaType, setSchemaType] = useState();
  const [dataBaseUrl, setDataBaseUrl] = useState('');
  const [message, setMessage] = useState('');
  // conditional rendering
  // create state called showSchema and set it to false;
  const [showSchema, setSchema] = useState(false);
  
  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    console.log('name', name);
    console.log('value', value);
    
    if (name === 'urlInput') {
      setDataBaseUrl(value);
    }
  }

  function getSampleDB() {
    const request = {
      method: 'GET',
      url: '/submit',
    };
   
    axios.request(request)
      .then((res) => {
        if (res.status = 200) {
          setData(res.data.cache);
          setSchemaType(res.data.finalString);
          setSchema(true);
        }
      })
      .catch(console.error);
  }

  function getDataFromDB(dbLink) {
    const request = {
      method: 'GET',
      url: '/submit',
      params: { dbLink },
    };
   
    axios.request(request)
      .then((res) => {
        if (res.status = 200) {
          setData(res.data.cache);
          setSchemaType(res.data.finalString);
          setSchema(true);
        }
      })
      .catch((err) => {
        setMessage('Invalid URI, please try again');
      });
  }

  if (showSchema) {
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
                <Typography color="#EB5E28" variant="h4" component="div" sx={{ flexGrow: 2 }}>
                  ArtemisQL
                </Typography>
                <Button className="button" color="inherit">Docs</Button>
                <Button className="button" color="inherit">Github</Button>
                <Button className="button" color="inherit">Team</Button>
                <Button className="button" color="inherit">Playground</Button>
              </Toolbar>
            </AppBar>
          </Box>
          <br/>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} md={8}>
              <FlowComponent data={data} />
            </Grid>
            <Grid item xs={12} md={4}>
              <SchemaComponent schema={schemaType} resolvers={fakeResolver}/>
            </Grid>
          </Grid>
        </div>
    );
  } 

  return (
    // What are we going to render.
    <div style={ {display: 'flex', alignItems: 'center', height: '100%' }}>
      <Container maxWidth='sm'>
        <Grid container spacing={2} align="center" justify="center">
          <Grid item xs={12}>
            <TextField name="urlInput" onChange={(event) => onChangeHandler(event)} fullWidth variant="standard" label="Database URL" />
            {message}
          </Grid>
  
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => getDataFromDB(dataBaseUrl)} endIcon={<SendIcon/>}>Submit</Button>
          </Grid>
  
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => getSampleDB()} endIcon={<StorageIcon/>}>Demo Database</Button>
          </Grid>
    
        </Grid> 
      </Container>
    </div>
  );
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