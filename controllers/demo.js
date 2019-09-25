'use strict';

const resultDto = require('../common/dto/result');
const messageCodes = require('../common/message-codes');

const welcome = (req, res) => {
  res.sendSuccess(resultDto.success(messageCodes.I001, {
    'message': 'Welcome to Nodejs RESTful APIs application!'
  }));
};

module.exports = {
  'welcome': welcome
};
