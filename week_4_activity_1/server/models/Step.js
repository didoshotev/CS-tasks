const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Model      = mongoose.model;
const { String } = Schema.Types;

var stepSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    priority: { 
        type: Object,
        required: true
    },

    fields: { 
        type: Object,
        required: true
    },

    processId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Process'
    }

}, { versionKey: false})


module.exports = new Model('Step', stepSchema);