'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingsAndReviewsSchema = new Schema({
  '_id': String,
  'listing_url': String,
  'name': String,
  'summary': String,
  'space': String,
  'description': String,
  'neighborhood_overview': String,
  'notes': String,
  'transit': String,
  'access': String,
  'interaction': String,
  'house_rules': String,
  'property_type': String,
  'room_type': String,
  'bed_type': String,
  'minimum_nights': String,
  'maximum_nights': String,
  'cancellation_policy': String,
  'last_scraped': Date,
  'calendar_last_scraped': Date,
  'first_review': Date,
  'last_review': Date,
  'accommodates': Number,
  'bedrooms': Number,
  'beds': Number,
  'number_of_reviews': Number,
  'bathrooms': Schema.Types.Decimal128,
  'amenities': Array,
  'price': Schema.Types.Decimal128,
  'weekly_price': Schema.Types.Decimal128,
  'monthly_price': Schema.Types.Decimal128,
  'security_deposit': Schema.Types.Decimal128,
  'cleaning_fee': Schema.Types.Decimal128,
  'extra_people': Schema.Types.Decimal128,
  'guests_included': Number,
  'images': {
    'thumbnail_url': String,
    'medium_url': String,
    'picture_url': String,
    'x1_picture_url': String
  },
  'host': {
    'host_id': String,
    'host_url': String,
    'host_name': String,
    'host_location': String,
    'host_about': String,
    'host_thumbnail_url': String,
    'host_picture_url': String,
    'host_neighbourhood': String,
    'host_response_rate': Number,
    'host_is_superhost': Boolean,
    'host_has_profile_pic': Boolean,
    'host_identity_verified': Boolean,
    'host_listings_count': Number,
    'host_total_listings_count': Number,
    'host_verifications': Array
  },
  'address': {
    'street': String,
    'suburb': String,
    'goverment_area': String,
    'market': String,
    'country': String,
    'country_code': String,
    'location': {
      'type': String,
      'coordinates': Array,
      'is_location_exact': Boolean
    }
  },
  'availability': {
    'availability_30': Number,
    'availability_60': Number,
    'availability_90': Number,
    'availability_365': Number
  },
  'review_scores': {
    'review_scores_accuracy': Number,
    'review_scores_cleanliness': Number,
    'review_scores_checkin': Number,
    'review_scores_communication': Number,
    'review_scores_location': Number,
    'review_scores_value': Number,
    'review_scores_rating': Number
  },
  'reviews': Array
});

const ListingsAndReviews = mongoose.model('listingsAndReview', listingsAndReviewsSchema, 'listingsAndReviews', true);

module.exports = ListingsAndReviews;

