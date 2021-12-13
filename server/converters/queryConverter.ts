import { QueryConverterType } from './converterTypes';

const { capitalizeAndSingularize, makeCamelCase, makeCamelCaseAndSingularize } = require('../utils/helperFunc.ts');

/**
 * Creates query schema
 * @param {string} tableName 
 * @returns {string} returns a string for the query schema
 */
const createQuerySchema = (tableName: string): string => {
  // tableName = 'starship_specs'
  // starshipSpecs: [StarshipSpec]
  // starshipSpec(_id: ID!): StarshipSpec

  // check if singuliarzed table is the same as tableName
  // if so, then append 'ById' to differentiate
  let singularAndCamelTableName: string = makeCamelCaseAndSingularize(tableName);
  if (singularAndCamelTableName === tableName) {
    singularAndCamelTableName += 'ById';
  }
  const temp: string = capitalizeAndSingularize(tableName);
  const tableQuery = `  ${makeCamelCase(tableName)}: [${temp}] \n  ${singularAndCamelTableName}(_id: ID!): ${temp} \n`;

  return tableQuery;
};
const queryConverter: QueryConverterType = { createQuerySchema };

export default queryConverter;