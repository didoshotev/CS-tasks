const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.step.get);

router.post('/create', controllers.step.post.create);

router.post('/getManyById', controllers.step.getManyById);

module.exports = router;