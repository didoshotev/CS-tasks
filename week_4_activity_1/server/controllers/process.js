const models = require('../models');
const utils = require('../utils');
const mongooseHelper = require('../utils/mongoHelper');
require('dotenv').config();


module.exports = {

    get: (req, res, next) => {

        models.Process
            .find()
            // .populate('stepsCollection')
            .then((users) => res.send(users))
            .catch(next)
    },

    getManyById: async (req, res, next) => { 
        const  { processIds } = req.body;

        try {
            const processes = await mongooseHelper.getManyById(
                processIds,
                models.Process
            );
            res.send(processes);
            
        } catch (error) {
            next(error);            
        }
    },

    post: {
        create: async (req, res, next) => {
            const { name, type, organization, processCollection } = req.body;

            try {

                const createdProcess = await models.Process.create({
                    name,
                    type,
                    organization,
                    processCollection
                })

                const modifiedOrganizationProcessCollection = 
                    await mongooseHelper.pushToStepsCollection(
                        createdProcess.organization,
                        models.Organization,
                        { 'processCollection': [createdProcess._id] }
                    );                
                
                res.send(createdProcess);

            } catch (error) {
                next(error);
            }
    }
}
}