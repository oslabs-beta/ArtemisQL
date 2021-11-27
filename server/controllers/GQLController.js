const GQLController = {};
const typeConverter = require('../converters/typeConverter');
const queryConverter = require('../converters/queryConverter');

/*
  desired output to client:
  type Vessel { 
    cost_in_credits: Float
    length: String
    vessel_type: String!
    model: String
    manufacturer: String
    name: String!
    vessel_class: String!
    max_atmosphering_speed: String
    crew: Int
    passengers: Int
    cargo_capacity: String
    consumables: String
    _id: Int!
  }
*/

// possibly defining the date type:
// const typeDefs = gql` // same for Date
//   scalar DateTime

//   type Query {
//     time: DateTime
//   }
// `;

// create GraphQL Schema (type defs)
GQLController.createSchemaTypeDefs = (req, res, next) => {
  console.log('createSchemaTypeDefs Triggered')
  const schema = {};
  const { cache } = res.locals;
  const { baseTables, joinTables } = typeConverter.sortTables(cache);
  
  const baseTableNames = Object.keys(baseTables);
  const joinTableNames = Object.keys(joinTables);
  res.locals.baseTableNames = baseTableNames;
  res.locals.joinTableNames = joinTableNames;

  // [people, films, species, vessels]
  for (const key of baseTableNames) {
    schema[key] = typeConverter.createInitialTypeDef(key);
  }

  console.log('after first for loop')

  for (const key of joinTableNames) {
    // schema from line 34 gets mutated every time we invoke typeConverter.finalizeTypeDef
    // because schema is being passed in by reference
    typeConverter.addForeignKeysToTypeDef(key, schema);
  }

  console.log('after second for loop')

  // console.log('SCHEMA AFTER JOINTABLE TYPEDEF CREATION', schema);
  // console.log('BASE TABLE', baseTables);
  const typeString = typeConverter.finalizeTypeDef(schema);
  // console.log('FINAL STRING IN MIDDLEWARE: ', finalString);

  console.log('after finalizeTypeDef')

  res.locals.schema = schema;
  res.locals.typeString = typeString;
  return next();
};

// create GraphQL Schema (queries)
GQLController.createSchemaQuery = (req, res, next) => {
  console.log('before tehe schema');
  const { schema, typeString } = res.locals;
  console.log('after the  schema');

  let queryString = `\ntype Query { \n`;
  // const tableNames = Object.keys(schema);
  for (const key in schema) {
    queryString += queryConverter.createQuerySchema(key);
  }

  console.log('after for loop');

  queryString += `}`
  
  // res.locals.queryString = queryString;
  res.locals.finalString = typeString + queryString;
  
  console.log('FINAL QUERY STRING', res.locals.finalString);
  return next();
}
// create GraphQL Schema (mutations)

// create GraphQL Resolvers

module.exports = GQLController;