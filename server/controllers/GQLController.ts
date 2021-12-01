import { Request, Response, NextFunction } from 'express';
import { GQLControllerType, MutationObjectType } from './controllerTypes';

// const typeConverter = require('../converters/typeConverter');
// const queryConverter = require('../converters/queryConverter');
// const mutationConverter = require('../converters/mutationConverter');
import typeConverter from '../converters/typeConverter';
import queryConverter from '../converters/queryConverter';
import mutationConverter from '../converters/mutationConverter';
import resolvers from '../converters/resolvers';

// Create GraphQL Schema (Type Defs)
const createSchemaTypeDefs = (req: Request, res: Response, next: NextFunction) => {
  console.log('createSchemaTypeDefs Triggered');
  const schema = {};
  const { cache } = res.locals;
  const { baseTables, joinTables } = typeConverter.sortTables(cache);
  
  const baseTableNames = Object.keys(baseTables);
  const joinTableNames = Object.keys(joinTables);
  res.locals.baseTables = baseTables;
  res.locals.baseTableNames = baseTableNames;
  res.locals.joinTableNames = joinTableNames;
  console.log('baseTables', baseTables);
  // [people, films, species, vessels]
  for (const key of baseTableNames) {
    schema[key] = typeConverter.createInitialTypeDef(key);
  }

  for (const key of joinTableNames) {
    // schema from line 34 gets mutated every time we invoke typeConverter.finalizeTypeDef
    // because schema is being passed in by reference
    typeConverter.addForeignKeysToTypeDef(key, schema);
  }

  const typeString = typeConverter.finalizeTypeDef(schema);

  res.locals.schema = schema;
  res.locals.typeString = typeString;
  return next();
};

// create GraphQL Schema (queries)
const createSchemaQuery = (req, res, next) => {
  const { schema, typeString } = res.locals;

  let queryString = `\ntype Query { \n`;
 
  for (const key in schema) {
    queryString += queryConverter.createQuerySchema(key);
  }

  queryString += `}`;
  
  res.locals.finalString = typeString + queryString;
  
  return next();
};

// create GraphQL Schema (mutations)
const createSchemaMutation = (req: Request, res: Response, next: NextFunction) => {
  const { baseTables } = res.locals;

  const mutationObj: MutationObjectType = {};
  // loop through base tables object

  for (const key in baseTables) {
    /* -------------------------------------------------------------------------- */
    /*                                 invoke add                                 */
    /* -------------------------------------------------------------------------- */
    const [add, addMutations] = mutationConverter.add(key, baseTables[key]) as [string, object];
    mutationObj[add] = addMutations;
    
    /* -------------------------------------------------------------------------- */
    /*                                invoke update                               */
    /* -------------------------------------------------------------------------- */
    // stopgap: 'as', guarantees that mutationConverter will return an array with first el as string and second el as object
    // ideally, need to create a type of function update that returns an array
    const [update, updateMutations] = mutationConverter.update(key, baseTables[key]) as [string, object];
    mutationObj[update] = updateMutations;

    /* -------------------------------------------------------------------------- */
    /*                                invoke delete                               */
    /* -------------------------------------------------------------------------- */
    const [del, deleteMutations] = mutationConverter.delete(key, baseTables[key]) as [string, object];
    mutationObj[del] = deleteMutations;
  }

  /* -------------------------------------------------------------------------- */
  /*                    format/stringify the mutation object                    */
  /* -------------------------------------------------------------------------- */
  // console.log('MUTATION OBJ OUTSIDE FOR LOOP', mutationObj);
  // append to mutation string
  const mutationString = mutationConverter.stringify(mutationObj);
  // console.log('MUTATION STRING', mutationString);
  res.locals.mutationObj = mutationObj;
  res.locals.finalString += mutationString; 
  return next();
};

// create GraphQL Resolvers
const createResolver = (req: Request, res: Response, next: NextFunction) => {
  console.log('createResolver triggered');
  const { baseTableNames, finalString, mutationObj } = res.locals;
  let resolverString = `const resolvers = { \n`;

  // QUERY
  resolverString += `  Query: {`;
  for (const key of baseTableNames) {
    resolverString += resolvers.createQuery(key);
  }
  // console.log('RESOLVER STRING AFTER QUERY LOOP', resolverString);
  resolverString += `\n  },`;

  // MUTATION
  resolverString += `

  Mutation: {`;

  console.log('mutationObj', mutationObj);
  const mutationTypes = Object.keys(mutationObj);

  for (const key of mutationTypes) {
    resolverString += resolvers.createMutation(key);
  }
  resolverString += `\n  },`;
  // console.log('resolverString AFTER MUTATION LOOP', resolverString);
  
  // RELATIONSHIPS
  
  res.locals.finalString = finalString + resolverString;
  return next();
};

const GQLController: GQLControllerType = { 
  createSchemaTypeDefs,
  createSchemaQuery,
  createSchemaMutation,
  createResolver,
};
export default GQLController;
// module.exports = GQLController;