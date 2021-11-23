const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // res.send('Hello World!!! ʕ·ᴥ·ʔ server.js update');
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});