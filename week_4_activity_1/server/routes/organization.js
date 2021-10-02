const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.organization.get);

router.get('/:id', controllers.organization.getById);

router.post('/create', controllers.organization.post.create);

module.exports = router;