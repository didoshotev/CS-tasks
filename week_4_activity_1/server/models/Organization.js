const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Model      = mongoose.model;
const { String } = Schema.Types;

var organizationSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    processCollection: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Process'
        },
    ],
    
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { versionKey: false})


module.exports = new Model('Organization', organizationSchema);