const { singular } = require('pluralize');

const queryConverter = {};
// QUERY TYPE FUNCTION
// input: baseTablesName
// output: nothing, mutate queryString 
//let queryString = `type Query { \n`; // put in controller
queryConverter.createQuerySchema = (tableName) => {
  // pluralize + camel case table name : [TableName] pascalize and singularlize
  // films: [Film]

  const splitString = tableName.split('_');
  let pascalize = splitString.map(ele => ele[0].toUpperCase() + ele.slice(1)).join(''); 

  const singularize = singular(pascalize);
  let camelCase = singularize[0].toLowerCase();
  camelCase += singularize.slice(1, singularize.length);

  // camelcase + singuralize table name(_id without _: _id data type) : TableName
  // film(id: ID!): Film
  // starship_specs
  // starshipSpecs: [StarshipSpec]
  // starshipSpec(id: ID!): StarshipSpec
  const tableQuery = 
    `  ${tableName}: [${singularize}] \n  ${camelCase}(id: ID!): ${singularize} \n`;

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

// SCHEMA
/*
{
  films: {
    _id: 'ID!',
    director: 'String!',
    episode_id: 'Int!',
    opening_crawl: 'String!',
    producer: 'String!',
    release_date: 'String!',
    title: 'String!',
    people: '[Person]',
    planets: '[Planet]',
    species: '[Species]',
    vessels: '[Vessel]'
  },
    starship_specs: {
    MGLT: 'String',
    _id: 'ID!',
    hyperdrive_rating: 'String',
    vessels: '[Vessel]'
  }
}
*/
// BASE TABLE
/* 
{
  films: [
    {
      column_name: '_id',
      table_name: 'films',
      data_type: 'integer',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: 'films_pk',
      constraint_type: 'PRIMARY KEY',
      foreign_table: null,
      foreign_column: null
    },
    starship_specs: [
    {
      column_name: 'MGLT',
      table_name: 'starship_specs',
      data_type: 'character varying',
      character_maximum_length: null,
      is_nullable: 'YES',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: '_id',
      table_name: 'starship_specs',
      data_type: 'integer',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: 'starship_specs_pk',
      constraint_type: 'PRIMARY KEY',
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: 'hyperdrive_rating',
      table_name: 'starship_specs',
      data_type: 'character varying',
      character_maximum_length: null,
      is_nullable: 'YES',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    }
  ]
}
*/

module.exports = queryConverter;