const mongoose = require('mongoose');
require('dotenv').config();

//const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Fernando0513:Hayashi0513$@auth-jwt.gkxk1t6.mongodb.net/?retryWrites=true&w=majority&appName=AUTH-JWT')
        console.log('Banco conectado');
    } catch (err) {
        console.log('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
