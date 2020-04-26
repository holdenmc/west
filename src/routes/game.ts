import { Express } from 'express';
import * as GameCtrl from '../controllers/GameCtrl';
import * as middlewares from './middlewares';

export const register = (app: Express) => {
    // Create a game
    app.post('/v1/games', middlewares.isLoggedIn)

    // Update game settings (just teams, for now)
};