const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'Last name is not valid']
    },
    
    password: {
        type: Number,
        required: true
    }
})

module.exports = new Model('Agent', userSchema);