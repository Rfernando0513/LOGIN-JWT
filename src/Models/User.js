const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    
});

const User = mongoose.model('User', {
    name: String,
    mail: String,
    password: String,
})

module.exports = User; 