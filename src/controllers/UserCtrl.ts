import { RequestHandler, Request, Response, NextFunction } from 'express';
import { model as User, IUser } from '../models/user';
import crypto from 'crypto';
import _ from 'lodash';

const ns = '@UserCtrl';

// TODO: Validate inputs via regex
const validateName = (name: string): boolean => {
    return true;
};

const validatePassword = (password: string): boolean => {
    return true;
};

const validateEmail = (email: string): boolean => {
    return true;
};

const getUserSafeFields = (user: IUser): Partial<IUser> => {
    return _.pick(user, 'name', 'email');
};

export const createUser: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.createUser`;
    (async () => {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            console.log(logCtx, `did not find all required fields`, { ...req.body });
            return res.status(400).send('Please fill out all required fields');
        }

        if (!validateEmail(email)) {
            console.log(logCtx, `invalid email`, { email });
            return res.status(400).send('Invalid email');
        }

        if (!validateName(name)) {
            console.log(logCtx, `invalid user name`, { name });
            return res.status(400).send('Invalid user name');
        }

        if (!validatePassword(password)) {
            console.log(logCtx, `invalid passowrd`, { password });
            return res.status(400).send('Invalid password');
        }

        // Check if a user with that email or name exists
        const nameCount = await User.countDocuments({ name });
        if (nameCount !== 0) {
            return res.status(400).send('User name is taken by another user. Choose another.');
        }
        const emailCount = await User.countDocuments({ email });
        if (emailCount !== 0) {
            return res.status(400).send('Email is already registered with another user. Please login as that user.');
        }

        // TODO: hash password
        // TODO: Rethink access tokens
        const accessToken = crypto.randomBytes(48).toString('hex');
        await User.create({ email, name, password, accessToken });

        return res.status(200).send({ accessToken });
    })().catch(next);
};

export const updateUser: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.updateUser`;

    const userId = req.params.id;

    if (userId !== req.user._id.toString()) {
        // can't update another user
        return res.sendStatus(401);
    }

    (async () => {
        // TODO: Validate inputs
        // TODO: hash password
        // TODO: Check that name and email don't exist elsewhere
        await User.update({ _id: req.params.id }, { 
            $set: {  
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            }
        });

        return res.sendStatus(200);
    })().catch(next);
};

export const listOnlineUsers: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.listOnlineUsers`;
    // TODO: Where to track this? Tracked via socket?
};

export const getUserById: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.getUserById`;

    if (!req.params.id) {
        return res.sendStatus(400);
    }

    (async () => {
        const foundUser = await User.findById(req.params.id);
        const user = getUserSafeFields(foundUser);
        return res.status(200).send({ user });
    })().catch(next);
};

export const getLoggedInUser: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.getLoggedInUser`;
    const user = getUserSafeFields(req.user);
    return res.status(200).send({ user });
};

export const login: RequestHandler = (req, res, next) => {
    const logCtx = `${ns}.login`;
};