/* MVP
const resolvers = {
  Query: {
    planet: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    planets: () => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    film: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    films: () => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    speciesById: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    species: () => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    vessel: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    vessels: () => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    person: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    people: () => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    starshipSpec: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    starshipSpecs: () => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  
  Mutation: {
    addPlanet: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    updatePlanet: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    deletePlanet: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    addFilm: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    updateFilm: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    deleteFilm: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    addSpecies: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    updateSpecies: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    addVessel: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    updateVessel: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    deleteVessel: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    addPerson: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    updatePerson: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    deletePerson: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    addStarshipSpec: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    updateStarshipSpec: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    deleteStarshipSpec: (parent, args, context, info) => {
      const query = 'DELETE FROM starship_specs WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
  },
  
  Planet: {
    people: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    films: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    species: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Film: {
    people: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    planets: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    species: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    vessels: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Species: {
    people: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    planets: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    films: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Vessel: {
    people: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    starshipSpecs: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    films: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Person: {
    planets: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    species: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    films: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
    vessels: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  StarshipSpec: {
    vessels: (parent, args, context, info) => {
      try {
        // insert sql query here
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
*/

/* IDEAL
const resolvers = {
  Query: {
    planet: (parent, args, context, info) => {
      const query = 'SELECT * FROM planets WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    planets: () => {
      const query = 'SELECT * FROM planets';
      return db.query(query)
        .then(data => data.rows)
        .catch(err =>new Error(err));
    },
    film: (parent, args, context, info) => {
      const query = 'SELECT * FROM films WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    films: () => {
      const query = 'SELECT * FROM films';
      return db.query(query)
        .then(data => data.rows)
        .catch(err =>new Error(err));
    },
    speciesById: (parent, args, context, info) => {
      const query = 'SELECT * FROM species WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    species: () => {
      const query = 'SELECT * FROM species';
      return db.query(query)
        .then(data => data.rows)
        .catch(err =>new Error(err));
    },
    vessel: (parent, args, context, info) => {
      const query = 'SELECT * FROM vessels WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    vessels: () => {
      const query = 'SELECT * FROM vessels';
      return db.query(query)
        .then(data => data.rows)
        .catch(err =>new Error(err));
    },
    person: (parent, args, context, info) => {
      const query = 'SELECT * FROM people WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    people: () => {
      const query = 'SELECT * FROM people';
      return db.query(query)
        .then(data => data.rows)
        .catch(err =>new Error(err));
    },
    starshipSpec: (parent, args, context, info) => {
      const query = 'SELECT * FROM starship_specs WHERE _id = $1';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    starshipSpecs: () => {
      const query = 'SELECT * FROM starship_specs';
      return db.query(query)
        .then(data => data.rows)
        .catch(err =>new Error(err));
    },
  },
  
  Mutation: {
    addPlanet: (parent, args, context, info) => {
      const query = 'INSERT INTO planets (_id, name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const values = (args._id,args.name,args.rotation_period,args.orbital_period,args.diameter,args.climate,args.gravity,args.terrain,args.surface_water,args.population);
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    updatePlanet: (parent, args, context, info) => {
      let valList = [];
      for (const updateKey of Object.keys(args)) {
        if (updateKey !== '_id') valList.push(args[updateKey]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((el) => el !== '_id');
      let setString = argsArray.map((x, i) => x + ' = $' + (i + 1)).join(', ');
      const pKArg = '$'+ (argsArray.length + 1);
      const query = 'UPDATE planets SET '+ setString +' WHERE _id = '+pKArg+' RETURNING *';
      const values = valList; 
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    deletePlanet: (parent, args, context, info) => {
      const query = 'DELETE FROM planets WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    addFilm: (parent, args, context, info) => {
      const query = 'INSERT INTO films (_id, title, episode_id, opening_crawl, director, producer, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = (args._id,args.title,args.episode_id,args.opening_crawl,args.director,args.producer,args.release_date);
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    updateFilm: (parent, args, context, info) => {
      let valList = [];
      for (const updateKey of Object.keys(args)) {
        if (updateKey !== '_id') valList.push(args[updateKey]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((el) => el !== '_id');
      let setString = argsArray.map((x, i) => x + ' = $' + (i + 1)).join(', ');
      const pKArg = '$'+ (argsArray.length + 1);
      const query = 'UPDATE films SET '+ setString +' WHERE _id = '+pKArg+' RETURNING *';
      const values = valList; 
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    deleteFilm: (parent, args, context, info) => {
      const query = 'DELETE FROM films WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    addSpecies: (parent, args, context, info) => {
      const query = 'INSERT INTO species (_id, name, classification, average_height, average_lifespan, hair_colors, skin_colors, eye_colors, language, homeworld_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
      const values = (args._id,args.name,args.classification,args.average_height,args.average_lifespan,args.hair_colors,args.skin_colors,args.eye_colors,args.language,args.homeworld_id);
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    updateSpecies: (parent, args, context, info) => {
      let valList = [];
      for (const updateKey of Object.keys(args)) {
        if (updateKey !== '_id') valList.push(args[updateKey]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((el) => el !== '_id');
      let setString = argsArray.map((x, i) => x + ' = $' + (i + 1)).join(', ');
      const pKArg = '$'+ (argsArray.length + 1);
      const query = 'UPDATE species SET '+ setString +' WHERE _id = '+pKArg+' RETURNING *';
      const values = valList; 
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    deleteSpecies: (parent, args, context, info) => {
      const query = 'DELETE FROM species WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    addVessel: (parent, args, context, info) => {
      const query = 'INSERT INTO vessels (_id, name, manufacturer, model, vessel_type, vessel_class, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
      const values = (args._id,args.name,args.manufacturer,args.model,args.vessel_type,args.vessel_class,args.cost_in_credits,args.length,args.max_atmosphering_speed,args.crew,args.passengers,args.cargo_capacity,args.consumables);
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    updateVessel: (parent, args, context, info) => {
      let valList = [];
      for (const updateKey of Object.keys(args)) {
        if (updateKey !== '_id') valList.push(args[updateKey]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((el) => el !== '_id');
      let setString = argsArray.map((x, i) => x + ' = $' + (i + 1)).join(', ');
      const pKArg = '$'+ (argsArray.length + 1);
      const query = 'UPDATE vessels SET '+ setString +' WHERE _id = '+pKArg+' RETURNING *';
      const values = valList; 
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    deleteVessel: (parent, args, context, info) => {
      const query = 'DELETE FROM vessels WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    addPerson: (parent, args, context, info) => {
      const query = 'INSERT INTO people (_id, name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
      const values = (args._id,args.name,args.mass,args.hair_color,args.skin_color,args.eye_color,args.birth_year,args.gender,args.species_id,args.homeworld_id,args.height);
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    updatePerson: (parent, args, context, info) => {
      let valList = [];
      for (const updateKey of Object.keys(args)) {
        if (updateKey !== '_id') valList.push(args[updateKey]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((el) => el !== '_id');
      let setString = argsArray.map((x, i) => x + ' = $' + (i + 1)).join(', ');
      const pKArg = '$'+ (argsArray.length + 1);
      const query = 'UPDATE people SET '+ setString +' WHERE _id = '+pKArg+' RETURNING *';
      const values = valList; 
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    deletePerson: (parent, args, context, info) => {
      const query = 'DELETE FROM people WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    addStarshipSpec: (parent, args, context, info) => {
      const query = 'INSERT INTO starship_specs (_id, hyperdrive_rating, MGLT, vessel_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = (args._id,args.hyperdrive_rating,args.MGLT,args.vessel_id);
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    updateStarshipSpec: (parent, args, context, info) => {
      let valList = [];
      for (const updateKey of Object.keys(args)) {
        if (updateKey !== '_id') valList.push(args[updateKey]);
      }
      valList.push(args._id);
      const argsArray = Object.keys(args).filter((el) => el !== '_id');
      let setString = argsArray.map((x, i) => x + ' = $' + (i + 1)).join(', ');
      const pKArg = '$'+ (argsArray.length + 1);
      const query = 'UPDATE starship_specs SET '+ setString +' WHERE _id = '+pKArg+' RETURNING *';
      const values = valList; 
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
    deleteStarshipSpec: (parent, args, context, info) => {
      const query = 'DELETE FROM starship_specs WHERE _id = $1 RETURNING *';
      const values = [args._id];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },
  },
  Planet: {
    people: (parent, args, context, info) => {
      const query = 'SELECT * FROM people WHERE homeworld_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    films: (parent, args, context, info) => {
      const query = 'SELECT * FROM films LEFT OUTER JOIN planets_in_films ON films._id = planets_in_films.film_id WHERE planets_in_films.planet_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    species: (parent, args, context, info) => {
      const query = 'SELECT * FROM species WHERE homeworld_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
  Film: {
    people: (parent, args, context, info) => {
      const query = 'SELECT * FROM people LEFT OUTER JOIN people_in_films ON people._id = people_in_films.person_id WHERE people_in_films.film_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    planets: (parent, args, context, info) => {
      const query = 'SELECT * FROM planets LEFT OUTER JOIN planets_in_films ON planets._id = planets_in_films.planet_id WHERE planets_in_films.film_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    species: (parent, args, context, info) => {
      const query = 'SELECT * FROM species LEFT OUTER JOIN species_in_films ON species._id = species_in_films.species_id WHERE species_in_films.film_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    vessels: (parent, args, context, info) => {
      const query = 'SELECT * FROM vessels LEFT OUTER JOIN vessels_in_films ON vessels._id = vessels_in_films.vessel_id WHERE vessels_in_films.film_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
  Species: {
    people: (parent, args, context, info) => {
      const query = 'SELECT * FROM people WHERE species_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    planets: (parent, args, context, info) => {
      const query = 'SELECT planets.* FROM planets LEFT OUTER JOIN species ON planets._id = species.homeworld_id WHERE species._id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    films: (parent, args, context, info) => {
      const query = 'SELECT * FROM films LEFT OUTER JOIN species_in_films ON films._id = species_in_films.film_id WHERE species_in_films.species_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
  Vessel: {
    people: (parent, args, context, info) => {
      const query = 'SELECT * FROM people LEFT OUTER JOIN pilots ON people._id = pilots.person_id WHERE pilots.vessel_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    starshipSpecs: (parent, args, context, info) => {
      const query = 'SELECT * FROM starship_specs WHERE vessel_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    films: (parent, args, context, info) => {
      const query = 'SELECT * FROM films LEFT OUTER JOIN vessels_in_films ON films._id = vessels_in_films.film_id WHERE vessels_in_films.vessel_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
  Person: {
    planets: (parent, args, context, info) => {
      const query = 'SELECT planets.* FROM planets LEFT OUTER JOIN people ON planets._id = people.homeworld_id WHERE people._id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    species: (parent, args, context, info) => {
      const query = 'SELECT species.* FROM species LEFT OUTER JOIN people ON species._id = people.species_id WHERE people._id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    films: (parent, args, context, info) => {
      const query = 'SELECT * FROM films LEFT OUTER JOIN people_in_films ON films._id = people_in_films.film_id WHERE people_in_films.person_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
    vessels: (parent, args, context, info) => {
      const query = 'SELECT * FROM vessels LEFT OUTER JOIN pilots ON vessels._id = pilots.vessel_id WHERE pilots.person_id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
  StarshipSpec: {
    vessels: (parent, args, context, info) => {
      const query = 'SELECT vessels.* FROM vessels LEFT OUTER JOIN starship_specs ON vessels._id = starship_specs.vessel_id WHERE starship_specs._id = $1';
      const values = [parent, args, context, info._id];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },
  },
}
*/