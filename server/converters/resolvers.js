const { makeCamelCase, makeCamelCaseAndSingularize } = require('../utils/helperFunc.ts');

const resolvers = {};
// input: base table name
// output: string
resolvers.createQuery = (baseTableName) => {
  // baseTableName is pluralized version, ex. 'planets'
  let currString = '';
  // first, append query strings for baseTableName
  currString += `
    ${makeCamelCase(baseTableName)}: async () => {
      try {
        const query = 'SELECT * FROM ${baseTableName}';
        const data = await db.query(query);
        console.log('sql query results data.rows', data.rows);
        return data.rows;
      } catch (err) {
        throw new Error(err);
      }
    },`;

  // second, append strings for singularized baseTableName
  // check if singuliarzed table is the same as baseTableName
  // if so, then append 'ById' to differentiate
  let singularAndCamelTableName = makeCamelCaseAndSingularize(baseTableName);
  if (singularAndCamelTableName === baseTableName) {
    singularAndCamelTableName += 'ById';
  }
  currString += `
    ${singularAndCamelTableName}: async (parent, args, context, info) => {
      try {
        const query = 'SELECT * FROM ${baseTableName} WHERE _id = $1';
        const values = [args._id];
        const data = await db.query(query, values);
        console.log('sql query result data.rows[0]', data.rows[0]);
        return data.rows[0];
      } catch (err) {
        throw new Error(err);
      }
    },`;
    
  return currString;
};

// input: mutation type name, mutationObj
// output: string
resolvers.createMutation = (mutationType, mutationObj) => {
  let currString = '';
  // baseTable object reference based on key (people)
  /******************* ADD *****************/
  if (mutationType.includes('add')) {
    let queryString = '';
    let valuesString = '';
    let argsString = '';
    let counter = 1;
    for (const key in mutationObj[mutationType]) {
      if (key !== 'formatted_table_name_for_dev_use' && key !== 'table_name_for_dev_use') {
        // add line breaks and spaces for client formatting
        if (counter % 3 === 0) {
          queryString += `\n          `;
          argsString += `\n          `;
        }
        // create query string
        queryString += `${key}, `;
        // create values string
        valuesString += `$${counter}, `;
        counter += 1;
        // create args string
        argsString += `args.${key}, `;
      }
    }
    // remove last comma and trailing space
    const finalQueryString = queryString.slice(0, -2);
    const finalValuesString = valuesString.slice(0, -2);
    const finalArgsString = argsString.slice(0, -2);

    currString += `
    ${mutationType}: async (parent, args, context, info) => {
      try {
        const query = \`INSERT INTO ${mutationObj[mutationType].table_name_for_dev_use} (${finalQueryString}) 
          VALUES (${finalValuesString})
          RETURNING *\`;
        const values = [${finalArgsString}];
        const data = await db.query(query, values);
        console.log('insert sql result data.rows[0]', data.rows[0]);
        return data.rows[0];
      } catch (err) {
        throw new Error(err);
      }
    },`;
  } else if (mutationType.includes('delete')) {
    /******************* DELETE *****************/
    currString += `
    ${mutationType}: async (parent, args, context, info) => {
      try {
        const query = \`DELETE FROM ${mutationObj[mutationType].table_name_for_dev_use} 
          WHERE _id = $1 RETURNING *\`;
        const values = [args._id];
        const data = await db.query(query, values);
        console.log('delete sql result data.rows[0]', data.rows[0]);
        return data.rows[0];
      } catch (err) {
        throw new Error(err);
      }
    },`;
  } else if (mutationType.includes('update')) {
    /******************* UPDATE *****************/
    currString += `
    ${mutationType}: async (parent, args, context, info) => {
      try {
        // sanitizing data for sql insert
        const argsArr = Object.keys(args).filter((el) => (el !== '_id'));
        const setStr = argsArr
          .map((el, i) => el + ' = $' + (i + 1))
          .join(', ');
        argsArr.push('_id');
        const pKey = '$' + argsArr.length;
        const valuesArr = argsArr.map((el) => args[el]);

        // insert query
        const query = 'UPDATE ${mutationObj[mutationType].table_name_for_dev_use} SET ' + setStr + ' WHERE _id = ' + pKey + ' RETURNING *';
        const values = valuesArr;
        const data = await db.query(query, values);
        console.log('insert sql result data.rows[0]', data.rows[0]);
        return data.rows[0];
      } catch (err) {
        throw new Error(err);
      }
    },`;
  } else {
    currString += `
      ${mutationType}: (parent, args, context, info) => {
        try {
          // insert sql query here
        } catch (err) {
          throw new Error(err);
        }
      },`;
  }

  return currString;
};

// 1. check own table columns
// input: base table name, baseTables object
// output: resolver function as string
resolvers.checkOwnTable = (baseTableName, baseTables) => {
  let currString = '';
  for (const column of baseTables[baseTableName]) {
    if (column.constraint_type === 'FOREIGN KEY') {
      currString += `
    ${makeCamelCase(column.foreign_table)}: async (${baseTableName}) => {
      try {
        const query = \`SELECT ${column.foreign_table}.* FROM ${column.foreign_table}
          LEFT OUTER JOIN ${baseTableName} 
          ON ${column.foreign_table}._id = ${baseTableName}.${column.column_name}
          WHERE ${baseTableName}._id = $1\`;
        const values = [${baseTableName}._id];
        const data = await db.query(query, values);
        return data.rows;
      } catch (err) {
        throw new Error(err);
      }
    },`;
    }
  }

  return currString;
};

// 2. check all base table cols
// input: base table name, base table query array
// output: resolver function as string
resolvers.checkBaseTableCols = (baseTableName, baseTableQuery) => {
  let currString = '';
  for (const column of baseTableQuery) {
    if (column.foreign_table === baseTableName) {
      currString += `
    ${makeCamelCase(column.table_name)}: async (${baseTableName}) => {
      try {
        const query = \`SELECT * FROM ${column.table_name}
          WHERE ${column.column_name} = $1\`;
        const values = [${baseTableName}._id];
        const data = await db.query(query, values);
        return data.rows;
      } catch (err) {
        throw new Error(err);
      }
    },`;
    }
  }

  return currString;
};

// 3. check join tables and cols
// input: base table name, joinTable object
// output: resolver function as string
resolvers.checkJoinTableCols = (baseTableName, joinTables) => {
  let currString = '';
  const relationships = [];

  for (const currJoinTable in joinTables) {
    for (const column of joinTables[currJoinTable]) {
      if (column.foreign_table === baseTableName) {
        relationships.push(currJoinTable);
      }
    }
  }
  // [people_in_films, pilot]
  // console.log('relationships', relationships);
  for (const table of relationships) {
    // const foreignKeys = [];
    const foreignKeysObj = {};
    for (const column of joinTables[table]) {
      if (column.constraint_type === 'FOREIGN KEY') {
        // foreignKeys.push(column.foreign_table);
        foreignKeysObj[column.foreign_table] = column.column_name;
      }
    }
    // const foreignKeys = {films: 'film_id', species: 'species_id'}
    // for (let i = 0; i < foreignKeys.length; i += 1) {
    const foreignKeys = Object.keys(foreignKeysObj);
    for (let i = 0; i < foreignKeys.length; i += 1) {
      if (foreignKeys[i] === baseTableName) {
        const index = i === 1 ? 0 : 1;
        currString += `
    ${makeCamelCase(foreignKeys[index])}: async (${baseTableName}) => {
      try {
        const query = \`SELECT * FROM ${foreignKeys[index]}
          LEFT OUTER JOIN ${table}
          ON ${foreignKeys[index]}._id = ${table}.${foreignKeysObj[foreignKeys[index]]}
          WHERE ${table}.${foreignKeysObj[baseTableName]} = $1\`;
        const values = [${baseTableName}._id];
        const data = await db.query(query, values);
        return data.rows;
      } catch (err) {
        throw new Error(err);
      }
    },`;
      }
    }
  }
  return currString;
};

module.exports = resolvers;
