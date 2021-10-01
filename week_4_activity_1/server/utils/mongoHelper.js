const mongooseHelper = { 
    
    getOneItem: async function(theClass) { 
        return await theClass.find().lean();
    },

    pushToArray: async function(id, theClass, itemToAddId) { 
        return await theClass.findByIdAndUpdate(id, 
        
            { $addToSet: { stepsCollection: [itemToAddId] }},
            { new: true }
        )
    }
}

module.exports = mongooseHelper;