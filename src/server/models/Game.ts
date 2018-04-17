const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CardSchema = mongoose.Schema({
  suit: String,
  value: Number // 2 - 14 (Ace)
});

const PersonGameSchema = mongoose.Schema({
  personId: ObjectId,
  team: Number,
  cards: [CardSchema]
});

const TrickSchema = mongoose.Schema({
  //In order of who played, next card played is pushed onto end
  cards: [{ 
    card: CardSchema,
    player: ObjectId
  }]
});

const RoundSchema = mongoose.Schema({
  tricks: [TrickSchema],
  bet: {
    team: Number,
    bet: Number
  },
  trumpSuit: String
});

const GameSchema = mongoose.Schema({
  player1: {
    type: PersonGameSchema,
    required: true
  },
  player2: {
    type: PersonGameSchema,
    required: true
  },
  player3: {
    type: PersonGameSchema,
    required: true
  },
  player4: {
    type: PersonGameSchema,
    required: true
  },

  score: {
    team1: Number,
    team2: Number
  },

  turn: ObjectId, //Player Id of whose turn it is

  currentRound: RoundSchema,

  previousRounds: [RoundSchema]
});

module.exports = GameSchema;
