const router = require('express').Router();
const { createMovieValidator, deleteSavedMovieValidator } = require('../middlewares/validation');

const {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', deleteSavedMovieValidator, deleteSavedMovie);

module.exports = router;
