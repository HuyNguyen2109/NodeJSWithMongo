'use strict';

const httpStatusCode = require('http-status-codes');

const resultFactory = (httpCode, code, data) => {
  let result = {
    'httpCode': httpCode,
    'code': code
  };

  if (data) {
    result = Object.assign(result, { 'data': data });
  }

  return result;

};

const badRequest = (code) => {
  return resultFactory(httpStatusCode.BAD_REQUEST, code);
};

const internalServerError = (code) => {
  return resultFactory(httpStatusCode.INTERNAL_SERVER_ERROR, code);
};

const notFound = (code) => {
  return resultFactory(httpStatusCode.NOT_FOUND, code);
};

const success = (code, data) => {
  return resultFactory(httpStatusCode.OK, code, data);
};

const conflict = (code) => {
  return resultFactory(httpStatusCode.CONFLICT, code);
};

const buildResponeForListPage = (result, pageSize) => {
  return {
    'totalItems': result.count,
    'totalPages': Math.ceil(result.count / pageSize),
    'items': result.rows
  };
};

module.exports = {
  'badRequest': badRequest,
  'internalServerError': internalServerError,
  'notFound': notFound,
  'success': success,
  'buildResponeForListPage': buildResponeForListPage,
  'conflict': conflict
};
