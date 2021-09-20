const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        
        models.User.find()
            .then((users) => res.send(users))
            .catch(next);
    },

    getById: (req, res, next) => {
        
        const id = req.params.id
        
        models.User.findById(id)
            .then((user) => res.send(user))
            .catch(next);
    },

    post: (req, res, next) => {

        models.User.create(req.body)
            .then((createduser) => res.send(createduser))
            .catch(next);
    },

    put: (req, res, next) => {
       
        const id = req.params.id;
       
        const { firstName, middleName, lastName, streetAddress, moneyBalance,
             creditCards, loansCollection, type } = req.body;
        
             models.User.findOneAndUpdate({ _id: id }, 
            { firstName, middleName, lastName, streetAddress, moneyBalance, creditCards, loansCollection, type },
            {new: true})
        
            .then((updateduser) => res.send(updateduser))
            .catch(next)
    },

    delete: (req, res, next) => {
        
        const id = req.params.id;
        
        models.User.deleteOne({ _id: id })
            
        .then((removeduser) => res.send(removeduser))
            .catch(next)
    },

    patch: (req, res, next) => {
        
        const id       = req.params.id;
        const { type } = req.body
        
        models.User.findOneAndUpdate({_id: id}, { $set: {type} }, { new: true})
        
        .then((updated) => res.send(updated) )
        .catch(next)
    }
};