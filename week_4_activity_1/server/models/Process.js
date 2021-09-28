
const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Model      = mongoose.model;
const { String } = Schema.Types;

var processSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    type: { 
        type: String,
        enum: ['lineal', 'paralel'],
        default: ['lineal'],
        required: true,
    },

    stepsCollection: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Step'
        }
    ],

    organization: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }

}, { versionKey: false})


module.exports = new Model('Process', processSchema);
