// imports
const express = require("express") //importing express package
const app = express() // creates a express application
require("dotenv").config() // allows us to use the .env variables
const mongoose = require("mongoose") // importing mongoose
const Fruit = require('./models/fruit')
const methodOverride = require('method-override')
const morgan = require('morgan')

app.use(express.static('public')); //all static files are in the public folder

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_safa')) 

app.use(morgan('dev'))




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

app.post('/fruits', async (req,res)=>{

    try{
            if(req.body.isReadyToEat){
        req.body.isReadyToEat = true
    }
    else{
        req.body.isReadyToEat = false
    }
    console.log(req.body)
    const createdFruit = await Fruit.create(req.body)


    res.redirect('/fruits/' + createdFruit._id)


    }
    catch(err){
        console.log(err)
    }

})



// READ: all fruits
app.get('/fruits', async (req,res)=>{
    try{
        const allFruits = await Fruit.find()
        res.render('fruits/index.ejs',{allFruits})

    }
    catch(err){
        console.log(err)
    }
})


app.get('/fruits/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        const {id} = req.params
        const foundFruit = await Fruit.findById(id)
        res.render('fruits/show.ejs',{foundFruit})

    }
    catch(err){
        console.log(err)
    }
})

app.delete('/fruits/:id',async(req,res)=>{
    try{
        await Fruit.findByIdAndDelete(req.params.id)
        res.redirect('/fruits')

    }
    catch(err){
        console.log(err)
    }

})

app.get('/fruits/:id/edit',async(req,res)=>{
    try{
        const foundFruit = await Fruit.findById(req.params.id)
        res.render('fruits/edit.ejs',{fruit: foundFruit})

    }
    catch(err){
        console.log(err)
    }
})


app.put('/fruits/:id',async(req,res)=>{
    try{
        req.body.isReadyToEat = Boolean(req.body.isReadyToEat) // converts is ready to eat to a boolean
        const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/fruits/' + updatedFruit._id)


    }
    catch(err){
        console.log(err)
    }


})


app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000