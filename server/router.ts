import express, { Request, Response } from 'express';
import SQLController from './controllers/SQLController';
import GQLController from './controllers/GQLController';

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

export default router;