const { singular } = require('pluralize');

// GRAPHQL TYPE CONVERSION FUNCTIONS
const typeConverter = {};
// SEPARATE JOIN FROM "BASE" TABLES
// count all keys in table, count all foreign keys
// input: table name
// output: boolean (TRUE if table is join table)
const checkIfJoinTable = (cache, tableName) => {
  // initialize counter of foreign keys
  let fKCounter = 0;
  // loop through array
  for (let i = 0; i < cache[tableName].length; i += 1) {
    // console.log('cache[tableName][i]', cache[tableName][i]);
    // at each element, check if current element's constraint_type is FOREIGN KEY
    if (cache[tableName][i].constraint_type === 'FOREIGN KEY') {
      // if so, increment counter by 1
      fKCounter += 1;
    }
  }
  // compare number of foreign keys (counter) with length of array
  // if number of foreign keys is one less than the length of the array
  if (cache[tableName].length - 1 === fKCounter) {
    // then return true
    return true;
  }
  return false;
};

// input: res.locals.cache
// output: nothing (mutating 2 objects - baseTables and junctionTable in outer scope)

const joinTables = {};
const baseTables = {};
typeConverter.sortTables = (cache) => {
  // const joinTables = {};
  // const baseTables = {};
  
  for (const key in cache) {
    console.log('key in cache', key);
    if (checkIfJoinTable(cache, key)) joinTables[key] = cache[key];
    else baseTables[key] = cache[key]; 
  }

  return { baseTables, joinTables };
};

// ITERATE THROUGH BASE TABLES, CONVERT TYPES (CB), CHECK FOR NULLABLES (CB) AND CREATE TYPE OBJECT
// input: column's data_type
// output: string (GraphQL Data type)
function convertDataType(type, columnName) {
  if (columnName === '_id') return 'ID';
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
function checkNullable(isNullable) {
  if (isNullable === 'NO') {
    return '!';
  }
  return '';
}

// input: base table name, join table name
// output: type def object (to add as properties in schema object)
typeConverter.createInitialTypeDef = (baseTableName) => {
  const TYPE = {};
  //   TYPE[baseTableName] = {};
  // iterate through array of objects/columns
  for (let i = 0; i < baseTables[baseTableName].length; i += 1) {
    const column = baseTables[baseTableName][i];
    // if its a foreign key, singularize the foreign table as the value
    // foreign table : [singularize the foreign table and make PascalCase]
    if (column.constraint_type === 'FOREIGN KEY') {
      const key = column.foreign_table;
      // singularize the value
      const singularize = singular(key);
      // capitalize the first letter 
      let pascalize = singularize[0].toUpperCase();
      pascalize += singularize.slice(1, singularize.length);
      // add to schema object
      TYPE[key] = `[${pascalize}]`;
    } else {
      // at each column, convert data type, then check for nullables
      let type = convertDataType(column.data_type, column.column_name);
      type += checkNullable(column.is_nullable);
      // add to schema object
      TYPE[column.column_name] = type;
    }
  }
  
  // console.log('schema', TYPE);
  return TYPE; 
};

// ITERATE THROUGH JOIN TABLES AND APPEND FOREIGN_TABLES TO TYPE OBJECT

//   loop through JoinTableObject
//   for each table, get the foreign keys (constraight_type = "FOREIGN KEY")
//   get 2 foreign_tables [a, b]
//   get first foreign_table (a)'s typdef and append 'b: [b]' to typedef
//   get second foreign_table  (b)'s typedef and append 'a: [a]' to typedef

// input: join table name
// output: nothing - mutate schema object

// junction tables in SQL contains the primary key columns of TWO tables you want to relate
// https://docs.microsoft.com/en-us/sql/ssms/visual-db-tools/map-many-to-many-relationships-visual-database-tools?view=sql-server-ver15
typeConverter.addForeignKeysToTypeDef = (joinTableName, schema) => {
  // iterate through array (ex. vessels_in_films)
  const foreignKeys = [];
  for (let i = 0; i < joinTables[joinTableName].length; i += 1) {
    const column = joinTables[joinTableName][i];
    // get both foreign keys (using constraint_type) and push foreign_table to an array 
    // (ex. ['films', 'vessels'])
    if (column.constraint_type === 'FOREIGN KEY') {
      foreignKeys.push(column.foreign_table);
    }
  }
  // console.log('foreignKeys', foreignKeys);
  // get first foreign key (array[0]) (ex. films)
  // go to base table object referenced in second foreign key (array[1]) (ex. vessels)
  // add property to vessels base table with information from first fK 
  
  if (schema[foreignKeys[0]]) { // films 
    // singularize the value
    const singularize = singular(foreignKeys[1]);
    // capitalize the first letter 
    let pascalize = singularize[0].toUpperCase();
    pascalize += singularize.slice(1, singularize.length);  
    // films -> { vessels: [Vessel] }
    schema[foreignKeys[0]][foreignKeys[1]] = `[${pascalize}]`;
  }  

  if (schema[foreignKeys[1]]) { // vessels  
    // singularize the value
    const singularize = singular(foreignKeys[0]);
    // capitalize the first letter 
    let pascalize = singularize[0].toUpperCase();
    pascalize += singularize.slice(1, singularize.length);  
    // vessels -> { films: [Film] }
    schema[foreignKeys[1]][foreignKeys[0]] = `[${pascalize}]`;
  }
  // return schema;
};

// input: schema object
// output: string -> formatted type def for client
typeConverter.finalizeTypeDef = (schema) => {
  let finalString = '';
  // update table name to be singular and capitalized
  for (let key in schema) {
    const singularize = singular(key);
    // capitalize the first letter 
    let pascalize = key[0].toUpperCase();
    pascalize += singularize.slice(1, singularize.length);
    // Do we need to update the schema?
    const typeKey = `type ${pascalize}`;
    // schema[typeKey] = schema[key];
    finalString += `\n${typeKey} {\n`;
    // console.log('finalString', finalString);
    // looping through schema[key]
    const table = schema[key];
    
    for (const column in table) {
    // 2 spaces + '_id: ID!' + line break
      const newColumn = `  ${column}: ${table[column]}\n`;
      //   console.log('newColumn', newColumn);
      // append to finalString
      finalString += newColumn;
    }
    finalString += '} \n';
  }
  // stringify schema
  // replace commas, inner quotes, colons after typeDef
  return finalString;
};

/* SCHEMA
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
    people: {
      _id: 'ID!',
      birth_year: 'String',
      eye_color: 'String',
      gender: 'String',
      hair_color: 'String',
      height: 'Int',
      planets: '[Planet]',
      mass: 'String',
      name: 'String!',
      skin_color: 'String',
      species: '[Species]',
      films: '[Film]',
      vessels: '[Vessel]'
    },
    planets: {
      _id: 'ID!',
      climate: 'String',
      diameter: 'Int',
      gravity: 'String',
      name: 'String',
      orbital_period: 'Int',
      population: 'Float',
      rotation_period: 'Int',
      surface_water: 'String',
      terrain: 'String',
      films: '[Film]'
    },
    species: {
      _id: 'ID!',
      average_height: 'String',
      average_lifespan: 'String',
      classification: 'String',
      eye_colors: 'String',
      hair_colors: 'String',
      planets: '[Planet]',
      language: 'String',
      name: 'String!',
      skin_colors: 'String',
      films: '[Film]'
    },
    starship_specs: {
      MGLT: 'String',
      _id: 'ID!',
      hyperdrive_rating: 'String',
      vessels: '[Vessel]'
    },
    vessels: {
      _id: 'ID!',
      cargo_capacity: 'String',
      consumables: 'String',
      cost_in_credits: 'Float',
      crew: 'Int',
      length: 'String',
      manufacturer: 'String',
      max_atmosphering_speed: 'String',
      model: 'String',
      name: 'String!',
      passengers: 'Int',
      vessel_class: 'String!',
      vessel_type: 'String!',
      people: '[Person]',
      films: '[Film]'
    }
  }

*/
module.exports = typeConverter;
