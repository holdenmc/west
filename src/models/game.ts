import mongoose, { Document, Model } from 'mongoose';

export interface ITeam {
    score: number;
    players: any[];
}

export interface IRound {
    dealer: any;
    team1score: number;
    team2score: number;
    bet: {
        value: number;
        suit: number;
        player: any;
    }
    currentHand: {
        card: {
            rank: number;
            suit: number;
        };
        player: any;
    }[];
}

export interface IGame {
    _id: any;
    name: string;
    password?: string;
    owner: any;
    players: any[];
    team1?: ITeam;
    team2?: ITeam;
    currentRound?: IRound;
}

export interface IMongooseGame extends IGame, Document {}
export interface IMongooseGameModel extends Model<IMongooseGame> {}

const modelName = 'Game';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: String,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },

    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],

    team1: {
        score: {
            type: Number,
            default: 0,
        },
        players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        }],
    },
    team2: {
        score: {
            type: Number,
            default: 0,
        },
        players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        }],
    },

    currentRound: {
        dealer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        bet: {
            value: Number,
            suit: Number,
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            }
        },
        team1score: Number,
        team2score: Number,
        currentHand: [{
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
            card: {
                rank: Number,
                suit: Number,
            }
        }],
    }
}, {
    collection: 'games'
});

schema.index({ owner: 1 });
schema.index({ players: 1 });

export const model = mongoose.model<IMongooseGame>(modelName, schema);