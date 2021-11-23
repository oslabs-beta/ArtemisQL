const express = require('express');
const app = express();
const path = require('path');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!!! ʕ·ᴥ·ʔ server.js update')
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});