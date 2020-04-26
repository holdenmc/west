import { RequestHandler } from "express";

const ns = '@GameCtrl';

export const createGame: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.createGame`;
};

export const listGames: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.listGames`;
};

export const joinGame: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.listGames`;
};

export const updateGame: RequestHandler = (req, res, next) => {
    // Update name, password, teams
    const logCtx = `${ns}.listGames`;
};

export const getGame: RequestHandler = (req, res, next) => {

};

// Initiate a game
export const startGame: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.listGames`;
};

export const makeBet: RequestHandler = (req, res, next) => {

};

export const playCard: RequestHandler = (req, res, next) => {

};

