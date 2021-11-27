const GQLController = {};
const typeConverter = require('../converters/typeConverter');

/* Creating types
  type Film { 
    director: String!
    opening_crawl: String!
    episode_id: Int!
    _id: Int!
    title: String!
    release_date: Int!
    producer: String!
    people: [Person] // people can have many person, so person is a type where its pk is used?
    planets: [Planet] // planets can have many person, so Planet is a type where its pk is used?
    species: [Species] // species can have many person, so Species is a type where its pk is used?
    vessels: [Vessel] // vessels can have many person, so Vessel is a type where its pk is used?
  }
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
    people: [Person]
    films: [Film]
  }
  
    type Person { 
    gender: String
    species_id: Float
    homeworld_id: Float
    height: Int
    _id: Int!
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    name: String!
    birth_year: String
    species: [Species]
    planets: [Planet]
    films: [Film]
    vessels: [Vessel]
  }
*/
// list of helper function (export/import it to/from a different file)

// input: column's data_type
// output: string (GraphQL Data type)
function convertDataType(type) {
  switch (type) {
    case 'character varying': return 'String';
    case 'character': return 'String';
    case 'date': return 'String';
    case 'boolean': return 'Boolean';
    case 'integer': return 'Int';
    case 'numeric': return 'Int';
    case 'ARRAY': return '[String]';
    case 'smallint': return 'Int';
    case 'bigint': return 'Float';
    // case 'date': return 'Int';
    default: // run a different function?';
  }
}

// input: column's is_nullable
// output: string (! or empty string)
function checkNullable(isNullable) {
  if (isNullable === 'YES') {
    return '!';
  }
  return '';
}

// const { cache } = res.locals;
// // input: table name
// // output: boolean (TRUE if table is join table)
// function checkIfJoinTable(tableName) {
//   // initialize counter of foreign keys
//   let fKCounter = 0;
//   // loop through array
//   for (let i = 0; i < cache[tableName].length; i += 1) {
//     // at each element, check if current element's constraint_type is FOREIGN KEY
//     if (cache[tableName][i]['constraint_type'] === 'FOREIGN KEY') {
//       // if so, increment counter by 1
//       fKCounter += 1;
//     }

//     // compare number of foreign keys (counter) with length of array
//     // if number of foreign keys is one less than the length of the array
//     if (cache[tableName].length - 1 === fKCounter)
//       // then return true
//   }
// }


/*

iterate through the formatted data via key (table name)
  if checkifJoinTable is false - add to BaseTableObject
  if checkifJoinTable is true - add to JoinTableObject
loop through BaseTableObject
  for each table, loop through all columns
    for each column, convertDataType and checkNullable
  
  desired output:
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

loop through JoinTableObject
  for each table, get the foreign keys (constraight_type = "FOREIGN KEY")
  get 2 foreign_tables [a, b]
  iterate to first foreign_table (a)'s typdef and append 'b: [b]' to typedef
  iterate to second foreign_table  (b)'s typedef and append 'a: [a]' to typedef
*/

// possibly defining the date type:
// const typeDefs = gql` // same for Date
//   scalar DateTime

//   type Query {
//     time: DateTime
//   }
// `;

// Use data from res.locals.queryTables ?

// create GraphQL Schema (type defs)
GQLController.createSchemaTypeDefs = (req, res, next) => {
  const schema = {};
  // res.locals.cache
  const { cache } = res.locals;
  
  const { baseTables, joinTables } = typeConverter.sortTables(cache);
  
  const baseTableNames = Object.keys(baseTables);
  // const joinTableNames = Object.keys(joinTables);
  // [people, films, species, vessels]
  for (const key of baseTableNames) {
    schema[key] = typeConverter.createInitialTypeDef(key);
  }
  console.log('SCHEMA AFTER BASETABLE TYPEDEF CREATION', schema);

  // for (const key of joinTableNames) {
  //   schema[key] = typeConverter.finalizeTypeDef(key);
  // }
  // console.log('SCHEMA AFTER JOINTABLE TYPEDEF CREATION', schema);

  return next();
};

// create GraphQL Schema (queries)
// create GraphQL Schema (mutations)

// create GraphQL Resolvers

module.exports = GQLController;