import { RequestHandler, Request, Response, NextFunction } from 'express';
import { model as User, IUser } from '../models/user';
import crypto from 'crypto';
import _ from 'lodash';

const ns = '@UserCtrl';

// TODO: Validate inputs via regex
const validateName = (name: string): boolean => {
    const nameRegex = /asdfasdf/;
    return nameRegex.test(name);
};

const validatePassword = (password: string): boolean => {
    const passwordRegex = /foooo/;
    return passwordRegex.test(password) && password.length > 8;
};

const validateEmail = (email: string): boolean => {
    const emailRegex = /foo/;
    return emailRegex.test(email);
};

const getUserSafeFields = (user: IUser): Partial<IUser> => {
    return _.pick(user, 'name', 'email');
};

const ensureUniqueness = async (params: { name?: string; email?: string }) => {
    const { name, email } = params;
    let nameCount = 0, emailCount = 0;
    if (name) {
        nameCount = await User.countDocuments({ name });
    }
    if (email) {
        emailCount = await User.countDocuments({ email });
    }
    return { nameCount, emailCount };
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
        const { nameCount, emailCount } = await ensureUniqueness({ name, email });
        if (nameCount !== 0) {
            return res.status(400).send('User name is taken by another user. Choose another.');
        }
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

    // Only allow updates of logged in user
    if (userId !== req.user._id.toString()) {
        return res.sendStatus(401);
    }

    (async () => {
        // Only send the new values
        const { name, password, email } = req.body;

        if (email && !validateEmail(email)) {
            console.log(logCtx, `invalid email`, { email });
            return res.status(400).send('Invalid email');
        }

        if (name && !validateName(name)) {
            console.log(logCtx, `invalid user name`, { name });
            return res.status(400).send('Invalid user name');
        }

        if (password && !validatePassword(password)) {
            console.log(logCtx, `invalid passowrd`, { password });
            return res.status(400).send('Invalid password');
        }

        // Check if a user with that email or name exists
        const { nameCount, emailCount } = await ensureUniqueness({ name, email });
        if (nameCount !== 0) {
            return res.status(400).send('User name is taken by another user. Choose another.');
        }
        if (emailCount !== 0) {
            return res.status(400).send('Email is already registered with another user. Please login as that user.');
        }
        const update: any = { $set: {} };
        name ? update.$set.name = name : null;
        password ? update.$set.password = password : null;
        email ? update.$set.email = email : null;
        // TODO: hash password
        await User.update({ _id: req.params.id }, update);

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

    (async () => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        const user = await User.findOne({ name: username });

        if (!user) {
            return res.sendStatus(401);
        }

        // TODO Update password equality check once we're hashing
        if (user.password !== password) {
            return res.sendStatus(401);
        }

        return res.status(200).send({ accessToken: user.accessToken });
    })().catch(next);
};