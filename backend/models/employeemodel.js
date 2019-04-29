const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    dob:{
        type: Date,
        required: true
    },

    department:{
        type: String,
        required: true
    },

    manager:{
        type: String,
        required: true
    },

    country:{
        type: String,
        
    },

    timezone:{
        type: String,

    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }

});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;