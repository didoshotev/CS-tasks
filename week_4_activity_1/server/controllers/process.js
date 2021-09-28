const models = require('../models');
const utils = require('../utils');
require('dotenv').config();


module.exports = {

    get: (req, res, next) => {

        models.Process.find()
            .then((users) => res.send(users))
            .catch(next)
    },

    post: {
        create: (req, res, next) => {
            const { name, user } = req.body;
            console.log(name, user)

            models.Process.create({ name, user })
                .then(created => { 
                    console.log('created org:', created);
                    res.send(created);
                })
                .catch(next);
        }
    }
}