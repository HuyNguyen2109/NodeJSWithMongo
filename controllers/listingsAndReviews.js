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

const createRecord = (req, res) => {
  const record = {
    '_id': req.query._id,
    'listing_url': req.query.listing_url || null,
    'name': req.query.name || null,
    'summary': req.query.summary || null,
    'space': req.query.space || null ,
    'description': req.query.description || null,
    'neighborhood_overview': req.query.neighborhood_overview || null,
    'notes': req.query.notes || null,
    'transit': req.query.transit || null,
    'access': req.query.access || null,
    'interaction': req.query.interaction || null,
    'house_rules': req.query.house_rules || null,
    'property_type': req.query.property_type || null,
    'room_type': req.query.room_type || null,
    'bed_type': req.query.bed_type || null,
    'minimum_nights': req.query.minimum_nights || null,
    'maximum_nights': req.query.maximum_nights || null,
    'cancellation_policy': req.query.cancellation_policy || null,
    'last_scraped': req.query.last_scraped || null,
    'calendar_last_scraped': req.query.calendar_last_scraped || null,
    'first_review': req.query.first_review || null,
    'last_review': req.query.last_review || null,
    'accommodates': req.query.accommodates || null,
    'bedrooms': req.query.bedrooms || null,
    'beds': req.query.beds || null,
    'number_of_reviews': req.query.number_of_reviews || null,
    'bathrooms': req.query.bathrooms || null,
    'amenities': req.query.amenities.split(',') || null,
    'price': req.query.price || null,
    'weekly_price': req.query.weekly_price || null,
    'monthly_price': req.query.monthly_price || null,
    'security_deposit': req.query.security_deposit || null,
    'cleaning_fee': req.query.cleaning_fee || null,
    'extra_people': req.query.extra_people || null,
    'guests_included': req.query.guests_included || null,
    'images': {
      'thumbnail_url': req.query.thumbnail_url || null,
      'medium_url': req.query.medium_url || null,
      'picture_url': req.query.picture_url || null,
      'x1_picture_url': req.query.x1_picture_url || null
    },
    'host': {
      'host_id': req.query.host_id || null,
      'host_url': req.query.host_url || null,
      'host_name': req.query.host_name || null,
      'host_location': req.query.host_location || null,
      'host_about': req.query.host_about || null,
      'host_thumbnail_url': req.query.host_thumbnail_url || null,
      'host_picture_url': req.query.host_picture_url || null,
      'host_neighbourhood': req.query.host_neighbourhood || null,
      'host_response_rate': req.query.host_response_rate || null,
      'host_is_superhost': req.query.host_is_superhost || null,
      'host_has_profile_pic': req.query.host_has_profile_pic || null,
      'host_identity_verified': req.query.host_identity_verified || null,
      'host_listings_count': req.query.host_listings_count || null,
      'host_total_listings_count': req.query.host_total_listings_count || null,
      'host_verifications': req.query.host_verifications.split(',') || null
    },
    'adress': {
      'street': req.query.street || null,
      'suburb': req.query.suburb || null,
      'goverment_area': req.query.goverment_area || null,
      'market': req.query.market || null,
      'country': req.query.country || null,
      'country_code': req.query.country_code || null,
      'location': {
        'type': req.query.type || null,
        'coordinates': req.query.coordinates.split(',') || null,
        'is_location_exact': req.query.is_location_exact || null
      }
    },
    'availability': {
      'availability_30': req.query.availability_30 || null,
      'availability_60': req.query.availability_60 || null,
      'availability_90': req.query.availability_90 || null,
      'availability_365': req.query.availability_365 || null
    },
    'review_scores': {
      'review_scores_accuracy': req.query.review_scores_accuracy || null,
      'review_scores_cleanliness': req.query.review_scores_cleanliness || null,
      'review_scores_checkin': req.query.review_scores_checkin || null,
      'review_scores_communication': req.query.review_scores_communication || null,
      'review_scores_location': req.query.review_scores_location || null,
      'review_scores_value': req.query.review_scores_value || null,
      'review_scores_rating': req.query.review_scores_rating || null
    },
    'reviews': req.query.reviews.split(',') || null
  };

  return ListingsAndReviews.create(record)
    .then((record) => {
      res.sendSuccess(resultDto.success(messageCodes.I005,{
        'message': 'Document insert successfully!'
      }))
    })
    .catch((err) => {
      log.error(err);
      res.sendError(err);
    });
};

const deleteRecord = (req, res) => {
  const id = req.params.id;

  ListingsAndReviews.findByIdAndDelete(id)
    .then(() => {
      res.sendSuccess(resultDto.success(messageCodes.I005, {
        'message': 'Document deleted successfully!'
      }))
    })
    .catch((err) => {
      log.error(err);
      res.sendError(err);
    })
}

module.exports = {
  'getAllRecordsWithPagination': getAllRecordsWithPagination,
  'getRecordById': getRecordById,
  'getRecordByMultipleIds': getRecordByMultipleIds,
  'createRecord': createRecord,
  'deleteRecord': deleteRecord
};
