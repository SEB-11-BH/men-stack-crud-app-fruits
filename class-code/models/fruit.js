const mongoose = require('mongoose')

// Schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    isReadyToEat: Boolean
})


// Model
const Fruit = mongoose.model('Fruit',fruitSchema)

module.exports = Fruit