const express = require('express');

const router = express.Router();

router.post('/submit', (req, res) => {
  return res.status(200).send('response');
});

module.exports = router;