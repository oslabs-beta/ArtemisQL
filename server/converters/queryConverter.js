const { singular } = require('pluralize');
const { convertDataType, checkNullable, capitalizeAndSingularize } = require('../utils/helperFunc.ts');

const queryConverter = {};
// QUERY TYPE FUNCTION
// input: baseTablesName
// output: nothing, mutate queryString 
//let queryString = `type Query { \n`; // put in controller
queryConverter.createQuerySchema = (tableName) => {
  // pluralize + camel case table name : [TableName] pascalize and singularlize
  // films: [Film]

  const temp = capitalizeAndSingularize(tableName);
  let camelCase = temp[0].toLowerCase();
  camelCase += temp.slice(1, temp.length);

  // camelcase + singuralize table name(_id without _: _id data type) : TableName
  // film(id: ID!): Film
  // starship_specs
  // starshipSpecs: [StarshipSpec]
  // starshipSpec(id: ID!): StarshipSpec
  const tableQuery = `  ${tableName}: [${temp}] \n  ${camelCase}(id: ID!): ${temp} \n`;

  // console.log('table query', tableQuery);
  return tableQuery;
}

`type Query {
  // pluralize + camel case table name : [TableName]
  films: [Film]
  // camelcase + singuralize table name(_id without _: _id data type) : TableName
  film(id: ID!): Film
  
  people: [Person]
  person(id: ID!): Person
  planets: [Planet]
  planet(id: ID!): Planet
  species: [Species]
  species(id: ID!): Species
  starshipSpecs: [StarshipSpec]
  starshipSpec(id: ID!): StarshipSpec
  vessels: [Vessel]
  vessel(id: ID!): Vessel
}`;

module.exports = queryConverter;