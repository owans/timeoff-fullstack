const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('../models/employeemodel');
const AuthMiddleware = require('../middleware/auth');
const router = express.Router();
const env = require("../env");

//create employee profile
router.post('/signup', async function(req, res){
    try{
        //hash password using bcrypt
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const User = await EmployeeModel.create(req.body);

        //convert to mongo document to json in order to access its properties and delete
        const result = User.toJSON();

        delete result.password;

        const token = jwt.sign({id: User.id}, env.jwt_secret, {expiresIn: '1h'})

        res.status(200).json({
            status: 'Success',
            data: {User: result, token}
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: "An error occured while creating your timeoff profile"
        })

        console.log(err.response);
    }
});

//get employee dashboard
router.get('/dashboard', AuthMiddleware, async function(req, res){
    try{
        const user = await EmployeeModel.findById(req.user);

        res.json({status: 'Success', data: user});

    }catch(err){
        console.log(err);

        //show error to user
        res.status(401).json({status: 'error', message: err.message})
    }
})

//login to timeoff
router.post('/login', async function(req, res){
    try{

        const user = await EmployeeModel.findOne(
            {email: req.body.email}, 
            '+password');

        if(!user) return res
        .status(401)
        .json({status: 'error', 
            message: "Invalid login details"});

        //compare user's password to log the user in
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordValid) return res.status(401).json(
            {status: 'error', 
            message: "Invalid login details"});

            const token = jwt.sign({id: user.id}, env.jwt_secret);

        res.json({status: "Success", data: { token } });

    }catch(err){
        res.status(500).json({
            status: "error",
            message: " an error occurred"
        })
    }
})

//get all employees
router.get('/', async function(req, res){
    
    try{
        const search = req.query.gender ? {gender: req.query.gender} : {};

        const users = await EmployeeModel.find(search);
        res.json({
            status: 'Success',
            data: users
        })

    }catch(err){
        console.log(err);

        res.status(200).json({
            status: 'error',
            message: 'An error occurred while trying to get an account'
        })
    }
})


module.exports = router;