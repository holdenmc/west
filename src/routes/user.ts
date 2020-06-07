import { Express } from 'express';
import * as UserCtrl from '../controllers/UserCtrl';
import * as middlewares from './middlewares';

export const register = (app: Express) => {
    // Create a user
    app.post('/v1/users', UserCtrl.createUser);

    // Update a user
    app.put('/v1/users/:id', middlewares.isLoggedIn, UserCtrl.updateUser);

    // Get a user by id
    app.get('/v1/users/:id', middlewares.isLoggedIn, UserCtrl.getUserById);

    // Get the logged in user
    app.get('/v1/current_user', middlewares.isLoggedIn, UserCtrl.getLoggedInUser);

    // Authenticate a user
    app.get('/v1/login', UserCtrl.login);

    // List all online users
    // app.get('/v1/online_users', middlewares.isLoggedIn, UserCtrl.listOnlineUsers);
};