// SQL QUERY DATA
/*
{
  "films": [
      {
          "column_name": "_id",
          "table_name": "films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "director",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "episode_id",
          "table_name": "films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "opening_crawl",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "producer",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "release_date",
          "table_name": "films",
          "data_type": "date",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "title",
          "table_name": "films",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "people": [
      {
          "column_name": "_id",
          "table_name": "people",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "birth_year",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "eye_color",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "gender",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "hair_color",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "height",
          "table_name": "people",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "homeworld_id",
          "table_name": "people",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": "people_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "planets",
          "foreign_column": "_id"
      },
      {
          "column_name": "mass",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "skin_color",
          "table_name": "people",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "species_id",
          "table_name": "people",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": "people_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "species",
          "foreign_column": "_id"
      }
  ],
  "people_in_films": [
      {
          "column_name": "_id",
          "table_name": "people_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "people_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "person_id",
          "table_name": "people_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "people_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "people",
          "foreign_column": "_id"
      }
  ],
  "pilots": [
      {
          "column_name": "_id",
          "table_name": "pilots",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "pilots_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "person_id",
          "table_name": "pilots",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "pilots_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "people",
          "foreign_column": "_id"
      },
      {
          "column_name": "vessel_id",
          "table_name": "pilots",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "pilots_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "vessels",
          "foreign_column": "_id"
      }
  ],
  "planets": [
      {
          "column_name": "_id",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "climate",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "diameter",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "gravity",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "orbital_period",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "population",
          "table_name": "planets",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "rotation_period",
          "table_name": "planets",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "surface_water",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "terrain",
          "table_name": "planets",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "planets_in_films": [
      {
          "column_name": "_id",
          "table_name": "planets_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "planets_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "planet_id",
          "table_name": "planets_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "planets_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "planets",
          "foreign_column": "_id"
      }
  ],
  "species": [
      {
          "column_name": "_id",
          "table_name": "species",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "average_height",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "average_lifespan",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "classification",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "eye_colors",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "hair_colors",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "homeworld_id",
          "table_name": "species",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": "species_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "planets",
          "foreign_column": "_id"
      },
      {
          "column_name": "language",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "skin_colors",
          "table_name": "species",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "species_in_films": [
      {
          "column_name": "_id",
          "table_name": "species_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "species_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "species_id",
          "table_name": "species_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "species_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "species",
          "foreign_column": "_id"
      }
  ],
  "starship_specs": [
      {
          "column_name": "MGLT",
          "table_name": "starship_specs",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "_id",
          "table_name": "starship_specs",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "starship_specs_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "hyperdrive_rating",
          "table_name": "starship_specs",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_id",
          "table_name": "starship_specs",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "starship_specs_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "vessels",
          "foreign_column": "_id"
      }
  ],
  "vessels": [
      {
          "column_name": "_id",
          "table_name": "vessels",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "cargo_capacity",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "consumables",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "cost_in_credits",
          "table_name": "vessels",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "crew",
          "table_name": "vessels",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "length",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "manufacturer",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "max_atmosphering_speed",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "model",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "name",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "passengers",
          "table_name": "vessels",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "YES",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_class",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_type",
          "table_name": "vessels",
          "data_type": "character varying",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": null,
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  "vessels_in_films": [
      {
          "column_name": "_id",
          "table_name": "vessels_in_films",
          "data_type": "integer",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_in_films_pk",
          "constraint_type": "PRIMARY KEY",
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "film_id",
          "table_name": "vessels_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_in_films_fk1",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "films",
          "foreign_column": "_id"
      },
      {
          "column_name": "vessel_id",
          "table_name": "vessels_in_films",
          "data_type": "bigint",
          "character_maximum_length": null,
          "is_nullable": "NO",
          "constraint_name": "vessels_in_films_fk0",
          "constraint_type": "FOREIGN KEY",
          "foreign_table": "vessels",
          "foreign_column": "_id"
      }
  ]
}
*/