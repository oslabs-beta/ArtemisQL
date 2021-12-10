import { Request, Response, NextFunction } from 'express';
import { SQLControllerType } from './controllerTypes';

require('dotenv').config();
const { Pool } = require('pg');

// get all database metadata (tables and columns) from user's selected DB
const getAllMetadata = async (req: Request, res: Response, next: NextFunction) => {
  const PG_URI = (!req.query.dbLink) ? process.env.PG_URI : req.query.dbLink;
  const db = new Pool({
    connectionString: PG_URI,
  });

  const queryString = `
    SELECT 
      cols.column_name,
      cols.table_name,
      cols.data_type,
      cols.character_maximum_length,
      cols.is_nullable,
      kcu.constraint_name,
      cons.constraint_type,
      rel_kcu.table_name AS foreign_table,
      rel_kcu.column_name AS foreign_column
    FROM information_schema.columns cols
    LEFT JOIN information_schema.key_column_usage kcu
      ON cols.column_name = kcu.column_name
      AND cols.table_name = kcu.table_name
    LEFT JOIN information_schema.table_constraints cons
      ON kcu.constraint_name = cons.constraint_name
    LEFT JOIN information_schema.referential_constraints rco
      ON rco.constraint_name = cons.constraint_name
    LEFT JOIN information_schema.key_column_usage rel_kcu
      ON rco.unique_constraint_name = rel_kcu.constraint_name

    LEFT JOIN information_schema.tables tbls
      ON cols.table_name = tbls.table_name
      
    WHERE cols.table_schema = 'public' AND tbls.table_type = 'BASE TABLE'
    ORDER BY cols.table_name`;
  
  try {
    const data = await db.query(queryString);
    if (!data) {
      throw (new Error('Error querying from sql database'));
    }
    res.locals.queryTables = data.rows; // data.rows is an array of objects
    // console.log('queryTables', res.locals.queryTables);
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: `Express error handler caught error in the getAllMetadata controller, ${err}`,
      message: { err: 'An error occurred in the getAllMetadata controller' },
    });
  }
};

// format sql results to client
const formatQueryResult = (req: Request, res: Response, next: NextFunction) => {
  /* desired format for client:
  
  Key(Table_Name)
  Value(Array of OBJECTS which contains column information such as col name, pk, fk, data type)
  { 
    People:         [{each column info},{each column info},{each column info}],
    Species:        [{each column info},{each column info},{each column info}],
    Films:          [{each column info},{each column info},{each column info}],
    People_in_Film: [{each column info},{each column info},{each column info}],
  }

*/
  // iterate through the array of object columns info.
  const cache = {};
  for (let i = 0; i < res.locals.queryTables.length; i += 1) {
    // if object doesn't have table name add it to the object.
    const key = res.locals.queryTables[i].table_name;
    if (!cache[key]) {
      cache[key] = [res.locals.queryTables[i]];
    } else {
      cache[key].push(res.locals.queryTables[i]);
    }
  }
  res.locals.cache = cache;
  // console.log('cache: ', cache);
  return next();
};

// module.exports = SQLController;
// declare SQLController object that will later be exported
const SQLController: SQLControllerType = { getAllMetadata, formatQueryResult };
export default SQLController;