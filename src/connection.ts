// Establish connection to MongoDB
import mongoose from 'mongoose';

export const init = () => {
    // TODO: Actual connection to a database + config
    mongoose.connect('mongodb://localhost:27017/west', { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected!');
    });
};
