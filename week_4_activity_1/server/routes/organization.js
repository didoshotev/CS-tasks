const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.organization.get);

router.post('/create', controllers.organization.post.create);

module.exports = router;