const mongoose = require('mongoose')

const Productschema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId:String,
    company:String
});

const product2 = mongoose.model('products', Productschema);

module.exports = product2;