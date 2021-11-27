const express = require('express');
const SQLController = require('./controllers/SQLController');
const GQLController = require('./controllers/GQLController');

const router = express.Router();

router.get(
  '/submit',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  (req, res) => {
    return res.status(200).json(res.locals.cache);
  },
);

module.exports = router;