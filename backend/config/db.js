const mongoose = require('mongoose');
const config = require('config');
const db = config.get ('mongoURI');
//using async-away protocol instead of promises
const connectDB = async () => { 
    try {
        await mongoose.connect(db)
        
        console.log('Database Connection successfully established!');
    }
    catch (err){
        console.log('Database connection failed. Reason of error: /n');
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;