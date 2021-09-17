const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils')

router.get('/', auth.basicAuth, auth.managerCheck, controllers.agents.get);

router.post('/register', controllers.agents.post.register);

router.post('/login', controllers.agents.post.login);

router.post('/token', controllers.agents.post.token);

router.post('/verify', controllers.agents.post.verifyLogin);

router.post('/logout', controllers.agents.post.logout);

router.delete('/:id', controllers.agents.delete);

module.exports = router;