import { RequestHandler } from 'express';
import { model as User } from '../models/user';

const ns = '@UserCtrl';

export const createUser: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.createUser`;
    (async () => {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            console.log(logCtx, `did not find all required fields`, { ...req.body });
            return res.status(400).send('Please fill out all required fields');
        }

        // Check if a user with that email or name exists
        const nameCount = await User.count({ name });
        if (nameCount !== 0) {
            return res.status(400).send('User name is taken by another user. Choose another.');
        }
        const emailCount = await User.count({ email });
        if (emailCount !== 0) {
            return res.status(400).send('Email is already registered with another user. Please login as that user.');
        }

        // TODO: hash password
        // TODO: Create access token
        const user = await User.create({ email, name, password });

        return res.status(200).send({ success: true });
    })().catch(next);
};

export const updateUser: RequestHandler = (req, res, next) => {

};

export const listOnlineUsers: RequestHandler = (req, res, next) => {
    // TODO: Where to track this? Tracked via socket?
};

export const getUserById: RequestHandler = (req, res, next) => {

};

export const getLoggedInUser: RequestHandler = (req, res, next) => {

};

export const login: RequestHandler = (req, res, next) => {
    
};