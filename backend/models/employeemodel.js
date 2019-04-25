const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    company_name:{
        type: String,
        required: true
    },

    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    dob:{
        type: Date,
        required: true
    },

    age:{
        type: Number
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
        enum: ['Nigeria', 'Ghana'],
    },

    timezone:{
        type: String,
        enum: ['West Africa', "UTC+1"],
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