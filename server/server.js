const express = require('express');
const path = require('path');
const Router = require('./router');

const PORT = 3000;
const app = express();

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// production build static serve
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

// route to router file
app.use('/', Router);

// catch-all route handler
app.use('*', (req, res) => res.status(400).send('This is not the page you\'re looking for...'));

// global error handler
app.use((err, req, res, next) => {
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
  console.log(`Server is listening on port ${PORT}... 🚀`);
});