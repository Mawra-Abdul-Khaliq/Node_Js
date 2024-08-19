const mongoose = require('mongoose');
require('dotenv').config();
// Define mongoDB connection URL
// const mongoURL= process.env.MONGOODB_URL_LOCAL //here hotels is the database name
const mongoURL = process.env.MONGOODB_URL   //online database url
// setup mongo db connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,     //Mandatory Parameters
    useUnifiedTopology: true
})

const db = mongoose.connection;  //now use db variable to establish connections

// Event listners
db.on('connected', ()=>{
    console.log('Conected to MongoDB server');
})
db.on('error', (err)=>{
    console.log('MongoDB connection error', err);
})
db.on('disconnected', ()=>{
    console.log('Disconected to MongoDB server');
})

// Export database connection

module.exports = db;