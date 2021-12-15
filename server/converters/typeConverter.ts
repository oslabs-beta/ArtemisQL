import { Tables, ArrayOfColumns, SchemaTable, StringObject, typeConverterType } from './converterTypes';
const { convertDataType, checkNullable, capitalizeAndSingularize, makeCamelCase } = require('../utils/helperFunc.ts');

/**
 * Checks if the current table is a join table or not
 * @param {object} allTables 
 * @param {string} tableName 
 * @returns {boolean} returns true if the table is a join table
 * 
 * Based on fact that junction tables in SQL contain the primary key columns of 
 * TWO tables you want to relate
 * https://docs.microsoft.com/en-us/sql/ssms/visual-db-tools/map-many-to-many-relationships-visual-database-tools?view=sql-server-ver15
 */
const checkIfJoinTable = (allTables: Tables, tableName: string): boolean => {
  // initialize counter of foreign keys
  let fKCounter = 0;
  // loop through array
  for (let i = 0; i < allTables[tableName].length; i += 1) {
    // at each element, check if current element's constraint_type is FOREIGN KEY
    if (allTables[tableName][i].constraint_type === 'FOREIGN KEY') {
      // if so, increment counter by 1
      fKCounter += 1;
    }
  }
  // compare number of foreign keys (counter) with length of array
  // if number of foreign keys is one less than the length of the array
  if (allTables[tableName].length - 1 === fKCounter) {
    // then return true
    return true;
  }
  return false;
};

/**
 * Sorts allTables into baseTables (non-join tables) and joinTables (join tables)
 * @param {object} allTables 
 * @param {object} baseTables 
 * @param {object} joinTables 
 * @returns {object} returns an object with two properties: baseTables and joinTables that 
 *    were mutated during this function invocation
 */
const sortTables = (allTables: Tables, baseTables: Tables, joinTables: Tables): any => {
  for (const key in allTables) {
    if (checkIfJoinTable(allTables, key)) joinTables[key] = allTables[key];
    else baseTables[key] = allTables[key]; 
  }

  return { baseTables, joinTables };
};

/**
 * Converts baseTables (object of array, where each element in the array is a column/field object)
 *    to an array
 * @param {object} baseTables 
 * @returns {array} returns an array of objects, where each object is a non-join table column/field
 */
const createBaseTableQuery = (baseTables: Tables): ArrayOfColumns => {
  const array: ArrayOfColumns = [];
  for (const baseTableName in baseTables) {
    for (const column of baseTables[baseTableName]) {
      array.push(column);
    }
  }
  return array;
};

/**
 * Sorts allTables into baseTables (non-join tables) and joinTables (join tables)
 * @param {string} baseTableName 
 * @param {object} baseTables 
 * @param {array} baseTableQuery 
 * @returns {object} returns an object where each property is a column from one table and 
 *   its GraphQL data type. This object represents ONE table's columns.
 */
const createInitialTypeDef = (baseTableName: string, baseTables: Tables, baseTableQuery: ArrayOfColumns): StringObject => {
  const tableType: StringObject = {};
  // iterate through array of objects/columns
  for (let i = 0; i < baseTables[baseTableName].length; i += 1) {
    const column = baseTables[baseTableName][i];
    // if its a foreign key, singularize the foreign table as the value
    // foreign table : [singularize the foreign table and make PascalCase]
    if (column.constraint_type === 'FOREIGN KEY' && column.foreign_table !== null) {
      const key = column.foreign_table;

      const formattedTableName = capitalizeAndSingularize(key);
      // add to schema object
      tableType[key] = `[${formattedTableName}]`;
    } else {
      // at each column, convert data type, then check for nullables
      let type = convertDataType(column.data_type, column.column_name);
      type += checkNullable(column.is_nullable);
      // add to schema object
      tableType[column.column_name] = type;
    }
  }
  // check all base table cols for relationships to baseTable
  for (const column of baseTableQuery) {
    if (column.foreign_table === baseTableName) {
      tableType[makeCamelCase(column.table_name)] = `[${capitalizeAndSingularize(column.table_name)}]`;
    }
  }

  return tableType; 
};

/**
 * Adds foreign keys to the type definitions
 * @param {string} joinTableName 
 * @param {object} schema 
 * @param {object} joinTables 
 * @returns {void} returns nothing, mutates schema object in argument
 */
const addForeignKeysToTypeDef = (joinTableName: string, schema: SchemaTable, joinTables: Tables): void => {
  // iterate through array (ex. vessels_in_films)
  const foreignKeys: string[] = [];
  for (let i = 0; i < joinTables[joinTableName].length; i += 1) {
    const column = joinTables[joinTableName][i];
    // get both foreign keys (using constraint_type) and push foreign_table to an array 
    // (ex. ['films', 'vessels'])
    if (column.constraint_type === 'FOREIGN KEY' && column.foreign_table !== null) {
      foreignKeys.push(column.foreign_table);
    }
  }

  // get first foreign key (array[0]) (ex. films)
  // go to base table object referenced in second foreign key (array[1]) (ex. vessels)
  // add property to vessels base table with information from first fK 
  
  if (schema[foreignKeys[0]]) { // films 
    const formattedTableName1 = capitalizeAndSingularize(foreignKeys[1]);
    // films -> { vessels: [Vessel] }
    schema[foreignKeys[0]][foreignKeys[1]] = `[${formattedTableName1}]`;
  }  

  if (schema[foreignKeys[1]]) { // vessels  
    // vessels -> { films: [Film] }
    const formattedTableName2 = capitalizeAndSingularize(foreignKeys[0]);
    schema[foreignKeys[1]][foreignKeys[0]] = `[${formattedTableName2}]`;
  }
};

/**
 * Convert type defs in schema to a string
 * @param {object} schema 
 * @returns {string} formats the type def as a string for client
 */
const finalizeTypeDef = (schema: SchemaTable): string => {
  let typeString = '';

  for (const key in schema) {
    const formattedTableName = capitalizeAndSingularize(key);
    const typeKey = `type ${formattedTableName}`;
    typeString += `\n${typeKey} {\n`;
    const table = schema[key];
    
    for (const column in table) {
    // 2 spaces + '_id: ID!' + line break
      const newColumn = `  ${column}: ${table[column]}\n`;
      // append to typeString
      typeString += newColumn;
    }
    typeString += '} \n';
  }
  return typeString;
};

const typeConverter: typeConverterType = { 
  sortTables, 
  createBaseTableQuery,
  createInitialTypeDef,
  addForeignKeysToTypeDef,
  finalizeTypeDef,
};

export default typeConverter;
// module.exports = typeConverter;