import express, { Application, Request, Response, NextFunction } from 'express';
import Router from './router';

const path = require('path');
// require('dotenv').config();

const PORT = 3000;
const app: Application = express();

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Router);

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/schema', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// catch-all route handler
app.use('*', (req: Request, res: Response) => res.status(400).send('This1 is not the page you\'re looking for...'));

// global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log(`⚡Server is listening on port ${PORT}... 🚀`);
});
