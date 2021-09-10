const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        console.log('HELLO FROM controllers/users');
        models.User.find()
            .then((users) => res.send(users))
            .catch(next);
    },
    getById: (req, res, next) => {
        const id = req.params.id
        models.User.findById(id)
            .then((user) => {
                return res.send(user)
            })
            .catch(next);
    },

    post: (req, res, next) => {
        const { firstName, middleName, lastName, streetAddress, moneyBalance } = req.body;
        models.User.create({ firstName, middleName, lastName, streetAddress, moneyBalance })
            .then((createduser) => {
                res.send(createduser);
            }).catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { firstName, middleName, lastName, streetAddress, moneyBalance, loan } = req.body;
        models.User.updateOne({ _id: id }, { firstName, middleName, lastName, streetAddress, moneyBalance, loan })
            .then((updateduser) => res.send(updateduser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removeduser) => res.send(removeduser))
            .catch(next)
    }
};