import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
    _id: any;
    name: string;
    email: string;
    password: string;
    accessToken: string;
}

export interface IMongooseUser extends IUser, Document {}
export interface IMongooseUserModel extends Model<IMongooseUser> {}

const modelName = 'User';

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String, // TODO: hash this
    accessToken: String,
}, {
    collection: 'users'
});

schema.index({ accessToken: 1 });

export const model = mongoose.model<IMongooseUser>(modelName, schema);