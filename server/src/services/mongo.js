const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:wRUCoUXLfHLIBGoN@cluster0.ht0yf.mongodb.net/nasa?retryWrites=true&w=majority';


mongoose.connection.once('open', () => {
    console.log('MongoDB connection Readey!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.connection.close();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
