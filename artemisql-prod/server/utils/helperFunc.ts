import { singular } from 'pluralize';

/**
 * Converts the SQL column's data_type from to GraphQL data types
 * @param {string} type (column/field data type)
 * @param {string} columnName (column/field name)
 * @returns {string} GraphQL data type of column/field
 */
module.exports.convertDataType = (type: string, columnName: string): string => {
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
    case 'timestamp with time zone': return 'timestamptz';
    default: return type;
  }
};

/**
 * Converts the SQL column's is_nullable from to GraphQL is_nullable
 * @param {string} isNullable (column's is_nullable)
 * @returns {string} ! or ''
 */
module.exports.checkNullable = (isNullable: string): string => {
  if (isNullable === 'NO') {
    return '!';
  }
  return '';
};

/**
 * Pascalizes and singularlizes a table name
 * @param {string} tableName 
 * @returns {string} pascalized and singularlized table name
 */
module.exports.capitalizeAndSingularize = (tableName: string): string => {
  const split = tableName.split('_');
  const pascalize = split.map((ele) => ele[0].toUpperCase() + ele.slice(1)).join(''); 
  const singularize: string = singular(pascalize);
  return singularize;
};

/**
 * Camelcase and singularlizes a table name
 * @param {string} tableName 
 * @returns {string} Camelcase and singularlized table name
 */
module.exports.makeCamelCaseAndSingularize = (tableName: string): string => {
  const split = tableName.split('_');
  const camelCaseArray: string[] = [];
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

/**
 * Camelcase a table name
 * @param {string} tableName 
 * @returns {string} Camelcase table name
 */
module.exports.makeCamelCase = (tableName: string): string => {
  const split = tableName.split('_');
  const camelCaseArray: string[] = [];
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