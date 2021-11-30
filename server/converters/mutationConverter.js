const { singular } = require('pluralize');
const { convertDataType } = require('./typeConverter');

const mutationConverter = {};
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

/*
BASE TABLES: {
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
    {
      column_name: 'director',
      table_name: 'films',
      data_type: 'character varying',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: 'episode_id',
      table_name: 'films',
      data_type: 'integer',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: 'opening_crawl',
      table_name: 'films',
      data_type: 'character varying',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: 'producer',
      table_name: 'films',
      data_type: 'character varying',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: 'release_date',
      table_name: 'films',
      data_type: 'date',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    },
    {
      column_name: 'title',
      table_name: 'films',
      data_type: 'character varying',
      character_maximum_length: null,
      is_nullable: 'NO',
      constraint_name: null,
      constraint_type: null,
      foreign_table: null,
      foreign_column: null
    }
  ],
  starship_specs: [

  ]
*/
/*
type Mutation 

{
  addFilm(
    director: String!,
    opening_crawl: String!,
    episode_id: Int!,
    title: String!,
    release_date: String!,
    producer: String!,
  ): Film!

  updateFilm(
    director: String,
    opening_crawl: String,
    episode_id: Int,
    _id: ID!,
    title: String,
    release_date: String,
    producer: String,
  ): Film!

  deleteFilm(_id: ID!): Film!

*/
// input: column's data_type, columnName
// output: string (GraphQL Data type)
function convertDataTypeMutation(type, columnName) {
  if (columnName === '_id') return 'ID!';
  if (columnName.includes('_id')) return 'Int';
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
    default: return 'switch case error';
  }
}

// input: column's is_nullable
// output: string (! or empty string)
function checkNullableMutationAdd(isNullable) {
  if (isNullable === 'NO') {
    return '!';
  }
  return '';
}

// input: column's data_type
// output: string (GraphQL Data type)
// function convertDataTypeMutationUpdate(type, columnName) {
//   if (columnName === '_id') return 'ID!';
//   switch (type) {
//     case 'character varying': return 'String';
//     case 'character': return 'String';
//     case 'date': return 'String';
//     case 'boolean': return 'Boolean';
//     case 'integer': return 'Int';
//     case 'numeric': return 'Int';
//     case 'ARRAY': return '[String]';
//     case 'smallint': return 'Int';
//     case 'bigint': return 'Float';
//     // case 'date': return 'Int';
//     default: return 'switch case error';
//   }
// }

// input: baseTableName
// output: single mutation object (to add as properties in mutation object)



  /* -------------------------------------------------------------------------- */
  /*                                     Add                                    */
  /* -------------------------------------------------------------------------- */
 

  // const TYPE = {};
  // //   TYPE[baseTableName] = {};
  // // iterate through array of objects/columns
  // for (let i = 0; i < baseTables[baseTableName].length; i += 1) {
  //   const column = baseTables[baseTableName][i];
  //   // if its a foreign key, singularize the foreign table as the value
  //   // foreign table : [singularize the foreign table and make PascalCase]
  //   if (column.constraint_type === 'FOREIGN KEY') {
  //     const key = column.foreign_table;
  //     // singularize the value
  //     const singularize = singular(key);
  //     // capitalize the first letter 
  //     let pascalize = singularize[0].toUpperCase();
  //     pascalize += singularize.slice(1, singularize.length);
  //     // add to schema object
  //     TYPE[key] = `[${pascalize}]`;
  //   } else {
  //     // at each column, convert data type, then check for nullables
  //     let type = convertDataType(column.data_type, column.column_name);
  //     type += checkNullable(column.is_nullable);
  //     // add to schema object
  //     TYPE[column.column_name] = type;
  //   }
  // }
  
  // // console.log('schema', TYPE);
  // return TYPE; 

/* ideal mutation object in GQL Controller:
{
  addFilm: {
    director: 'String!',
    opening_crawl: String!,
    ...
  },
  updateFilm: {
    _id: 'ID!',
    ...
  },
  deleteFilm: {
    _id: 'ID!'
  },
  addPlanet: {

  },
  updatePlanet: {

  },
}
*/
// input: baseTableName
// output: single mutation object (to add as properties in mutation object)
mutationConverter.add = (tableName, arrOfColumns) => {

  let addKey = '';
  const addObj = {};

  // iterate through array of columns
  for (const column of arrOfColumns) {
    if (column.column_name !== '_id') {
      // for each column, invoke convertDataTypeMutationAdd, and then invoke checkNullableMutationAdd
      let type = convertDataTypeMutation(column.data_type, column.column_name);
      type += checkNullableMutationAdd(column.is_nullable);
      // for each column, then push into addObj (key: )
      addObj[column.column_name] = type;
    }
  }



  // convert addKey from baseTableName = films to addFilm
  const split = tableName.split('_');
  const pascalize = split.map((ele) => ele[0].toUpperCase() + ele.slice(1)).join(''); 
  const singularize = singular(pascalize);
  
  addKey = `add${singularize}`;
  const outputArr = [addKey, addObj];
  return outputArr;
};

// mutationConverter.update = (tableName) => {
  // const updateObj = {};
  
// }

// mutationConverter.delete = (tableName) => {

// }


module.exports = mutationConverter;