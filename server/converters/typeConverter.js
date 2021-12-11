const { convertDataType, checkNullable, capitalizeAndSingularize } = require('../utils/helperFunc.ts');

const typeConverter = {};

// const joinTables = {};
// const baseTables = {};

// SEPARATE JOIN FROM "BASE" TABLES
// count all keys in table, count all foreign keys

// input: table name
// output: boolean (TRUE if table is join table)
const checkIfJoinTable = (cache, tableName) => {
  // initialize counter of foreign keys
  let fKCounter = 0;
  // loop through array
  for (let i = 0; i < cache[tableName].length; i += 1) {
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
typeConverter.sortTables = (cache, baseTables, joinTables) => {
  for (const key in cache) {
    if (checkIfJoinTable(cache, key)) joinTables[key] = cache[key];
    else baseTables[key] = cache[key]; 
  }

  return { baseTables, joinTables };
};

// input: base table (object of array, where each element in the array is an field/column object)
// output: array of objects, where each object is a join table field/column
typeConverter.createBaseTableQuery = (baseTable) => {
  // console.log(baseTable)
  const array = [];
  for (const baseTableName in baseTable) {
    for (const column of baseTable[baseTableName]) {
      array.push(column);
    }
  }
  return array;
};

// input: base table name
// output: type def object (to add as properties in schema object)
typeConverter.createInitialTypeDef = (baseTableName, baseTables, baseTableQuery) => {
  const tableType = {};
  // iterate through array of objects/columns
  for (let i = 0; i < baseTables[baseTableName].length; i += 1) {
    const column = baseTables[baseTableName][i];
    // if its a foreign key, singularize the foreign table as the value
    // foreign table : [singularize the foreign table and make PascalCase]
    if (column.constraint_type === 'FOREIGN KEY') {
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
      tableType[column.table_name] = `[${capitalizeAndSingularize(column.table_name)}]`;
    }
  }

  return tableType; 
};

// // 2. check all base table cols
// // input: base table name, base table query array
// // output: resolver function as string
// typeConverter.checkBaseTableCols = (baseTableName, baseTableQuery) => {
//   let currString = '';
//   for (const column of baseTableQuery) {
//     if (column.foreign_table === baseTableName) {
//       currString += `
//     ${makeCamelCase(column.table_name)}: async (${baseTableName}) => {
//       try {
//         const query = \`SELECT * FROM ${column.table_name}
//           WHERE ${column.column_name} = $1\`;
//         const values = [${baseTableName}._id];
//         const data = await db.query(query, values);
//         return data.rows;
//       } catch (err) {
//         throw new Error(err);
//       }
//     },`;
//     }
//   }

//   return currString;
// };

// ITERATE THROUGH JOIN TABLES AND APPEND FOREIGN_TABLES TO TYPE OBJECT

//   loop through JoinTableObject
//   for each table, get the foreign keys (constraight_type = "FOREIGN KEY")
//   get 2 foreign_tables [a, b]
//   get first foreign_table (a)'s typdef and append 'b: [b]' to typedef
//   get second foreign_table  (b)'s typedef and append 'a: [a]' to typedef

// junction tables in SQL contains the primary key columns of TWO tables you want to relate
// https://docs.microsoft.com/en-us/sql/ssms/visual-db-tools/map-many-to-many-relationships-visual-database-tools?view=sql-server-ver15

// input: join table name
// output: nothing - mutate schema object
typeConverter.addForeignKeysToTypeDef = (joinTableName, schema, joinTables) => {
  // iterate through array (ex. vessels_in_films)
  const foreignKeys = [];
  for (let i = 0; i < joinTables[joinTableName].length; i += 1) {
    const column = joinTables[joinTableName][i];
    // get both foreign keys (using constraint_type) and push foreign_table to an array 
    // (ex. ['films', 'vessels'])
    if (column.constraint_type === 'FOREIGN KEY') {
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
    // // vessels -> { films: [Film] }
    const formattedTableName2 = capitalizeAndSingularize(foreignKeys[0]);
    schema[foreignKeys[1]][foreignKeys[0]] = `[${formattedTableName2}]`;
  }
};

// input: schema object
// output: string -> formatted type def for client
typeConverter.finalizeTypeDef = (schema) => {
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

module.exports = typeConverter;