const mongoose = require('mongoose');
const PersonSchema = require('./Person');
const GameSchema = require('./Game');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const Game = mongoose.model('Game', GameSchema);
const Person = mongoose.model('Person', PersonSchema);

module.exports = {
  Person,
  Game,
  db
}
