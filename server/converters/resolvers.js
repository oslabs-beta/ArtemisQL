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
    ${makeCamelCase(baseTableName)}: async () => {
      try {
        const query = 'SELECT * FROM ${baseTableName}';
        const data = await db.query(query);
        console.log('sql query results data.rows', data.rows);
      } catch(err) {
        throw new Error(err);
      }
    },`;

  // second, append strings for singularized baseTableName
  currString += `
    ${makeCamelCaseAndSingularize(baseTableName)}: async (parent, args, context, info) => {
      try {
        const query = 'SELECT * FROM ${baseTableName} WHERE _id = $1';
        const values = [args._id];
        const data = await db.query(query, values);
        console.log('sql query result data.rows[0]', data.rows[0]);
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
  // baseTable object reference based on key (people)
  /******************* ADD *****************/
  // loop through all columns/fields and print in string (gender, species_id, homeworld_id, height, mass, hair_color, skin_color, eye_color, name, birth_year)
  // loop through all columns/fields and for each item, keep count and print in string ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  // loop through all columns/fields, and print in args string 'args.gender, args.species_id, args.homeworld_id, args.height, args.mass, args.hair_color, args.skin_color, args.eye_color, args.name, args.birth_year'
  // currString += `
  // ${mutationType}: async (parent, args, context, info) => {
  //   try {
  //     const query = 'INSERT INTO ${baseTableName} 
  //       () VALUES ()
  //       RETURNING *';
  //     const values = [];
  //     const data = await db.query(query, values);
  //     console.log('insert sql result data.rows[0]', data.rows[0]);
  //   } catch(err) {
  //     throw new Error(err);
  //   }
  // },`;

  /******************* UPDATE *****************/
  /******************* DELETE *****************/
  // currString += `
  // ${mutationType}: async (parent, args, context, info) => {
  //   try {
  //     const query = 'DELETE FROM ${baseTableName} 
  //       WHERE _id = $1 RETURNING *;
  //     const values = [args._id];
  //     const data = await db.query(query, values);
  //     console.log('delete sql result data.rows[0]', data.rows[0]);
  //   } catch(err) {
  //     throw new Error(err);
  //   }
  // },`;
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
    ${column.foreign_table}: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch(err) {
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
    ${column.table_name}: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch(err) {
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
  // console.log('relationships', relationships);
  // [people_in_films, pilot]
  for (const table of relationships) {
    const foreignKeys = [];
    for (const column of joinTables[table]) {
      if (column.constraint_type === 'FOREIGN KEY') {
        foreignKeys.push(column.foreign_table);
      }
    }

    for (let i = 0; i < foreignKeys.length; i += 1) {
      if (foreignKeys[i] === baseTableName) {
        const index = i === 1 ? 0 : 1;
        currString += `
    ${foreignKeys[index]}: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch(err) {
        throw new Error(err);
      }
    },`;
      }
    }
  }
  return currString;
};

module.exports = resolvers;
