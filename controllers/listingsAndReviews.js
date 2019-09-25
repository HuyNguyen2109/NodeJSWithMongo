'use strict';
const log = require('log4js').getLogger();

const ListingsAndReviews = require('../models/listingAndReviews');
const resultDto = require('../common/dto/result');
const messageCodes = require('../common/message-codes');

const getAllRecordsWithPagination = (req, res) => {
  const itemPerPage = parseInt(req.query.itemPerPage);
  const page = Math.max(0, req.params.page);

  return ListingsAndReviews.find({})
    .limit(itemPerPage)
    .skip(itemPerPage * (page-1))
    .lean()
    .then(records => {
      if(!records) {
        throw resultDto.notFound(messageCodes.E004);
      }
      res.sendSuccess(resultDto.success(messageCodes.I001, records));
    })
    .catch(err => {
      res.sendError(err);
      log.error(`Can not get these records, Error: ${err}`);
    });
};

const getRecordById = (req, res) => {
  const id = req.params.id;

  return ListingsAndReviews.findById(id).lean()
    .then(record => {
      if(!record) {
        throw resultDto.notFound(messageCodes.E004);
      }
      res.sendSuccess(resultDto.success(messageCodes.I001, record));
    })
    .catch(err => {
      res.sendError(err);
      log.error(`Can not get the record, Error: ${err}`);
    });
};

const getRecordByMultipleIds = (req, res) => {
  const ids = req.query.id.split(',');

  return ListingsAndReviews.find({'_id': { '$in': ids}})
    .lean()
    .then(records => {
      if(!records) {
        throw resultDto.notFound(messageCodes.E004);
      }
      res.sendSuccess(resultDto.success(messageCodes.I001, records));
    })
    .catch(err => {
      res.sendError(err);
      log.error(`Can not get the record, Error: ${err}`);
    });
};

module.exports = {
  'getAllRecordsWithPagination': getAllRecordsWithPagination,
  'getRecordById': getRecordById,
  'getRecordByMultipleIds': getRecordByMultipleIds
};
