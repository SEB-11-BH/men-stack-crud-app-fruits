// imports
const express = require("express") //importing express package
const app = express() // creates a express application
require("dotenv").config() // allows us to use the .env variables
const mongoose = require("mongoose") // importing mongoose
const Fruit = require('./models/fruit')

app.use(express.static('public')); //all static files are in the public folder






async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}




conntectToDB() // connect to database








// Routes go here

app.get('/',(req,res)=>{
    res.render('home.ejs')
})


// CREATE
app.get('/fruits/new',(req,res)=>{
    res.render('fruits/new.ejs')
})




app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000