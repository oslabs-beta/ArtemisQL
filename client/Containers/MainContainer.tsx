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
import NavComponent from '../Components/NavComponent'
import axios from 'axios';
import logo from '/Users/johnbryan/codesmith/ArtemisQL/client/assets/ArtemisQL.png'



function MainContainer() {
  const [data, setData] = useState({});
  const [schemaType, setSchemaType] = useState();
  const [resolvers, setResolvers] = useState();
  const [dataBaseUrl, setDataBaseUrl] = useState('');
  const [message, setMessage] = useState('');
  // conditional rendering
  // create state called showSchema and set it to false;
  const [showSchema, setSchema] = useState(false);
  
  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;

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
          setResolvers(res.data.resolverString);
          setSchema(true);
        }
      })
      .catch(console.error);
  }

  function getDataFromDB(dbLink) {
    if (!dbLink) {
      setMessage('Invalid URI, please try again');
      return;
    }
    
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
      <FlowComponent data={data} schema={schemaType} resolvers={resolvers} />
    );
  } 

  return (
      <div style={ {display: 'flex', alignItems: 'center', height: '85%' }}>
        <Container maxWidth='sm' style={{border: '1px solid #403D39', borderRadius: '5px', boxShadow: '3px 3px #888888', height: '160px', paddingTop: '20px'}}>
          <Grid container spacing={2} align="center" justify="center">

            <Grid item xs={12}>
              <TextField name="urlInput" onChange={(event) => onChangeHandler(event)} fullWidth variant="standard" label="Database URL" />
              {message}
            </Grid>
    
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" style={buttonStyles} onClick={() => getDataFromDB(dataBaseUrl)} endIcon={<SendIcon/>}>Submit</Button>
            </Grid>
    
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" style={buttonStyles} onClick={() => getSampleDB()} endIcon={<StorageIcon/>}>Demo Database</Button>
            </Grid>
      
          </Grid> 
      </Container>
    </div>
    
  );
}

const buttonStyles = {
  fontWeight: 'normal'
}
export default MainContainer;