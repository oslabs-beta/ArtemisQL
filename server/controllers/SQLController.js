const express = require('express');
const { Pool } = require('pg');

const SQLController = {};

SQLController.getSQLMetadata = (req, res, next) => {
  // connecting our server to a database
  const PG_URI = (!req.body.uri) ? 'postgres://dsthvptf:Y8KtTaY290gb7KlcxkoTLHTnEECegH0r@fanny.db.elephantsql.com/dsthvptf' : req.body.uri;
  // create a new pool here using the connection string above
  const pool = new Pool({
    connectionString: PG_URI,
  });
};

module.export = SQLController;