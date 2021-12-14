import { MutationConverterType, MutationTable, ArrayOfColumns, MutationObject } from './converterTypes';
// import MutationTable from './converterTypes'
// import ArrayOfColumns from './converterTypes'
// import MutationObject from './converterTypes'
const { convertDataType, checkNullable, capitalizeAndSingularize } = require('../utils/helperFunc.ts');

// const mutationConverter = {};

/**
 * Creates add mutation for current table
 * @param {string} tableName
 * @param {array} arrOfColumns array of columns/fields based on current tableName
 * @returns {array} returns a tuple with 2 elements: add string and 
 *   single mutation add object (to add as properties in mutationObj)
 */
const add = (tableName: string, arrOfColumns: ArrayOfColumns): [string, object] => {
  const addObj: MutationTable = {};
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
  const outputArr: [string, object] = [addKey, addObj];
  return outputArr;
};

/**
 * Creates update mutation for current table
 * @param {string} tableName
 * @param {array} arrOfColumns array of columns/fields based on current tableName
 * @returns {array} returns a tuple with 2 elements: update string and 
 *   single mutation update object (to add as properties in mutationObj)
 */
const update = (tableName: string, arrOfColumns: ArrayOfColumns): [string, object] => {
  const updateObj: MutationTable = {};

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
  const outputArr: [string, object] = [updateKey, updateObj];
  return outputArr;  
};

/**
 * Creates delete mutation for current table
 * @param {string} tableName
 * @param {array} arrOfColumns array of columns/fields based on current tableName
 * @returns {array} returns a tuple with 2 elements: add string and 
 *   single mutation add object (to add as properties in mutationObj)
 */
const del = (tableName: string, arrOfColumns: ArrayOfColumns): [string, object] => {
  const deleteObj: MutationTable = {};

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
  const outputArr: [string, object] = [deleteKey, deleteObj];
  return outputArr;  
};

/**
 * Converts mutationObj to a string
 * @param {object} mutationObj
 * @returns {string} returns final mutation string formatted for client
 */
const stringify = (mutationObj: MutationObject): string => {
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
    mutationString += `  ): ${mutationObj[mutationType].formatted_table_name_for_dev_use}! \n\n`;
  }
  mutationString += `} \n`;
  return mutationString;
};

const mutationConverter: MutationConverterType = { 
  add,
  update,
  del,
  stringify,
};

export default mutationConverter;