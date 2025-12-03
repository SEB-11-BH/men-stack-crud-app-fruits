// imports
const express = require("express") //importing express package
const app = express() // creates a express application
require("dotenv").config() // allows us to use the .env variables
const mongoose = require("mongoose") // importing mongoose
const Fruit = require('./models/fruit')

app.use(express.static('public')); //all static files are in the public folder

app.use(express.urlencoded({ extended: false }));





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
    if(req.body.isReadyToEat){
        req.body.isReadyToEat = true
    }
    else{
        req.body.isReadyToEat = false
    }
    console.log(req.body)
    const createdFruit = await Fruit.create(req.body)


    res.redirect('/fruits/' + createdFruit._id )
})



// READ: all fruits
app.get('/fruits', async (req,res)=>{
    const allFruits = await Fruit.find()
    res.render('fruits/index.ejs',{allFruits})
})


app.get('/fruits/:id',async(req,res)=>{
    console.log(req.params.id)
    const {id} = req.params
    const foundFruit = await Fruit.findById(id)
    res.render('fruits/show.ejs',{foundFruit})
})

app.post('/fruits/:id/delete',async(req,res)=>{
    await Fruit.findByIdAndDelete(req.params.id)
    res.redirect('/fruits')

})



app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000