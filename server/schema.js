const { makeExecutableSchema } = require('graphql-tools');
const { Pool } = require('pg');
const PG_URI =
  'postgres://xhbuwbzf:uZ3J63X-KzPV6EZckyG6jntKlJF4kk23@fanny.db.elephantsql.com/xhbuwbzf';

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {};
db.query = (text, params, callback) => {
  console.log('executed query:', text);
  return pool.query(text, params, callback);
};

const typeDefs = `
  type Query {
    people: [Person!]!
    person(_id: ID!): Person!
    films: [Film!]!
    film(_id: ID!): Film!
    planets: [Planet!]!
    planet(_id: ID!): Planet!
    species: [Species!]!
    speciesById(_id: ID!): Species!
    vessels: [Vessel!]!
    vessel(_id: ID!): Vessel!
    starshipSpecs: [StarshipSpec!]!
    starshipSpec(_id: ID!): StarshipSpec!
  }

  type Mutation {
    addPerson(
      gender: String,
      species_id: ID,
      homeworld_id: ID,
      height: Int,
      mass: String,
      hair_color: String,
      skin_color: String,
      eye_color: String,
      name: String!,
      birth_year: String,
    ): Person!

    updatePerson(
      gender: String,
      species_id: ID,
      homeworld_id: ID,
      height: Int,
      _id: ID!,
      mass: String,
      hair_color: String,
      skin_color: String,
      eye_color: String,
      name: String,
      birth_year: String,
    ): Person!

    addFilm(
      director: String!,
      opening_crawl: String!,
      episode_id: Int!,
      title: String!,
      release_date: String!,
      producer: String!,
    ): Film!

    updateFilm(
      director: String,
      opening_crawl: String,
      episode_id: Int,
      _id: ID!,
      title: String,
      release_date: String,
      producer: String,
    ): Film!


    addPlanet(
      orbital_period: Int,
      climate: String,
      gravity: String,
      terrain: String,
      surface_water: String,
      population: String,
      name: String,
      rotation_period: Int,
      diameter: Int,
    ): Planet!

    updatePlanet(
      orbital_period: Int,
      climate: String,
      gravity: String,
      terrain: String,
      surface_water: String,
      population: String,
      _id: ID!,
      name: String,
      rotation_period: Int,
      diameter: Int,
    ): Planet!


    addSpecies(
      hair_colors: String,
      name: String!,
      classification: String,
      average_height: String,
      average_lifespan: String,
      skin_colors: String,
      eye_colors: String,
      language: String,
      homeworld_id: ID,
    ): Species!

    updateSpecies(
      hair_colors: String,
      name: String,
      classification: String,
      average_height: String,
      average_lifespan: String,
      skin_colors: String,
      eye_colors: String,
      language: String,
      homeworld_id: ID,
      _id: ID!,
    ): Species!


    addVessel(
      cost_in_credits: String,
      length: String,
      vessel_type: String!,
      model: String,
      manufacturer: String,
      name: String!,
      vessel_class: String!,
      max_atmosphering_speed: String,
      crew: Int,
      passengers: Int,
      cargo_capacity: String,
      consumables: String,
    ): Vessel!

    updateVessel(
      cost_in_credits: String,
      length: String,
      vessel_type: String,
      model: String,
      manufacturer: String,
      name: String,
      vessel_class: String,
      max_atmosphering_speed: String,
      crew: Int,
      passengers: Int,
      cargo_capacity: String,
      consumables: String,
      _id: ID!,
    ): Vessel!


    addStarshipSpec(
      vessel_id: ID!,
      MGLT: String,
      hyperdrive_rating: String,
    ): StarshipSpec!

    updateStarshipSpec(
      _id: ID!,
      vessel_id: ID,
      MGLT: String,
      hyperdrive_rating: String,
    ): StarshipSpec!

  }

type Person {
  _id: ID!
  gender: String
  height: Int
  mass: String
  hair_color: String
  skin_color: String
  eye_color: String
  name: String!
  birth_year: String
  species: [Species]
  planets: [Planet]
  films: [Film]
  vessels: [Vessel]
}

type Film {
  _id: ID!
  director: String!
  opening_crawl: String!
  episode_id: Int!
  title: String!
  release_date: String!
  producer: String!
  planets: [Planet]
  people: [Person]
  vessels: [Vessel]
  species: [Species]
}

type Planet {
  _id: ID!
  orbital_period: Int
  climate: String
  gravity: String
  terrain: String
  surface_water: String
  population: String
  name: String
  rotation_period: Int
  diameter: Int
  films: [Film]
  species: [Species]
  people: [Person]
}

type Species {
  _id: ID!
  hair_colors: String
  name: String!
  classification: String
  average_height: String
  average_lifespan: String
  skin_colors: String
  eye_colors: String
  language: String
  planets: [Planet]
  people: [Person]
  films: [Film]
}

type Vessel {
  _id: ID!
  cost_in_credits: String
  length: String
  vessel_type: String!
  model: String
  manufacturer: String
  name: String!
  vessel_class: String!
  max_atmosphering_speed: String
  crew: Int
  passengers: Int
  cargo_capacity: String
  consumables: String
  films: [Film]
  people: [Person]
  starshipSpecs: [StarshipSpec]
}

type StarshipSpec {
  _id: ID!
  MGLT: String
  hyperdrive_rating: String
  vessels: [Vessel]
}

`;

const resolvers = {
  Query: {
    person: (parent, args) => {
      const query = 'SELECT * FROM people WHERE _id = $1';
      const values = [args._id];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    people: () => {
      const query = 'SELECT * FROM people';
      return db
        .query(query)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },

    film: (parent, args) => {
      const query = 'SELECT * FROM films WHERE _id = $1';
      const values = [args._id];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    films: () => {
      const query = 'SELECT * FROM films';
      return db
        .query(query)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },

    planet: (parent, args) => {
      const query = 'SELECT * FROM planets WHERE _id = $1';
      const values = [args._id];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    planets: () => {
      const query = 'SELECT * FROM planets';
      return db
        .query(query)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },

    speciesById: (parent, args) => {
      const query = 'SELECT * FROM species WHERE _id = $1';
      const values = [args._id];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    species: () => {
      const query = 'SELECT * FROM species';
      return db
        .query(query)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },

    vessel: (parent, args) => {
      const query = 'SELECT * FROM vessels WHERE _id = $1';
      const values = [args._id];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    vessels: () => {
      const query = 'SELECT * FROM vessels';
      return db
        .query(query)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },

    starshipSpec: (parent, args) => {
      const query = 'SELECT * FROM starship_specs WHERE _id = $1';
      const values = [args._id];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    starshipSpecs: () => {
      const query = 'SELECT * FROM starship_specs';
      return db
        .query(query)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
  },

  Mutation: {
    addPerson: (parent, args) => {
      const query =
        'INSERT INTO people (gender, species_id, homeworld_id, height, mass, hair_color, skin_color, eye_color, name, birth_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const values = [
        args.gender,
        args.species_id,
        args.homeworld_id,
        args.height,
        args.mass,
        args.hair_color,
        args.skin_color,
        args.eye_color,
        args.name,
        args.birth_year,
      ];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    updatePerson: (parent, args) => {
      let valList = [];
      console.log('updatePerson args obj', args);
      for (const key of Object.keys(args)) {
        if (key !== '_id') valList.push(args[key]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((key) => key !== '_id');
      let setString = argsArray
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');
      const pKArg = `$${argsArray.length + 1}`;
      const query = `UPDATE people SET ${setString} WHERE _id = ${pKArg} RETURNING *`;
      const values = valList;
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    addFilm: (parent, args) => {
      const query =
        'INSERT INTO films (director, opening_crawl, episode_id, title, release_date, producer) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const values = [
        args.director,
        args.opening_crawl,
        args.episode_id,
        args.title,
        args.release_date,
        args.producer,
      ];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    updateFilm: (parent, args) => {
      let valList = [];
      for (const key of Object.keys(args)) {
        if (key !== '_id') valList.push(args[key]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((key) => key !== '_id');
      let setString = argsArray
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');
      const pKArg = `$${argsArray.length + 1}`;
      const query = `UPDATE films SET ${setString} WHERE _id = ${pKArg} RETURNING *`;
      const values = valList;
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    addPlanet: (parent, args) => {
      const query =
        'INSERT INTO planets (orbital_period, climate, gravity, terrain, surface_water, population, name, rotation_period, diameter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const values = [
        args.orbital_period,
        args.climate,
        args.gravity,
        args.terrain,
        args.surface_water,
        args.population,
        args.name,
        args.rotation_period,
        args.diameter,
      ];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    updatePlanet: (parent, args) => {
      let valList = [];
      for (const key of Object.keys(args)) {
        if (key !== '_id') valList.push(args[key]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((key) => key !== '_id');
      let setString = argsArray
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');
      const pKArg = `$${argsArray.length + 1}`;
      const query = `UPDATE planets SET ${setString} WHERE _id = ${pKArg} RETURNING *`;
      const values = valList;
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    addSpecies: (parent, args) => {
      const query =
        'INSERT INTO species (hair_colors, name, classification, average_height, average_lifespan, skin_colors, eye_colors, language, homeworld_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const values = [
        args.hair_colors,
        args.name,
        args.classification,
        args.average_height,
        args.average_lifespan,
        args.skin_colors,
        args.eye_colors,
        args.language,
        args.homeworld_id,
      ];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    updateSpecies: (parent, args) => {
      let valList = [];
      for (const key of Object.keys(args)) {
        if (key !== '_id') valList.push(args[key]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((key) => key !== '_id');
      let setString = argsArray
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');
      const pKArg = `$${argsArray.length + 1}`;
      const query = `UPDATE species SET ${setString} WHERE _id = ${pKArg} RETURNING *`;
      const values = valList;
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    addVessel: (parent, args) => {
      const query =
        'INSERT INTO vessels (cost_in_credits, length, vessel_type, model, manufacturer, name, vessel_class, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
      const values = [
        args.cost_in_credits,
        args.length,
        args.vessel_type,
        args.model,
        args.manufacturer,
        args.name,
        args.vessel_class,
        args.max_atmosphering_speed,
        args.crew,
        args.passengers,
        args.cargo_capacity,
        args.consumables,
      ];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    updateVessel: (parent, args) => {
      let valList = [];
      for (const key of Object.keys(args)) {
        if (key !== '_id') valList.push(args[key]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((key) => key !== '_id');
      let setString = argsArray
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');
      const pKArg = `$${argsArray.length + 1}`;
      const query = `UPDATE vessels SET ${setString} WHERE _id = ${pKArg} RETURNING *`;
      const values = valList;
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    addStarshipSpec: (parent, args) => {
      const query =
        'INSERT INTO starship_specs (vessel_id, MGLT, hyperdrive_rating) VALUES ($1, $2, $3) RETURNING *';
      const values = [args.vessel_id, args.MGLT, args.hyperdrive_rating];
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },

    updateStarshipSpec: (parent, args) => {
      let valList = [];
      for (const key of Object.keys(args)) {
        if (key !== '_id') valList.push(args[key]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((key) => key !== '_id');
      let setString = argsArray
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');
      const pKArg = `$${argsArray.length + 1}`;
      const query = `UPDATE starship_specs SET ${setString} WHERE _id = ${pKArg} RETURNING *`;
      const values = valList;
      return db
        .query(query, values)
        .then((data) => data.rows[0])
        .catch((err) => new Error(err));
    },
  },

  Person: {
    films: (people) => {
      const query =
        'SELECT * FROM films LEFT OUTER JOIN people_in_films ON films._id = people_in_films.film_id WHERE people_in_films.person_id = $1';
      const values = [people._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    species: (people) => {
      const query =
        'SELECT species.* FROM species LEFT OUTER JOIN people ON species._id = people.species_id WHERE people._id = $1';
      const values = [people._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    planets: (people) => {
      const query =
        'SELECT planets.* FROM planets LEFT OUTER JOIN people ON planets._id = people.homeworld_id WHERE people._id = $1';
      const values = [people._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    vessels: (people) => {
      const query =
        'SELECT * FROM vessels LEFT OUTER JOIN pilots ON vessels._id = pilots.vessel_id WHERE pilots.person_id = $1';
      const values = [people._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
  },

  Film: {
    planets: (films) => {
      const query =
        'SELECT * FROM planets LEFT OUTER JOIN planets_in_films ON planets._id = planets_in_films.planet_id WHERE planets_in_films.film_id = $1';
      const values = [films._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    people: (films) => {
      const query =
        'SELECT * FROM people LEFT OUTER JOIN people_in_films ON people._id = people_in_films.person_id WHERE people_in_films.film_id = $1';
      const values = [films._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    vessels: (films) => {
      const query =
        'SELECT * FROM vessels LEFT OUTER JOIN vessels_in_films ON vessels._id = vessels_in_films.vessel_id WHERE vessels_in_films.film_id = $1';
      const values = [films._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    species: (films) => {
      const query =
        'SELECT * FROM species LEFT OUTER JOIN species_in_films ON species._id = species_in_films.species_id WHERE species_in_films.film_id = $1';
      const values = [films._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
  },

  Planet: {
    films: (planets) => {
      const query =
        'SELECT * FROM films LEFT OUTER JOIN planets_in_films ON films._id = planets_in_films.film_id WHERE planets_in_films.planet_id = $1';
      const values = [planets._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    species: (planets) => {
      const query = 'SELECT * FROM species WHERE homeworld_id = $1';
      const values = [planets._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    people: (planets) => {
      const query = 'SELECT * FROM people WHERE homeworld_id = $1';
      const values = [planets._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
  },

  Species: {
    people: (species) => {
      const query = 'SELECT * FROM people WHERE species_id = $1';
      const values = [species._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    planets: (species) => {
      const query =
        'SELECT planets.* FROM planets LEFT OUTER JOIN species ON planets._id = species.homeworld_id WHERE species._id = $1';
      const values = [species._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    films: (species) => {
      const query =
        'SELECT * FROM films LEFT OUTER JOIN species_in_films ON films._id = species_in_films.film_id WHERE species_in_films.species_id = $1';
      const values = [species._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
  },

  Vessel: {
    films: (vessels) => {
      const query =
        'SELECT * FROM films LEFT OUTER JOIN vessels_in_films ON films._id = vessels_in_films.film_id WHERE vessels_in_films.vessel_id = $1';
      const values = [vessels._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    people: (vessels) => {
      const query =
        'SELECT * FROM people LEFT OUTER JOIN pilots ON people._id = pilots.person_id WHERE pilots.vessel_id = $1';
      const values = [vessels._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
    starshipSpecs: (vessels) => {
      const query = 'SELECT * FROM starship_specs WHERE vessel_id = $1';
      const values = [vessels._id];
      return db
        .query(query, values)
        .then((data) => data.rows)
        .catch((err) => new Error(err));
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  // allowUndefinedInResolve: false,
  // resolverValidationOptions: {
  //   // requireResolversForArgs: 'error',
  //   // requireResolversForAllFields: 'warn',
  // },
});

module.exports = schema;
