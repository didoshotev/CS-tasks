const env = process.env.NODE_ENV || 'development';
require('dotenv').config();

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbURL: process.env.DB_URL,
        authCookieName: process.env.AUTH_COOKIE
    },
    production: {
        port: process.env.PORT || 5000,
        dbURL: process.env.DB_URL,
        authCookieName: process.env.AUTH_COOKIE
    }
};

module.exports = config[env];