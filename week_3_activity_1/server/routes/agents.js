const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/', controllers.agents.get);

router.post('/register', controllers.agents.post.register);

router.post('/login', controllers.agents.post.login);

router.post('/verify', controllers.agents.post.verifyLogin);

router.post('/logout', controllers.agents.post.logout);

router.delete('/:id', controllers.agents.delete);

module.exports = router;