import React, { useEffect, useState } from 'react';
import { Grid, Container, Button, TextField, Typography, Paper } from '@mui/material';
// import { SendIcon, StorageIcon } from '@mui/icons-material/';
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
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11} md={8}>
          <FlowComponent data={data} />
        </Grid>
        <Grid item xs={11} md={3}>
          <SchemaComponent schemaType={schemaType} />
        </Grid>
      </Grid>
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
            <Button fullWidth variant="contained" onClick={() => getDataFromDB(dataBaseUrl)} endIcon={<SendIcon/>}>Submit</Button>
          </Grid>
  
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => getSampleDB()} endIcon={<StorageIcon/>}>Demo Database</Button>
          </Grid>
    
        </Grid> 
      </Container>
    </div>
  );
}

export default MainContainer;