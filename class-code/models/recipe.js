const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true // requires this field
    },
    ingredients: {
        type: [String]
    },
    instructions: String,
    prepTime: Number,
    difficulty:{
        type: String,
        enum: ['easy','medium','hard'],
        default: 'easy'
    }
})