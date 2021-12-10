const { convertDataType, checkNullable, capitalizeAndSingularize } = require('../utils/helperFunc.ts');

const mutationConverter = {};

// input: baseTableName, array of columns (from base table object)
// output: single mutation add object (to add as properties in mutation object)
mutationConverter.add = (tableName, arrOfColumns) => {
  const addObj = {};
  // iterate through array of columns
  for (const column of arrOfColumns) {
    if (column.column_name !== '_id') {
    // for each column, invoke convertDataTypeMutationAdd, and then invoke checkNullableMutationAdd
      let type = convertDataType(column.data_type, column.column_name);
      type += checkNullable(column.is_nullable);
      // for each column, then push into addObj (key: )
      addObj[column.column_name] = type;
    }
  }

  const formattedTableName = capitalizeAndSingularize(tableName);

  addObj.formatted_table_name_for_dev_use = formattedTableName;
  addObj.table_name_for_dev_use = tableName;
  
  const addKey = `add${formattedTableName}`;
  const outputArr = [addKey, addObj];
  return outputArr;
};

// input: baseTableName, array of columns (from base table object)
// output: single mutation update object (to add as properties in mutation object)
mutationConverter.update = (tableName, arrOfColumns) => {
  const updateObj = {};

  // iterate through array of columns
  for (const column of arrOfColumns) {
    // for each column, invoke convertDataTypeMutationAdd
    const type = convertDataType(column.data_type, column.column_name);
    updateObj[column.column_name] = type;
  }
  
  const formattedTableName = capitalizeAndSingularize(tableName);
  
  updateObj.formatted_table_name_for_dev_use = formattedTableName;
  updateObj.table_name_for_dev_use = tableName;

  const updateKey = `update${formattedTableName}`;
  const outputArr = [updateKey, updateObj];
  return outputArr;  
};

// input: baseTableName, array of columns (from base table object)
// output: single mutation delete object (to add as properties in mutation object)
mutationConverter.delete = (tableName, arrOfColumns) => {
  const deleteObj = {};

  // iterate through array of columns
  for (const column of arrOfColumns) {
    if (column.constraint_type === 'PRIMARY KEY') {
      deleteObj[column.column_name] = 'ID!';
    }
  } 
  
  const formattedTableName = capitalizeAndSingularize(tableName);
  deleteObj.formatted_table_name_for_dev_use = formattedTableName;
  deleteObj.table_name_for_dev_use = tableName;
  const deleteKey = `delete${formattedTableName}`;
  const outputArr = [deleteKey, deleteObj];
  return outputArr;  
};

// input: mutation Object
// output: big string
mutationConverter.stringify = (mutationObj) => {
  let mutationString = '\n\ntype Mutation { \n';
  // iterate through mutation object
  for (const mutationType in mutationObj) {
    mutationString += `  ${mutationType}( \n`;

    // iterate through all the fields within each mutationType
    for (const column in mutationObj[mutationType]) {
      if (column !== 'table_name_for_dev_use' && column !== 'formatted_table_name_for_dev_use') {
        mutationString += `    ${column}: ${mutationObj[mutationType][column]}, \n`;
      }
    }
    mutationString += `  ): ${mutationObj[mutationType].table_name_for_dev_use}! \n\n`;
  }
  mutationString += `} \n`;
  return mutationString;
};

/* IDEAL OUTPUT FORMAT
type Mutation {
  addPerson(
    gender: String,
    species_id: ID,
    homeworld_id: ID,
    height: Int,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    name: String!,
    birth_year: String,
  ): Person!

  updatePerson(
    gender: String,
    species_id: ID,
    homeworld_id: ID,
    height: Int,
    _id: ID!,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    name: String,
    birth_year: String,
  ): Person!

  deletePerson(_id: ID!): Person!

  addFilm(
    director: String!,
    opening_crawl: String!,
    episode_id: Int!,
    title: String!,
    release_date: String!,
    producer: String!,
  ): Film!
  */
/*
MUTATION OBJ OUTSIDE FOR LOOP {
  addFilm: {
    director: 'String!',
    episode_id: 'Int!',
    opening_crawl: 'String!',
    producer: 'String!',
    release_date: 'String!',
    title: 'String!',
    table_name_for_dev_use_458965126846854wtfisthis: 'Film'
  },
  updateFilm: {
    _id: 'ID',
    director: 'String',
    episode_id: 'Int',
    opening_crawl: 'String',
    producer: 'String',
    release_date: 'String',
    title: 'String'
  },
  deleteFilm: { _id: 'ID!' },
  addPerson: {
    birth_year: 'String',
    eye_color: 'String',
    gender: 'String',
    hair_color: 'String',
    height: 'Int',
    homeworld_id: 'Int',
    mass: 'String',
    name: 'String!',
    skin_color: 'String',
    species_id: 'Int'
  },
  updatePerson: {
    _id: 'ID',
    birth_year: 'String',
    eye_color: 'String',
    gender: 'String',
    hair_color: 'String',
    height: 'Int',
    homeworld_id: 'Int',
    mass: 'String',
    name: 'String',
    skin_color: 'String',
    species_id: 'Int'
  },
  deletePerson: { _id: 'ID!' },
  addPlanet: {
    climate: 'String',
    diameter: 'Int',
    gravity: 'String',
    name: 'String',
    orbital_period: 'Int',
    population: 'Float',
    rotation_period: 'Int',
    surface_water: 'String',
    terrain: 'String'
  },
  updatePlanet: {
    _id: 'ID',
    climate: 'String',
    diameter: 'Int',
    gravity: 'String',
    name: 'String',
    orbital_period: 'Int',
    population: 'Float',
    rotation_period: 'Int',
    surface_water: 'String',
    terrain: 'String'
  },
  deletePlanet: { _id: 'ID!' },
  addSpecies: {
    average_height: 'String',
    average_lifespan: 'String',
    classification: 'String',
    eye_colors: 'String',
    hair_colors: 'String',
    homeworld_id: 'Int',
    language: 'String',
    name: 'String!',
    skin_colors: 'String'
  },
  updateSpecies: {
    _id: 'ID',
    average_height: 'String',
    average_lifespan: 'String',
    classification: 'String',
    eye_colors: 'String',
    hair_colors: 'String',
    homeworld_id: 'Int',
    language: 'String',
    name: 'String',
    skin_colors: 'String'
  },
  deleteSpecies: { _id: 'ID!' },
  addStarshipSpec: { MGLT: 'String', hyperdrive_rating: 'String', vessel_id: 'Int!' },
  updateStarshipSpec: {
    MGLT: 'String',
    _id: 'ID',
    hyperdrive_rating: 'String',
    vessel_id: 'Int'
  },
  deleteStarshipSpec: { _id: 'ID!' },
  addVessel: {
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
    vessel_type: 'String!'
  },
  updateVessel: {
    _id: 'ID',
    cargo_capacity: 'String',
    consumables: 'String',
    cost_in_credits: 'Float',
    crew: 'Int',
    length: 'String',
    manufacturer: 'String',
    max_atmosphering_speed: 'String',
    model: 'String',
    name: 'String',
    passengers: 'Int',
    vessel_class: 'String',
    vessel_type: 'String'
  },
  deleteVessel: { _id: 'ID!' }
}
*/
module.exports = mutationConverter;