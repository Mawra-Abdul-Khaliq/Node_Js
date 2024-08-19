const express = require('express')
const app = express()
const db= require('./db')
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
require('dotenv').config();


const bodyParser = require('body-parser')
app.use(bodyParser.json())  //we use "app.use()" for middleware  // its stores in req.body

app.get('/', function(req,res){
    res.send("Welcome to my Resturant....!")
})

// Accessing person and menu routes functions
app.use('/person', personRoutes)
app.use('/menu', menuRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Litening on port 3000')
})