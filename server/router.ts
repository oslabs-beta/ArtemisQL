import express, { Request, Response } from 'express';
import SQLController from './controllers/SQLController';
import GQLController from './controllers/GQLController';

const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

router.get(
  '/submit',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  GQLController.createSchemaQuery,
  GQLController.createSchemaMutation,
  GQLController.createResolver,
  (req: Request, res: Response) => {
    // cache (for SQL visualizer)
    // finalString (GraphQL Schema)
    // resolverString (GraphQL Resolver)
    return res.status(200).json(res.locals);
  },
);

router.use(
  '/sandbox',
  graphqlHTTP({
    // schema (types of queries, mutations, types) + resolvers
    schema,
    graphiql: {
      editorTheme: 'solarized light',
      defaultQuery: '# Welcome to our GraphiQL server! Please type your commands here'
    },
  }),
);

export default router;