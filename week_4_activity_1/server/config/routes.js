const router = require('../routes');

module.exports = (app) => {

    app.use('/api/users', router.users);
    app.use('/api/organization', router.organization);
    app.use('/api/process', router.process);

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};