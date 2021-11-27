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
  // console.log('joinTables', joinTables);
  // console.log('baseTables', baseTables);
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
// ideal type:
/*
{
  species: {
    _id: 'ID!',
    name: 'String!',
    classification: 'String',
    average_height: 'String',
    average_lifespan: 'String',
    hair_colors: 'String',
    skin_colors: 'String',
    eye_colors: 'String',
    language: 'String',
    planets: '[Planet]',
    films: '[Film]',
  },
  vessels: {
    _id: 'ID!',
    name: 'String!',
    manufacturer: 'String',
    model: 'String',
    vessel_type: 'String!',
    vessel_class: 'String!',
    cost_in_credits: 'ID',
    length: 'String',
    max_atmosphering_speed: 'String',
    crew: 'Int',
    passengers: 'Int',
    cargo_capacity: 'String',
    consumables: 'String',
    people: '[Person]',
    films: '[Film]',
  },
    people: {
    _id: 'ID!',
    name: 'String!',
    mass: 'String',
    hair_color: 'String',
    skin_color: 'String',
    eye_color: 'String',
    birth_year: 'String',
    gender: 'String',
    species: '[Species]',
    planets: '[Planet]',
    height: 'Int',
    films: '[Film]',
    vessels: '[Vessel]',
  },
}
*/

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
//   iterate to first foreign_table (a)'s typdef and append 'b: [b]' to typedef
//   iterate to second foreign_table  (b)'s typedef and append 'a: [a]' to typedef

// input: join table name
// output: nothing - update schema object
/*
  { 
    Species in films
     film : species
     species: films
     
    people in films 
     film : people
     people: films
    
    planets in films
     film : planets
     planets : film 
    
    vessels in films
     vessel : film
     film : vessel
    
    pilots
     person : vessel
     vessel : person
   }
*/
// junction tables in SQL contains the primary key columns of TWO tables you want to relate
// https://docs.microsoft.com/en-us/sql/ssms/visual-db-tools/map-many-to-many-relationships-visual-database-tools?view=sql-server-ver15
typeConverter.finalizeTypeDef = (joinTableName, schema) => {
  // iterate through array (ex. vessels_in_films)
  for (let i = 0; i < joinTables[joinTableName].length; i += 1) {
    const column = joinTables[joinTableName][i];
    const foreignKeys = [];
    // get both foreign keys (using constraint_type) and push foreign_table to an array 
    // (ex. ['films', 'vessels'])
    if (column.constraint_type === 'FOREIGN KEY') {
      foreignKeys.push(column.foreign_table);
    }
    // get first foreign key (array[0]) (ex. films)
    // go to base table object referenced in second foreign key (array[1]) (ex. vessels)
    // add property to vessels base table with information from first fK 
    if (schema[foreignKeys[0]]) { // films  
      // singularize the value
      const singularize = singular(foreignKeys[0]);
      // capitalize the first letter 
      let pascalize = singularize[1].toUpperCase();
      pascalize += singularize.slice(1, singularize.length);  
      // vessels -> { films: [Film] }
      schema[foreignKeys[0]][foreignKeys[1]] = `[${pascalize}]`;
    }  
    if (schema[foreignKeys[1]]) { // vessels  
      // singularize the value
      const singularize = singular(foreignKeys[1]);
      // capitalize the first letter 
      let pascalize = singularize[0].toUpperCase();
      pascalize += singularize.slice(1, singularize.length);  
      // films -> { vessels: [Vessel] }
      schema[foreignKeys[1]][foreignKeys[0]] = `[${pascalize}]`;
    }
  }
  return schema;
};

module.exports = typeConverter;
// SQL QUERY DATA
/*
{
  "films": [
      {
          "column_name": "_id",
          "table_name": "films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "director",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "episode_id",
          "table_name": "films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "opening_crawl",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "producer",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "release_date",
          "table_name": "films",
          "data_type": "date",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "title",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "people": [
      {
          "column_name": "_id",
          "table_name": "people",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "birth_year",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "eye_color",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "gender",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "hair_color",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "height",
          "table_name": "people",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "homeworld_id",
          "table_name": "people",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": "people_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "planets",
          "foreign_column": "_id"
      },
      {
          "column_name": "mass",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "skin_color",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "species_id",
          "table_name": "people",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": "people_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "species",
          "foreign_column": "_id"
      }
  ],
  "people_in_films": [
      {
          "column_name": "_id",
          "table_name": "people_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "people_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "person_id",
          "table_name": "people_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "people",
          "foreign_column": "_id"
      }
  ],
  "pilots": [
      {
          "column_name": "_id",
          "table_name": "pilots",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "pilots_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "person_id",
          "table_name": "pilots",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "pilots_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "people",
          "foreign_column": "_id"
      },
      {
          "column_name": "vessel_id",
          "table_name": "pilots",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "pilots_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "vessels",
          "foreign_column": "_id"
      }
  ],
  "planets": [
      {
          "column_name": "_id",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "climate",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "diameter",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "gravity",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "orbital_period",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "population",
          "table_name": "planets",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "rotation_period",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "surface_water",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "terrain",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "planets_in_films": [
      {
          "column_name": "_id",
          "table_name": "planets_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "planets_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "planet_id",
          "table_name": "planets_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "planets",
          "foreign_column": "_id"
      }
  ],
  "species": [
      {
          "column_name": "_id",
          "table_name": "species",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "average_height",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "average_lifespan",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "classification",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "eye_colors",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "hair_colors",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "homeworld_id",
          "table_name": "species",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": "species_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "planets",
          "foreign_column": "_id"
      },
      {
          "column_name": "language",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "skin_colors",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "species_in_films": [
      {
          "column_name": "_id",
          "table_name": "species_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "species_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "species_id",
          "table_name": "species_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "species",
          "foreign_column": "_id"
      }
  ],
  "starship_specs": [
      {
          "column_name": "MGLT",
          "table_name": "starship_specs",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "_id",
          "table_name": "starship_specs",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "starship_specs_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "hyperdrive_rating",
          "table_name": "starship_specs",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_id",
          "table_name": "starship_specs",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "starship_specs_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "vessels",
          "foreign_column": "_id"
      }
  ],
  "vessels": [
      {
          "column_name": "_id",
          "table_name": "vessels",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "cargo_capacity",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "consumables",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "cost_in_credits",
          "table_name": "vessels",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "crew",
          "table_name": "vessels",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "length",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "manufacturer",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "max_atmosphering_speed",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "model",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "passengers",
          "table_name": "vessels",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_class",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_type",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "vessels_in_films": [
      {
          "column_name": "_id",
          "table_name": "vessels_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "vessels_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "vessel_id",
          "table_name": "vessels_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "vessels",
          "foreign_column": "_id"
      }
  ]
}
*/