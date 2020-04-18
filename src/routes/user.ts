import { Express, RequestHandler } from 'express';

const createUser: RequestHandler = (req, res, next) => {
        
};

const updateUser: RequestHandler = (req, res, next) => {

};

const listOnlineUsers: RequestHandler = (req, res, next) => {
    // TODO: Where to track this?
};

const getUserById: RequestHandler = (req, res, next) => {

};

const getLoggedInUser: RequestHandler = (req, res, next) => {

};

export const register = (app: Express) => {
    // Create a user
    app.post('/v1/user', createUser);

    // Update a user
    app.put('/v1/user', updateUser);

    // Get a user by id
    app.get('/v1/user/:id', getUserById);

    // Get the logged in user
    app.get('/v1/current_user', getLoggedInUser);

    // List all online users
    app.get('/v1/online_users', listOnlineUsers);
};