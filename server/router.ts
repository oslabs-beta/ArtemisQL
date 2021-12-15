import express, { Request, Response } from 'express';
import SQLController from './controllers/SQLController';
import GQLController from './controllers/GQLController';
import schema from './schema';

const router = express.Router();
const { graphqlHTTP } = require('express-graphql');

// const schema = require('./schema.ts');

router.get(
  '/submit',
  SQLController.getAllMetadata,
  SQLController.formatQueryResult,
  GQLController.createSchemaTypeDefs,
  GQLController.createSchemaQuery,
  GQLController.createSchemaMutation,
  GQLController.createResolver,
  (req: Request, res: Response) => {
    // allTables (for SQL visualizer)
    // finalString (GraphQL Schema)
    // resolverString (GraphQL Resolver)
    console.log('sent all info to client');
    return res.status(200).json(res.locals);
  },
);
// format finalString to code

// const schema = makeExecutableSchema({
//   res.locals.finalString
//   // allowUndefinedInResolve: false,
//   // resolverValidationOptions: {
//   //   // requireResolversForArgs: 'error',
//   //   // requireResolversForAllFields: 'warn',
//   // },
// });

const queryString = `
# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# Here's an example query to get started:
#
# To get a list of all PEOPLE by name and gender, use the following QUERY:
#
# { 
#  people {
#    name
#    gender
#   }
# }
#
# To add a person to the database, use the following MUTATION:
#
# mutation {
#    addPerson(gender: "Male", name: "John", species_id: 11){
#       name
#       gender
#       species {
#           name
#       }
#    }
# }
`;

router.use(
  '/sandbox',
  graphqlHTTP({
    // schema (types of queries, mutations, types) + resolvers
    schema,
    graphiql: {
      editorTheme: 'solarized light',
      defaultQuery: queryString,
    },
  }),
);

export default router;