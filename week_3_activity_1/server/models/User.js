const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number } = Schema.Types;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'First name is not valid'],
        trim: true
    },

    middleName: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'Middle name is not valid'],
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'Last name is not valid'],
        trim: true,
    },

    streetAddress: {
        type: String,
        required: true,
        trim: true
    },

    initDate: {
        type: Date,
        required: true,
        default: Date.now()
    },

    moneyBalance: {
        type: Number,
        required: true,
        trim: true
    },

    creditCards: { 
        type: Array,
        default: [],
    },

    loan: { 
        startDate: { type: Date },
        endDate: { type: Date },
        money: Number,
    }
})

module.exports = new Model('User', userSchema);