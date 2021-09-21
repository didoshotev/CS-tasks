const models = require('../models');
const utils = require('../utils');
require('dotenv').config();

let refreshTokens = [];

module.exports = {
    
    get: (req, res, next) => {
        
        models.Agent.find()
            .then((users) => res.send(users))
            .catch(next)
    },

    post: {

        register: (req, res, next) => {
            const { username, password, type } = req.body;
            
            models.Agent.create({ username, password, type })
                .then((createdUser) => {
                    const token = utils.jwt.createToken({ id: createdUser._id, type: createdUser.type })
                    res.header('Authorization', token).send(createdUser)
                })
                .catch(next)
        },

        login: (req, res, next) => {
            
            const { username, password } = req.body;
            
            models.Agent.findOne({ username })
            
            .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;
                    }
                    
                    const token = utils.jwt.createToken({ id: user._id, type: user.type });
                    const refreshToken = utils.jwt.createRefreshToken({ id: user._id, type: user.type });
            
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
        const { username, password, type } = req.body;
        
        models.Agent.update({ _id: id }, { username, password, type })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Agent.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};