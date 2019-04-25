const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeRoute = require('./routes/employeeRoute');
const app = express();

//connect to mongodb instance
mongoose.connect('mongodb://localhost:27017/timeoff-mongodb').then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the db', err);
})

app.use(cors());

//add middlewares for passing json and url encoded and populate req.body
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/user', EmployeeRoute);

app.listen(5000).on('listening', () =>{
    console.log('💘 app is listening on 5000');
})