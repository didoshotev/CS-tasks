const controllers = require('../controllers');
const router = require('express').Router();


router.get('/', controllers.process.get);

router.post('/create', controllers.process.post.create);

module.exports = router;