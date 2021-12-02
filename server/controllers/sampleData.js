// baseTables

// planets: [
//   {
//     column_name: '_id',
//     table_name: 'planets',
//     data_type: 'integer',
//     character_maximum_length: null,
//     is_nullable: 'NO',
//     constraint_name: 'planets_pk',
//     constraint_type: 'PRIMARY KEY',
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'climate',
//     table_name: 'planets',
//     data_type: 'character varying',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'diameter',
//     table_name: 'planets',
//     data_type: 'integer',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'gravity',
//     table_name: 'planets',
//     data_type: 'character varying',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'name',
//     table_name: 'planets',
//     data_type: 'character varying',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'orbital_period',
//     table_name: 'planets',
//     data_type: 'integer',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'population',
//     table_name: 'planets',
//     data_type: 'bigint',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'rotation_period',
//     table_name: 'planets',
//     data_type: 'integer',
//     character_maximum_length: null,
//     is_nullable: 'YES',
//     constraint_name: null,
//     constraint_type: null,
//     foreign_table: null,
//     foreign_column: null
//   },
// ]

// joinTables

//   species_in_films: [
//   {
//     column_name: '_id',
//     table_name: 'species_in_films',
//     data_type: 'integer',
//     character_maximum_length: null,
//     is_nullable: 'NO',
//     constraint_name: 'species_in_films_pk',
//     constraint_type: 'PRIMARY KEY',
//     foreign_table: null,
//     foreign_column: null
//   },
//   {
//     column_name: 'film_id',
//     table_name: 'species_in_films',
//     data_type: 'bigint',
//     character_maximum_length: null,
//     is_nullable: 'NO',
//     constraint_name: 'species_in_films_fk0',
//     constraint_type: 'FOREIGN KEY',
//     foreign_table: 'films',
//     foreign_column: '_id'
//   },
//   {
//     column_name: 'species_id',
//     table_name: 'species_in_films',
//     data_type: 'bigint',
//     character_maximum_length: null,
//     is_nullable: 'NO',
//     constraint_name: 'species_in_films_fk1',
//     constraint_type: 'FOREIGN KEY',
//     foreign_table: 'species',
//     foreign_column: '_id'
//   }
// ],