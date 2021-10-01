const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.step.get);

router.post('/create', controllers.step.post.create);

module.exports = router;