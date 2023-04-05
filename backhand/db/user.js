const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const product = mongoose.model('user', Userschema);

module.exports = product;