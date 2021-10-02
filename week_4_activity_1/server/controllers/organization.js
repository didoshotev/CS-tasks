const models = require('../models');
const utils = require('../utils');
const mongooseHelper = require('../utils/mongoHelper');
require('dotenv').config();


module.exports = {

    get: (req, res, next) => {

        models.Organization
            .find()
            .populate('creatorId', '_id')
            .then((users) => res.send(users))
            .catch(next)
    },

    getById: async (req, res, next) => { 
        const  organizationId  = req.params.id;
        
        try {
            const organization = await mongooseHelper.getOneItem(
                organizationId,
                models.Organization
            );
            res.send(organization);
            
        } catch (error) {
            next(error);            
        }
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