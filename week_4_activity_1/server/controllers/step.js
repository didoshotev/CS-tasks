require('dotenv').config();

const models = require('../models');
const utils = require('../utils');
const mongooseHelper = require('../utils/mongoHelper');


module.exports = { 

    get: (req, res, next) => {

        models.Step
            .find()
            // .populate('creatorId', '_id')
            .then((users) => res.send(users))
            .catch(next)
    },

    post: { 

        create: async (req, res, next) => {
            const { name, priority, processId, fields } = req.body;
        
            try {
                
                const createdStep = await models.Step.create({ name, priority, processId, fields })
                                
                const modifiedStepsCollection = await mongooseHelper.pushToArray(
                    createdStep.processId,
                    models.Process,
                    createdStep._id
                );
                console.log('modified process', modifiedStepsCollection);
                res.send(createdStep);
                // return modified process if needed.. !

            } catch (error) {
                next(error)                
            }
        }

    }

}

