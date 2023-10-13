const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // за 15 минут
//   max: 100, // можно совершить максимум 100 запросов с одного IP
// });

// app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// app.use(requestLogger);

// app.use(limiter);

app.use('/', require('./routes/index'));

// app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
