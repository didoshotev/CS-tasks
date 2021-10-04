const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.step.get);

router.post('/create', controllers.step.post.create);

router.post('/getManyById', controllers.step.getManyById);

router.post('/run/:stepId', controllers.step.post.run);

module.exports = router;