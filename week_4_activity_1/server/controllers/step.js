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

    getManyById: async (req, res, next) => {
        const { stepsIds } = req.body;

        try {
            const steps = await mongooseHelper.getManyById(
                stepsIds,
                models.Step
            );
            res.send(steps);

        } catch (error) {
            next(error);
        }
    },

    post: {

        create: async (req, res, next) => {
            const { name, priority, processId, fields } = req.body;

            try {

                const createdStep = await models.Step.create({ name, priority, processId, fields })
                // { stepsCollection: [itemToAddId] }                

                const modifiedStepsCollection = await mongooseHelper.pushToStepsCollection(
                    createdStep.processId,
                    models.Process,
                    { 'stepsCollection': [createdStep._id] }
                );
                res.send(createdStep);
                // return modified process if needed.. !

            } catch (error) {
                next(error)
            }
        },

        run: async (req, res, next) => {
            const { stepId } = req.params;
            const { step } = req.body

            try {
                // any calls
                // const step = (await mongooseHelper.getManyById([stepId], models.Step))[0];
                console.log(`Step: ${step.name} is executing`);
                
                // if(step.name == 'UPLOAD_YOUTUBE_VIDEO') { 
                //     res.sendStatus(400);
                //     return;
                // }
                setTimeout(() => {
                    res.send(step)
                }, 2000)

            } catch (error) {
                next(error)
            }

        },

    }

}

