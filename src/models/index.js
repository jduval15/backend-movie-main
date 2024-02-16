const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");



Movie.belongsToMany(Genre, { through: 'moviesGenre'});
Genre.belongsToMany(Movie, { through: 'moviesGenre'});  

Movie.belongsToMany(Actor, { through: 'moviesActor'});
Actor.belongsToMany(Movie, { through: 'moviesActor'}); 

Movie.belongsToMany(Director, { through: 'moviesDirector'});
Director.belongsToMany(Movie, { through: 'moviesDirector'});  