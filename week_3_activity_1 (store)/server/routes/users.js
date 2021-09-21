const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils')


router.get('/', controllers.users.get);

router.get('/:id', controllers.users.getById);

router.post('/', auth.basicAuth, auth.standartCheck, controllers.users.post);

router.put('/:id', auth.basicAuth, auth.standartCheck, controllers.users.put);

router.delete('/:id', auth.basicAuth, auth.standartCheck, controllers.users.delete);

router.patch('/:id', auth.basicAuth, auth.managerCheck, controllers.users.patch);

module.exports = router;