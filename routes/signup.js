const router = require('express').Router();
const { createUserValidator } = require('../middlewares/validation');
const { createUser } = require('../controllers/users');

router.post('/', createUserValidator, createUser);

module.exports = router;
