const { singular } = require('pluralize');

// input: table name string
// output: camel case and singularlized table name string
module.exports.makeCamelCaseAndSingularize = (tableName) => {
  const split = tableName.split('_');
  const camelCaseArray = [];
  for (let i = 0; i < split.length; i += 1) {
    if (i === 0) {
      camelCaseArray.push(split[i]);
    } else {
      camelCaseArray.push(split[i][0].toUpperCase() + split[i].slice(1));
    }
  }
  const camelCase = camelCaseArray.join(''); 
  const singularize = singular(camelCase);
  return singularize;
};

// input: table name string
// output: camel case table name string
module.exports.makeCamelCase = (tableName) => {
  const split = tableName.split('_');
  const camelCaseArray = [];
  for (let i = 0; i < split.length; i += 1) {
    if (i === 0) {
      camelCaseArray.push(split[i]);
    } else {
      camelCaseArray.push(split[i][0].toUpperCase() + split[i].slice(1));
    }
  }
  const camelCase = camelCaseArray.join(''); 
  return camelCase;
};