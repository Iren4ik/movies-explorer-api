const { Error } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  Created,
  BadRequestMessage,
  FilmsNotFoundMessage,
  MovieDeleteMessage,
  MovieForbiddenMessage,
  MovieNotFoundMessage,
} = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(FilmsNotFoundMessage));
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(Created).send(movie))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(`${BadRequestMessage} : ${err.message}`));
      } else {
        next(err);
      }
    });
};

const deleteSavedMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.deleteOne(movie)
          .then(() => res.send({ message: MovieDeleteMessage }))
          .catch(next);
      } else {
        throw new ForbiddenError(MovieForbiddenMessage);
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(`${BadRequestMessage} : ${err.message}`));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(MovieNotFoundMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
};
