const models = require('../models');
const utils = require('../utils');
require('dotenv').config();

let refreshTokens = [];

module.exports = {
    
    get: (req, res, next) => {
        
        models.User.find()
            .then((users) => res.send(users))
            .catch(next)
    },

    post: {

        register: (req, res, next) => {
            const { username, password } = req.body;
            
            models.User.create({ username, password })
                .then((createdUser) => {
                    const token = utils.jwt.createToken({ 
                        id: createdUser._id,
                        organizationsCollection: createdUser.organizationsCollection
                    })
                    res.header('Authorization', token).send(createdUser)
                })
                .catch(next)
        },

        login: (req, res, next) => {
            
            const { username, password } = req.body;

            models.User.findOne({ username })
            
            .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;
                    }
                    
                    const token = utils.jwt.createToken({ 
                        id: user._id,
                        organizationsCollection: user.organizationsCollection
                    });
                    const refreshToken = utils.jwt.createRefreshToken({
                        id: user._id,
                        organizationsCollection: user.organizationsCollection    
                    });
            
                    refreshTokens.push(refreshToken);
                    res.json({ accessToken: token, refreshToken })
                    // res.send({ user, token});
                })
                .catch(next);
        },

        token: async (req, res) => { 
            
            const refreshToken = req.body.token;
            if(refreshToken == null) { return res.send(401); }
            
            if(!refreshTokens.includes(refreshToken)) { return res.send(403) }
            
            try {
                
                const tokenResponse = await utils.jwt.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET) 
                const accessToken = utils.jwt.createToken({id: tokenResponse._id, type: tokenResponse.type});
                res.json({accessToken})

            } catch (error) {
                return res.sendStatus(403)                
            }
        },

        logout: (req, res, next) => {
            refreshTokens = refreshTokens.filter(token => token !== req.body.token);
            res.sendStatus(204);
        }
    },

    put: (req, res, next) => {
        
        const id = req.params.id;
        const { username, password, organizationsCollection } = req.body;
        
        models.User.update({ _id: id }, { username, password, organizationsCollection })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};