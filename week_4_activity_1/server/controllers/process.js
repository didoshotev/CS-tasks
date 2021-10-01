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
            const { name, type, organization, stepsCollection } = req.body;

            models.Process.create({ name, type, organization, stepsCollection })
                .then(created => { 
                    res.send(created);
                })
                .catch(next);
        }
    }
}