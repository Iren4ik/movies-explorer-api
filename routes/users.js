const router = require('express').Router();
const { editProfileValidator } = require('../middlewares/validation');
const { getMeUser, editProfile } = require('../controllers/users');

router.get('/me', getMeUser);
router.patch('/me', editProfileValidator, editProfile);

module.exports = router;
