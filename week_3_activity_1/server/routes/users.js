const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/', controllers.users.get);

router.post('/', controllers.users.post);

router.put('/:id', controllers.users.put);

router.delete('/:id', controllers.users.delete);

module.exports = router;