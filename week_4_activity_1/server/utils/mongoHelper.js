const mongooseHelper = { 

    pushToStepsCollection: async function(id, theClass, modificator) { 
        return await theClass.findByIdAndUpdate(id, 
        
            { $addToSet: modificator},
            { new: true }
        )
    },

    getOneItem: async function (id, theClass) {
        return await theClass.findById(id).lean();
    },

    getManyById: async function (arrayIds, theClass) { 
        return await theClass.find({
            '_id': { $in: arrayIds}
        })
    }
    
}

module.exports = mongooseHelper;