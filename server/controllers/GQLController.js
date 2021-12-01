const GQLController = {};
const typeConverter = require('../converters/typeConverter');
const queryConverter = require('../converters/queryConverter');
const mutationConverter = require('../converters/mutationConverter');

// Create GraphQL Schema (Type Defs)
GQLController.createSchemaTypeDefs = (req, res, next) => {
  console.log('createSchemaTypeDefs Triggered');
  const schema = {};
  const { cache } = res.locals;
  const { baseTables, joinTables } = typeConverter.sortTables(cache);
  
  const baseTableNames = Object.keys(baseTables);
  const joinTableNames = Object.keys(joinTables);
  res.locals.baseTables = baseTables;
  res.locals.baseTableNames = baseTableNames;
  res.locals.joinTableNames = joinTableNames;

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
GQLController.createSchemaQuery = (req, res, next) => {
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
GQLController.createSchemaMutation = (req, res, next) => {
  const { baseTables } = res.locals;

  const mutationObj = {};
  // loop through base tables object

  for (const key in baseTables) {
    /* -------------------------------------------------------------------------- */
    /*                                 invoke add                                 */
    /* -------------------------------------------------------------------------- */
    const [add, addMutations] = mutationConverter.add(key, baseTables[key]);
    mutationObj[add] = addMutations;
    
    /* -------------------------------------------------------------------------- */
    /*                                invoke update                               */
    /* -------------------------------------------------------------------------- */
    const [update, updateMutations] = mutationConverter.update(key, baseTables[key]);
    mutationObj[update] = updateMutations;


    /* -------------------------------------------------------------------------- */
    /*                                invoke delete                               */
    /* -------------------------------------------------------------------------- */
    const [del, deleteMutations] = mutationConverter.delete(key, baseTables[key]);
    mutationObj[del] = deleteMutations;
  }

  /* -------------------------------------------------------------------------- */
  /*                    format/stringify the mutation object                    */
  /* -------------------------------------------------------------------------- */
  // console.log('MUTATION OBJ OUTSIDE FOR LOOP', mutationObj);
  // append to mutation string
  const mutationString = mutationConverter.stringify(mutationObj);
  console.log('MUTATION STRING', mutationString);
  res.locals.finalString += mutationString; 
  return next();
};

// create GraphQL Resolvers

module.exports = GQLController;