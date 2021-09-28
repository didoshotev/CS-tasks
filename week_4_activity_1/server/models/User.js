require('dotenv').config();

const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Model      = mongoose.model;
const { String } = Schema.Types;
const bcrypt     = require('bcrypt');
const saltRounds = +process.env.SALT_ROUNDS;


var userSchema = new Schema({

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

    organizationsCollection: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        }
    ],
}, { versionKey: false})


userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password); // true or false
    }
};

userSchema.pre('save', function (next) {
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


module.exports = new Model('User', userSchema);