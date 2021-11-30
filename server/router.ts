import express, { Request, Response } from 'express';

const SQLController = require('./controllers/SQLController');
const GQLController = require('./controllers/GQLController');

const router = express.Router();

router.get(
  '/submit',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  GQLController.createSchemaQuery,
  GQLController.createSchemaMutation,
  (req: Request, res: Response) => {
    // cache (for SQL visualizer)
    // finalString (GraphQL Schema)
    // TBD (GraphQL Resolver)
    return res.status(200).json(res.locals);
  },
);

// module.exports = router;
export default router;