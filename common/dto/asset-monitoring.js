'use strict';

const _ = require('lodash');
const moment = require('moment');

const constant = require('../constants');

const convertAssetCondition = (data) => {
  let response = [
    {
      'name': constant.assetConditionInText.NORMAL,
      'value': 0
    },
    {
      'name': constant.assetConditionInText.MODERATE,
      'value': 0
    },
    {
      'name': constant.assetConditionInText.CRITICAL,
      'value': 0
    }
  ];

  data.map(item => {
    response[item.conditions].value = Number(item.numberOfAssets);
  });

  return response;
};

const convertTimestampForFleetConditionHistoryGroupStatus = (data, type) => {
  let normalData = [];
  let criticalData = [];
  let moderateData = [];
  let labels = [];
  let titles = [];

  _.forEach(data, element => {
    let label = '';
    let title = '';
    normalData.push(Number(!element.number_of_normal ? 0 : element.number_of_normal));
    criticalData.push(Number(!element.number_of_critical ? 0 : element.number_of_critical));
    moderateData.push(Number(!element.number_of_moderate ? 0 : element.number_of_moderate));

    switch (type.type) {
      case constant.chartViewBy.THREE_WEEKS:
        label = moment.utc(element.timestamp).format('ddd');
        title = moment.utc(element.timestamp).format('ddd') + ' ' + moment.utc(element.timestamp).format('DD.MM.YYYY');
        break;
      case constant.chartViewBy.THREE_MONTHS: {
        let weekOfYear = '';
        let startDateOfWeek = '';
        let endDateOfWeek = '';

        weekOfYear = moment.utc(element.timestamp).isoWeek();
        startDateOfWeek = moment.utc(element.timestamp).startOf('isoWeek')
          .format('DD.MM');
        endDateOfWeek = moment.utc(element.timestamp).endOf('isoWeek')
          .format('DD.MM');

        label = moment.utc(element.timestamp).format('YYYY') + '-' + weekOfYear;
        title = 'CW ' + weekOfYear + ':' + ' ' + startDateOfWeek + '. - ' + endDateOfWeek + '.';
        break;
      }
      case constant.chartViewBy.THIRTEEN_MONTHS:
        label = moment.utc(element.timestamp).format('MMM');
        title = label + ' ' + moment.utc(element.timestamp).format('YYYY');
        break;
    }
    labels.push(label);
    titles.push(title);
  });

  let response = {
    'datasets': [
      {
        'label': constant.assetConditionInText.CRITICAL,
        'data': criticalData
      },
      {
        'label': constant.assetConditionInText.MODERATE,
        'data': moderateData
      },
      {
        'label': constant.assetConditionInText.NORMAL,
        'data': normalData
      }
    ],
    'labels': labels,
    'titles': titles
  };

  return response;
};

module.exports = {
  'convertAssetCondition': convertAssetCondition,
  'convertTimestampForFleetConditionHistoryGroupStatus': convertTimestampForFleetConditionHistoryGroupStatus
};
