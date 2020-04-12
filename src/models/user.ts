import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
    _id: any;
    name: string;
    email: string;
    password: string;
}

export interface IMongooseUser extends IUser, Document {}
export interface IMongooseUserModel extends Model<IMongooseUser> {}

const modelName = 'User';

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // TODO: hash this
}, {
    collection: 'users'
});

export const model = mongoose.model<IMongooseUser>(modelName, schema);