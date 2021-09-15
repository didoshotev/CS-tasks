const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number } = Schema.Types;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    middleName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
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

    type: { 
        type: String,
        required: true,
        enum: ['risky', 'standart', 'vip'],
        default: 'standart'
    },

    loansCollection: { 
        startDate: { type: Date },
        endDate: { type: Date },
        money: { type: Number},
        default: []
    }
})

module.exports = new Model('User', userSchema);