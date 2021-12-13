import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StorageIcon from '@mui/icons-material/Storage';
import SendIcon from '@mui/icons-material/Send';
import FlowContainer from './Containers/FlowContainer';
import axios from 'axios';

type Request = {
  method: string;
  url: string;
  params?: object | null;
}

// CONDITIONALLY RENDERS: input page / dashboard container
const Dashboard = () => {
  const [data, setData] = useState({});
  const [schemaType, setSchemaType] = useState('');
  const [resolvers, setResolvers] = useState('');
  const [databaseURL, setDatabaseURL] = useState('');
  const [message, setMessage] = useState('');
  const [showSchema, setSchema] = useState(false);
  
  function onChangeHandler(input: any) {
    const { name, value } = input.currentTarget;
    if (name === 'urlInput') {
      setDatabaseURL(value);
    }
  }

  function getSampleDB() {
    const request: Request = {
      method: 'GET',
      url: '/submit',
    };
   
    axios.request(request)
      .then((res) => {
        if (res.status = 200) {
          setData(res.data.allTables);
          setSchemaType(res.data.finalString);
          setResolvers(res.data.resolverString);
          setSchema(true);
        }
      })
      .catch(console.error);
  }

  function getDataFromDB(dbLink: string) {
    if (!dbLink) {
      setMessage('Invalid URI, please try again');
      return;
    }
    
    const request: Request = {
      method: 'GET',
      url: '/submit',
      params: { dbLink },
    };
   
    axios.request(request)
      .then((res) => {
        if (res.status = 200) {
          setData(res.data.allTables);
          setSchemaType(res.data.finalString);
          setResolvers(res.data.resolverString);
          setSchema(true);
        }
      })
      .catch((err) => {
        setMessage('Invalid URI, please try again');
      });
  }

  if (showSchema) {
    return (
      <FlowContainer data={data} schema={schemaType} resolvers={resolvers} />
    );
  } 

  return (
      <div style={divStyle}>
        <Container maxWidth='sm' style={containerStyle}>
          <Grid container spacing={2} align="center" justify="center">
            
            <Grid item xs={12}>
              <TextField name="urlInput" onChange={(input) => onChangeHandler(input)} fullWidth variant="standard" label="Database URL" />
              {message}
            </Grid>
    
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" style={buttonStyle} onClick={() => getDataFromDB(databaseURL)} endIcon={<SendIcon/>}>Submit</Button>
            </Grid>
    
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" style={buttonStyle} onClick={() => getSampleDB()} endIcon={<StorageIcon/>}>Demo Database</Button>
            </Grid>
      
          </Grid> 
      </Container>
    </div>
    
  );
}

// COMPONENT STYLING

const divStyle = {
  display: 'flex', 
  alignItems: 'center', 
  height: '85%' 
}

const containerStyle = {
  border: '1px solid #403D39', 
  borderRadius: '5px', 
  boxShadow: '3px 3px #888888', 
  height: '160px', 
  paddingTop: '20px'
}

const buttonStyle = {
  fontWeight: 'normal'
}

export default Dashboard;