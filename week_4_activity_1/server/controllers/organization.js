const models = require('../models');
const utils = require('../utils');
require('dotenv').config();


module.exports = {

    get: (req, res, next) => {

        models.Organization
            .find()
            .populate('creatorId', '_id')
            .then((users) => res.send(users))
            .catch(next)
    },

    post: {
        create: (req, res, next) => {
            const { name, creatorId } = req.body;

            models.Organization.create({ name, creatorId })
                .then(created => {
                    res.send(created);
                })
                .catch(next);
        },
    }
}