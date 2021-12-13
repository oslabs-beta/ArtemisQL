const { capitalizeAndSingularize, makeCamelCase, makeCamelCaseAndSingularize } = require('../utils/helperFunc.ts');

const queryConverter = {};

/**
 * Creates query schema
 * @param {string} tableName 
 * @returns {void} returns nothing, mutates queryString in outer function scope
 */
queryConverter.createQuerySchema = (tableName) => {
  // tableName = 'starship_specs'
  // starshipSpecs: [StarshipSpec]
  // starshipSpec(_id: ID!): StarshipSpec

  // check if singuliarzed table is the same as tableName
  // if so, then append 'ById' to differentiate
  let singularAndCamelTableName = makeCamelCaseAndSingularize(tableName);
  if (singularAndCamelTableName === tableName) {
    singularAndCamelTableName += 'ById';
  }
  const temp = capitalizeAndSingularize(tableName);
  const tableQuery = `  ${makeCamelCase(tableName)}: [${temp}] \n  ${singularAndCamelTableName}(_id: ID!): ${temp} \n`;

  return tableQuery;
};

module.exports = queryConverter;