const express = require('express');
const SQLController = require('./controllers/SQLController');

const router = express.Router();

router.get('/submit', SQLController.getTables, SQLController.formatQueryResult, (req, res) => {
  return res.status(200).json(res.locals.cache);
});

module.exports = router;