const { Error } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { Created } = require('../utils/statuses');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(Created).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof Error.ValidationError) {
        next(new BadRequestError(`Некорректные данные: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getMeUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((currentUser) => res.send(currentUser))
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else if (err instanceof Error.CastError) {
        next(new BadRequestError(`Некорректные данные: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const editProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else if (err instanceof Error.ValidationError) {
        next(new BadRequestError(`Некорректные данные: ${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getMeUser,
  editProfile,
};
