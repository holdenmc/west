import { Express } from 'express';
import * as UserCtrl from '../controllers/UserCtrl';


export const register = (app: Express) => {
    // Create a user
    app.post('/v1/user', UserCtrl.createUser);

    // Update a user
    app.put('/v1/user', UserCtrl.updateUser);

    // Get a user by id
    app.get('/v1/user/:id', UserCtrl.getUserById);

    // Get the logged in user
    app.get('/v1/current_user', UserCtrl.getLoggedInUser);

    // Authenticate a user
    app.get('/v1/login', UserCtrl.login);

    // List all online users
    app.get('/v1/online_users', UserCtrl.listOnlineUsers);
};