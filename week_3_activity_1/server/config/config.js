const env = process.env.NODE_ENV || 'development';
require('dotenv').config();

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbURL: process.env.DB_URL,
        authCookieName: process.env.AUTH_COOKIE
    },
    // production: {
    //     port: process.env.PORT || 5000,
    //     dbURL: 'mongodb+srv://test123:test123123@cluster0.a7hhx.mongodb.net/istore?retryWrites=true&w=majority',
    //     authCookieName: 'x-auth-token'
    // }
};

module.exports = config[env];