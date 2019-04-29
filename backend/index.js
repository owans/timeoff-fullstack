const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv").config();
const EmployeeRoute = require('./routes/employeeRoute');
const env = require("./env");

const app = express();

//connect to mongodb instance
mongoose.connect(env.mongodb_url).then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the db', err);
})

app.use(cors());

//add middlewares for passing json and url encoded and populate req.body
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/user', EmployeeRoute);

app.listen(env.port).on('listening', () =>{
    console.log('💘 app is listening on ' + env.port);
})