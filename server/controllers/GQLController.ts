import { Request, Response, NextFunction } from 'express';
import { GQLControllerType, MutationObjectType } from './controllerTypes';
import typeConverter from '../converters/typeConverter';
import queryConverter from '../converters/queryConverter';
import mutationConverter from '../converters/mutationConverter';
import resolvers from '../converters/resolvers';
const { capitalizeAndSingularize } = require('../utils/helperFunc');

// Create GraphQL Schema (Type Defs)
const createSchemaTypeDefs = (req: Request, res: Response, next: NextFunction) => {
  const schema = {};
  const bTables = {};
  const jTables = {};
  const { cache } = res.locals;
  // sort the tables
  const { baseTables, joinTables } = typeConverter.sortTables(cache, bTables, jTables);
  // exclude join table column information
  const baseTableQuery = typeConverter.createBaseTableQuery(baseTables);
  // store table names in separate arrays
  const baseTableNames = Object.keys(baseTables);
  const joinTableNames = Object.keys(joinTables);

  // store pertinent information in res.locals for later usage
  res.locals.baseTables = baseTables;
  res.locals.joinTables = joinTables;
  res.locals.baseTableNames = baseTableNames;
  res.locals.joinTableNames = joinTableNames;
  res.locals.baseTableQuery = baseTableQuery;

  // create the initial type defs for the schemas for base tables
  for (const key of baseTableNames) {
    schema[key] = typeConverter.createInitialTypeDef(key, baseTables, baseTableQuery);
  }

  // add foreign keys to the initial type def
  for (const key of joinTableNames) {
    // schema gets mutated here, so no need to return anything
    typeConverter.addForeignKeysToTypeDef(key, schema, joinTables);
  }

  // convert schema object to string for client
  const typeString = typeConverter.finalizeTypeDef(schema);

  res.locals.schema = schema;
  res.locals.typeString = typeString;
  return next();
};

// create GraphQL Schema (queries)
const createSchemaQuery = (req, res, next) => {
  const { schema, typeString } = res.locals;

  // create opening curly brace
  let queryString = `\ntype Query { \n`;
 
  for (const key in schema) {
    queryString += queryConverter.createQuerySchema(key);
  }

  // create the closing curly brace
  queryString += `}`;
  
  // append the query string with the type string
  res.locals.finalString = typeString + queryString;
  
  return next();
};

// create GraphQL Schema (mutations)
const createSchemaMutation = (req: Request, res: Response, next: NextFunction) => {
  const { baseTables } = res.locals;

  const mutationObj: MutationObjectType = {};
  
  // loop through base tables object
  for (const key in baseTables) {
    /// invoke add
    const [add, addMutations] = mutationConverter.add(key, baseTables[key]) as [string, object];
    mutationObj[add] = addMutations;
    
    // invoke update
    // 'as', guarantees that mutationConverter will return an array with first el as string and second el as object
    // ideally, need to create a type of function update that returns an array
    const [update, updateMutations] = mutationConverter
      .update(key, baseTables[key]) as [string, object];
    mutationObj[update] = updateMutations;

    // invoke delete
    const [del, deleteMutations] = mutationConverter
      .delete(key, baseTables[key]) as [string, object];
    mutationObj[del] = deleteMutations;
  }

  // format/stringify mutationObj
  const mutationString = mutationConverter.stringify(mutationObj);
  res.locals.mutationObj = mutationObj;
  res.locals.finalString += mutationString; 
  return next();
};

// create GraphQL Resolvers
const createResolver = (req: Request, res: Response, next: NextFunction) => {
  console.log('createResolver triggered');
  const { 
    baseTableNames,
    mutationObj,
    baseTableQuery,
    baseTables,
    joinTables,
  } = res.locals;

  // opening curly brace
  let resolverString = `const resolvers = { \n`;

  // QUERY portion of the resolver
  resolverString += `  Query: {`;
  for (const key of baseTableNames) {
    resolverString += resolvers.createQuery(key);
  }
  resolverString += `\n  },`;

  // MUTATION portion of the resolver
  resolverString += `

  Mutation: {`;

  const mutationTypes = Object.keys(mutationObj);

  for (const key of mutationTypes) {
    resolverString += resolvers.createMutation(key, mutationObj);
  }
  resolverString += `\n  },\n\n`;
  
  // RELATIONAL portion of the resolver  
  // loop through all base table names
  for (const key of baseTableNames) {
    // at each base table name
    resolverString += `  ${capitalizeAndSingularize(key)}: {`;
    // 1. check own table columns - append to string
    resolverString += resolvers.checkOwnTable(key, baseTables);
    // 2. check all base table cols - append to string
    resolverString += resolvers.checkBaseTableCols(key, baseTableQuery);
    // 3. check join tables and cols - append to string
    resolverString += resolvers.checkJoinTableCols(key, joinTables);
    // close current table bracket
    resolverString += `\n  },\n`;
  }
  
  // close resolver bracket
  resolverString += `}\n`;
  
  res.locals.resolverString = resolverString;
  return next();
};

const GQLController: GQLControllerType = { 
  createSchemaTypeDefs,
  createSchemaQuery,
  createSchemaMutation,
  createResolver,
};

export default GQLController;