const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils')

router.get('/', controllers.users.get);

router.post('/register', controllers.users.post.register);

router.post('/login', controllers.users.post.login);

router.post('/token', controllers.users.post.token);

router.post('/logout', controllers.users.post.logout);

router.delete('/:id', controllers.users.delete);

module.exports = router;