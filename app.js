// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { DB_URL } = require('./utils/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
mongoose.connect(DB_URL);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors()); // перехватывает ошибки из celebrate, обрабатывает и отдает клиенту
app.use(errorHandler); // централизованный обработчик ошибок
app.listen(PORT);
