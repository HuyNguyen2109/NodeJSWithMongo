/* eslint-disable no-prototype-builtins */
'use strict';

const config = require('config');
const cors = require('cors');
const log4js = require('log4js');
const log4jsExtend = require('log4js-extend');
const express = require('express');
const bodyParser = require('body-parser');
const httpStatusCodes = require('http-status-codes');

const resultDto = require('./common/dto/result');
const messageCodes = require('./common/message-codes');

const mongoDB = require('./models/index');
const listingsAndReviewsRouter = require('./routes/listingsAndReviews');
const demoRouter = require('./routes/demo');

const app = express();

mongoDB.clientConnect();

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));

const BASE_URL = config.get('baseURL');
const port = config.get('applicationPort');

// Load log4js configuration
try {
  const logConfig = config.get('logConfig');
  log4js.configure(logConfig);
} catch (err) {
  throw err;
}

// Using format log file
log4jsExtend(log4js, {
  'path': __dirname,
  'format': 'at @name (@file:@line:@column)'
});

// Logger
const log = log4js.getLogger();
log.debug('Starting server...!');

app.use((req, res, next) => {
  res.sendError = error => {
    log.error('Error before sending response: ', error);
    if(error && error.hasOwnProperty('httpCode')) {
      res.status(error.httpCode);
      delete error.httpCode;

      return res.send(error);
    }

    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(resultDto.internalServerError(messageCodes.E001));
  };

  res.sendSuccess = result => {
    delete result.httpCode;

    return res.send(result);
  };

  next();
});

app.use((req, res, next) => {
  log.debug(' ==== Request information ==== ');
  log.debug('Original URL: ', req.originalUrl);
  log.debug('Method: ', req.method);
  log.debug('Path params: ', req.params);
  log.debug('Query params: ', req.query);
  log.debug(' ==== End request information ==== ');

  next();
});

app.use(BASE_URL + '/demo', demoRouter);
app.use(BASE_URL + '/listings-and-reviews', listingsAndReviewsRouter);

// Catch 404 error
app.use((req, res, next) => {
  const error = resultDto.notFound(messageCodes.E004);
  next(error);
});

app.use((err, req, res, next) => {
  if (err) {
    return res.sendError(err);
  }

  next();
});

/**
 * Handling uncaught exception
 */
process.on('uncaughtException', (error) => {
  log.debug('Catch uncaughtException event with error: ', error);
  // Shutdown log4js and kill process
  log4js.shutdown(() => {
    process.exit(1);
  });
});

app.listen(port, () => {
  log.info(`Server is running on port: ${port}`);
});
