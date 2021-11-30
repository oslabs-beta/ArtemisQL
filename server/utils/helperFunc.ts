const { singular } = require('pluralize');

// input: column's data_type
// output: string (GraphQL Data type)
module.exports.convertDataType = (type, columnName) => {
  if (columnName === '_id') return 'ID';
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
};

// input: column's is_nullable
// output: string (! or empty string)
module.exports.checkNullable = (isNullable) => {
  if (isNullable === 'NO') {
    return '!';
  }
  return '';
};

// input: table name string
// output: pascalized and singularlized table name string
module.exports.capitalizeAndSingularize = (tableName) => {
  const split = tableName.split('_');
  const pascalize = split.map((ele) => ele[0].toUpperCase() + ele.slice(1)).join(''); 
  const singularize = singular(pascalize);
  return singularize;
};