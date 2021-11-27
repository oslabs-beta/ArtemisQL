const express = require('express');
const SQLController = require('./controllers/SQLController');
const GQLController = require('./controllers/GQLController');

const router = express.Router();

router.get(
  '/submit',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  GQLController.createSchemaQuery,
  (req, res) => {
    // cache (for SQL visualizer)
    // finalString (GraphQL Schema)
    // TBD (GraphQL Resolver)
    return res.status(200).json(res.locals);
  },
);

module.exports = router;