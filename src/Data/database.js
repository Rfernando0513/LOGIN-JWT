const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@auth-jwt.gkxk1t6.mongodb.net/?retryWrites=true&w=majority&appName=AUTH-JWT`
        );
        console.log('Banco conectado');
    } catch (err) {
        console.log(err);
        process.exit(1); 
    }
};

module.exports = connectDB;
