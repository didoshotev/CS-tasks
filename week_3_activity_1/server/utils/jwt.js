const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

function createRefreshToken(data) { 
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
}

function verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function decodeToken(token) { 
    return jwt.decode(token);
}

module.exports = {
    createToken,
    verifyToken,
    createRefreshToken,
    decodeToken
}