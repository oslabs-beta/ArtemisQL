const GQLController = {};
const typeConverter = require('../converters/typeConverter');

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
  const schema = {};
  const { cache } = res.locals;
  
  const { baseTables, joinTables } = typeConverter.sortTables(cache);
  
  const baseTableNames = Object.keys(baseTables);
  const joinTableNames = Object.keys(joinTables);
  
  // [people, films, species, vessels]
  for (const key of baseTableNames) {
    schema[key] = typeConverter.createInitialTypeDef(key);
  }
  console.log('SCHEMA AFTER BASETABLE TYPEDEF CREATION', schema);

  for (const key of joinTableNames) {
    // schema from line 34 gets mutated every time we invoke typeConverter.finalizeTypeDef
    // because schema is being passed in by reference
    typeConverter.addForeignKeysToTypeDef(key, schema);
  }


  console.log('SCHEMA AFTER JOINTABLE TYPEDEF CREATION', schema);
  const finalString = typeConverter.finalizeTypeDef(schema);
  console.log('FINAL STRING IN MIDDLEWARE: ', finalString);

  res.locals.finalString = finalString;
  
  return next();
};

// create GraphQL Schema (queries)
// create GraphQL Schema (mutations)

// create GraphQL Resolvers

module.exports = GQLController;