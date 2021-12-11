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

// Mutation Obj
// addFilm: {
//   director: 'String!',
//   episode_id: 'Int!',
//   opening_crawl: 'String!',
//   producer: 'String!',
//   release_date: 'String!',
//   title: 'String!',
//   formatted_table_name_for_dev_use: 'Film',
//   table_name_for_dev_use: 'films'
// },
// updateFilm: {
//   _id: 'ID',
//   director: 'String',
//   episode_id: 'Int',
//   opening_crawl: 'String',
//   producer: 'String',
//   release_date: 'String',
//   title: 'String',
//   formatted_table_name_for_dev_use: 'Film',
//   table_name_for_dev_use: 'films'
// },
// deleteFilm: {
//   _id: 'ID!',
//   formatted_table_name_for_dev_use: 'Film',
//   table_name_for_dev_use: 'films'
// },
// addPerson: {
//   birth_year: 'String',
//   eye_color: 'String',
//   gender: 'String',
//   hair_color: 'String',
//   height: 'Int',
//   homeworld_id: 'Int',
//   mass: 'String',
//   name: 'String!',
//   skin_color: 'String',
//   species_id: 'Int',
//   formatted_table_name_for_dev_use: 'Person',
//   table_name_for_dev_use: 'people'
// },
// updatePerson: {
//   _id: 'ID',
//   birth_year: 'String',
//   eye_color: 'String',
//   gender: 'String',
//   hair_color: 'String',
//   height: 'Int',
//   homeworld_id: 'Int',
//   mass: 'String',
//   name: 'String',
//   skin_color: 'String',
//   species_id: 'Int',
//   formatted_table_name_for_dev_use: 'Person',
//   table_name_for_dev_use: 'people'
// },
// deletePerson: {
//   _id: 'ID!',
//   formatted_table_name_for_dev_use: 'Person',
//   table_name_for_dev_use: 'people'
// },
// addPlanet: {
//   climate: 'String',
//   diameter: 'Int',
//   gravity: 'String',
//   name: 'String',
//   orbital_period: 'Int',
//   population: 'Float',
//   rotation_period: 'Int',
//   surface_water: 'String',
//   terrain: 'String',
//   formatted_table_name_for_dev_use: 'Planet',
//   table_name_for_dev_use: 'planets'
// },
// updatePlanet: {
//   _id: 'ID',
//   climate: 'String',
//   diameter: 'Int',
//   gravity: 'String',
//   name: 'String',
//   orbital_period: 'Int',
//   population: 'Float',
//   rotation_period: 'Int',
//   surface_water: 'String',
//   terrain: 'String',
//   formatted_table_name_for_dev_use: 'Planet',
//   table_name_for_dev_use: 'planets'
// },
// deletePlanet: {
//   _id: 'ID!',
//   formatted_table_name_for_dev_use: 'Planet',
//   table_name_for_dev_use: 'planets'
// },
// addSpecies: {
//   average_height: 'String',
//   average_lifespan: 'String',
//   classification: 'String',
//   eye_colors: 'String',
//   hair_colors: 'String',
//   homeworld_id: 'Int',
//   language: 'String',
//   name: 'String!',
//   skin_colors: 'String',
//   formatted_table_name_for_dev_use: 'Species',
//   table_name_for_dev_use: 'species'
// },
// updateSpecies: {
//   _id: 'ID',
//   average_height: 'String',
//   average_lifespan: 'String',
//   classification: 'String',
//   eye_colors: 'String',
//   hair_colors: 'String',
//   homeworld_id: 'Int',
//   language: 'String',
//   name: 'String',
//   skin_colors: 'String',
//   formatted_table_name_for_dev_use: 'Species',
//   table_name_for_dev_use: 'species'
// },
// deleteSpecies: {
//   _id: 'ID!',
//   formatted_table_name_for_dev_use: 'Species',
//   table_name_for_dev_use: 'species'
// },
// addStarshipSpec: {
//   MGLT: 'String',
//   hyperdrive_rating: 'String',
//   vessel_id: 'Int!',
//   formatted_table_name_for_dev_use: 'StarshipSpec',
//   table_name_for_dev_use: 'starship_specs'
// },
// updateStarshipSpec: {
//   MGLT: 'String',
//   _id: 'ID',
//   hyperdrive_rating: 'String',
//   vessel_id: 'Int',
//   formatted_table_name_for_dev_use: 'StarshipSpec',
//   table_name_for_dev_use: 'starship_specs'
// },
// deleteStarshipSpec: {
//   _id: 'ID!',
//   formatted_table_name_for_dev_use: 'StarshipSpec',
//   table_name_for_dev_use: 'starship_specs'
// },
// addVessel: {
//   cargo_capacity: 'String',
//   consumables: 'String',
//   cost_in_credits: 'Float',
//   crew: 'Int',
//   length: 'String',
//   manufacturer: 'String',
//   max_atmosphering_speed: 'String',
//   model: 'String',
//   name: 'String!',
//   passengers: 'Int',
//   vessel_class: 'String!',
//   vessel_type: 'String!',
//   formatted_table_name_for_dev_use: 'Vessel',
//   table_name_for_dev_use: 'vessels'
// },
// updateVessel: {
//   _id: 'ID',
//   cargo_capacity: 'String',
//   consumables: 'String',
//   cost_in_credits: 'Float',
//   crew: 'Int',
//   length: 'String',
//   manufacturer: 'String',
//   max_atmosphering_speed: 'String',
//   model: 'String',
//   name: 'String',
//   passengers: 'Int',
//   vessel_class: 'String',
//   vessel_type: 'String',
//   formatted_table_name_for_dev_use: 'Vessel',
//   table_name_for_dev_use: 'vessels'
// },
// deleteVessel: {
//   _id: 'ID!',
//   formatted_table_name_for_dev_use: 'Vessel',
//   table_name_for_dev_use: 'vessels'
// }
// }

// baseTableQuery
// {
//   column_name: 'opening_crawl',
//   table_name: 'films',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'producer',
//   table_name: 'films',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'release_date',
//   table_name: 'films',
//   data_type: 'date',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'title',
//   table_name: 'films',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: '_id',
//   table_name: 'people',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: 'people_pk',
//   constraint_type: 'PRIMARY KEY',
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'birth_year',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'eye_color',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'gender',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'hair_color',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'height',
//   table_name: 'people',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'homeworld_id',
//   table_name: 'people',
//   data_type: 'bigint',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: 'people_fk1',
//   constraint_type: 'FOREIGN KEY',
//   foreign_table: 'planets',
//   foreign_column: '_id'
// },
// {
//   column_name: 'mass',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'name',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'skin_color',
//   table_name: 'people',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'species_id',
//   table_name: 'people',
//   data_type: 'bigint',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: 'people_fk0',
//   constraint_type: 'FOREIGN KEY',
//   foreign_table: 'species',
//   foreign_column: '_id'
// },
// {
//   column_name: '_id',
//   table_name: 'planets',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: 'planets_pk',
//   constraint_type: 'PRIMARY KEY',
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'climate',
//   table_name: 'planets',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'diameter',
//   table_name: 'planets',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'gravity',
//   table_name: 'planets',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'name',
//   table_name: 'planets',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'orbital_period',
//   table_name: 'planets',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'population',
//   table_name: 'planets',
//   data_type: 'bigint',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'rotation_period',
//   table_name: 'planets',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'surface_water',
//   table_name: 'planets',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'terrain',
//   table_name: 'planets',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: '_id',
//   table_name: 'species',
//   data_type: 'integer',
//   character_maximum_length: null,
//   is_nullable: 'NO',
//   constraint_name: 'species_pk',
//   constraint_type: 'PRIMARY KEY',
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'average_height',
//   table_name: 'species',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'average_lifespan',
//   table_name: 'species',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// {
//   column_name: 'classification',
//   table_name: 'species',
//   data_type: 'character varying',
//   character_maximum_length: null,
//   is_nullable: 'YES',
//   constraint_name: null,
//   constraint_type: null,
//   foreign_table: null,
//   foreign_column: null
// },
// GQL Mutation
// updatePerson args obj { gender: 'male', _id: '5', name: 'JenniferXXX' }
// query UPDATE people SET gender = $1, name = $2 WHERE _id = $3 RETURNING *
// values [ 'male', 'JenniferXXX', '5' ]
// executed query: UPDATE people SET gender = $1, name = $2 WHERE _id = $3 RETURNING *
// executed query: SELECT species.* FROM species LEFT OUTER JOIN people ON species._id = people.species_id WHERE people._id = $1
// 
// mutation {
//   updatePerson(_id: 5, name: "JenniferXXX", gender: "male"){
//      name
//      gender
//      species {
//          name
//      }
//   }
// }