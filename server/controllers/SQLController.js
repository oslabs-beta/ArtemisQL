const express = require('express');
const { Pool } = require('pg');

// declare SQLController object that will later be exported
const SQLController = {};

SQLController.getTables = (req, res, next) => {
  // const PG_URI = (!req.body.uri) ? 'postgres://dsthvptf:Y8KtTaY290gb7KlcxkoTLHTnEECegH0r@fanny.db.elephantsql.com/dsthvptf' : req.body.uri;
  // create a new pool here using the connection string above
  const db = new Pool({
    connectionString: 'postgres://dsthvptf:Y8KtTaY290gb7KlcxkoTLHTnEECegH0r@fanny.db.elephantsql.com/dsthvptf',
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
    where cols.table_schema = 'public' AND tbls.table_type = 'BASE TABLE'
    ORDER BY cols.table_name`;
  db.query(queryString)
    .then((data) => {
      res.locals.queryTables = data.rows; // data.rows is an array of objects
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

SQLController.formatQueryResult = (req, res, next) => {
  // middleware to format sql results to client
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
  console.log('cache: ', cache);
  return next();

  // also push it
  // else if it already exist push to it

/*
{
  People:         [{each column info},{each column info},{each column info}],
  Species:        [{each column info},{each column info},{each column info}],
  Films:          [{each column info},{each column info},{each column info}],
  People_in_Film: [{each column info},{each column info},{each column info}],
}

*/
};

module.exports = SQLController;