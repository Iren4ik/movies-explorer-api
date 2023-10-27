const urlRegex = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;

const Created = 201;

const ConflictMessage = 'Пользователь с таким email уже существует';
const BadRequestMessage = 'Введены некорректные данные';
const UserNotFoundMessage = 'Пользователь с таким id не найден';
const FilmsNotFoundMessage = 'Фильмы не найдены';
const MovieDeleteMessage = 'Фильм удален';
const MovieForbiddenMessage = 'Чужой фильм удалить нельзя';
const MovieNotFoundMessage = 'Фильм с таким id не найден';

module.exports = {
  urlRegex,
  Created,
  ConflictMessage,
  BadRequestMessage,
  UserNotFoundMessage,
  FilmsNotFoundMessage,
  MovieDeleteMessage,
  MovieForbiddenMessage,
  MovieNotFoundMessage,
};
