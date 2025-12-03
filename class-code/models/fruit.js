const mongoose = require('mongoose')

// Schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean
})


// Model
const Fruit = mongoose.model('Fruit',fruitSchema)

module.exports = Fruit