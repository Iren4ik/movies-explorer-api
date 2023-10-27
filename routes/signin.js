const router = require('express').Router();
const { loginValidator } = require('../middlewares/validation');
const { login } = require('../controllers/users');

router.post('/', loginValidator, login);

module.exports = router;
