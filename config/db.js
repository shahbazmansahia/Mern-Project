const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
        useNewUrlParser: true
        });

        console.log('Mongo Connected!');
    }
    catch(err){
        console.error(err.message);
        // Since there's an error, we exit the process.
        process.exit(1);
    }
}

module.exports = connectDB;