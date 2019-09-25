'use strict';

const config = require('config');
const mongoose = require('mongoose');
const log = require('log4js').getLogger();

const clientConnect = () => {
  const dbConfig = config.get('dbConfig');
  // eslint-disable-next-line max-len
  const connectionString = `${dbConfig.protocol}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbType}?${dbConfig.option}`;
  mongoose.connect(connectionString, {
    'useNewUrlParser': true,
    'useUnifiedTopology': true,
    'dbName': dbConfig.dbName
  })
    .then(client => {
      log.debug(client.connection);
      log.info(`Connection to database ${dbConfig.dbName} has been established!`);
    })
    .catch(err => {
      log.error(`Error when connecting to datase: ${err}`);
    });
};

module.exports = {
  'clientConnect': clientConnect
};
