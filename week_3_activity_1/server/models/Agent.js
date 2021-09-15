const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number } = Schema.Types;
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = +process.env.SALT_ROUNDS;

const agentSchema = new Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },
    
    password: {
        type: String,
        required: true,
        trim: true
    },

    type: { 
        type: String,
        enum: ['manager', 'restricted', 'standart'],
        required: true,
    }
})


agentSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password); // true or false
    }
};

agentSchema.pre('save', function (next) {
    if (this.isModified('password')) {

        bcrypt.genSalt(saltRounds, (err, salt) => {

            bcrypt.hash(this.password, salt, (err, hash) => {
        
                if (err) { next(err); return }
        
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});


module.exports = new Model('Agent', agentSchema);