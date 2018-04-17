import { RequestHandler } from 'express';

//How does the user know game data changed? maybe try using socket io

//Given a game id and player id, return their hand
const getHand: RequestHandler = (req, res, next) => {

};

//Given a game id, return the cards played so far to display
const getTrick: RequestHandler = (req, res, next) => {

};

//Given a game id, player id and card, remove it from their hand and put it in the current trick
const playCard: RequestHandler = (req, res, next) => {

};

//Should automatically be called when last card is played

//When a trick is completed, execute it
const executeTrick = (gameId) => {
  //Determine who won trick and update it in the db

  //Send messages to all players letting them know what happened

  //If last trick, call endRound
};

//Update scores after last trick
const endRound = (gameId) => {
  //Updates scores

  //Sends messages to all players about what happened, calls startRound
}

//Should automatically get called if, after a score check in executeTrick, the game isn't over
//Given a game id, set hands for each of the 4 players
const startRound = (gameId) => {
  //Shuffles deck
  //Assigns new cards to all players
  //Sends messages to all players letting them know their new cards

};

//Given a game id and a player id, marks the bet made by that player
const placeBet: RequestHandler = (req, res, next) => {

  //Call resolveBets if this was the last bet made
};

//Called once all 4 bets have been made
const resolveBets = () => {
  //Set the betting team and their bet
  //Send message to all about whos turn it is 
};

// Join the lobby (when 4 people in the game will start)
const joinLobby = () => {

};

// Sets up the Game document properly
const initializeGame = () => {
  
}
