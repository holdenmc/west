import { model as User } from '../models/user';

const ns = '@middlewares';

export const isLoggedIn = (req, res, next) => {
    const logCtx = `${ns}.isLoggedIn`;
    if (!req.body.accessToken) {
        console.log(logCtx, 'unauthorized request');
        return res.sendStatus(401);
    }

    (async () => {
        const user = await User.findOne({ accessToken: req.body.accessToken }).lean();

        if (!user) {
            console.log(logCtx, 'unauthorized request');
            return res.sendStatus(401);
        }

        console.log(logCtx, `found logged in user ${user.email}`);
        req.user = user;
        next();
    })().catch(next);
};