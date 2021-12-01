const { convertDataType, checkNullable } = require('../utils/helperFunc.ts');
const { makeCamelCase, makeCamelCaseAndSingularize } = require('../utils/helper');

const resolvers = {};
// input: base table name
// output: string
resolvers.createQuery = (baseTableName) => {
  // baseTableName = 'planets'
  let currString = '';
  // first, append strings for baseTableName
  // 4 spaces
  currString += `
    ${makeCamelCase(baseTableName)}: () => {
      try {
        // insert sql query here
      } catch(err) {
        throw new Error(err);
      }
    },`;

  // second, append strings for singularized baseTableName
  currString += `
    ${makeCamelCaseAndSingularize(baseTableName)}: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch(err) {
        throw new Error(err);
      }
    },`;
    
  return currString;
};

// input: base table name
// output: string
resolvers.createMutation = (mutationType) => {
  let currString = '';
  // append function strings for mutationType
  // 4 spaces
  currString += `
    ${mutationType}: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch(err) {
        throw new Error(err);
      }
    },`;

  return currString;
};

module.exports = resolvers;
