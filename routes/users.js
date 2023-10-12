const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMeUser, editProfile } = require('../controllers/users');

router.get('/me', getMeUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), editProfile);

module.exports = router;
