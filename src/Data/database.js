const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(
            mongoUri
        );
        console.log('Banco conectado');
    } catch (err) {
        console.log(err);
        process.exit(1); 
    }
};

module.exports = connectDB;
