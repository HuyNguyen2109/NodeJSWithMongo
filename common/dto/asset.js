'use strict';

const _ = require('lodash');

const { timelinesElement, timelinesConfig } = require('../constants/index');

const buidResponseForAssetWithSensorsList = (assetWithSensorsList, pageSize) => {
  let variableKeys = [];
  let items = [];
  let sensorVars = assetWithSensorsList.sensorVars;

  if (sensorVars.length === 0) {
    _.forEach(assetWithSensorsList.rows, assetWithSensors => {
      let item = {
        'assetName': assetWithSensors.name,
        'assetId': assetWithSensors.asset_id
      };
      items.push(item);
    });

    return {
      'totalItems': Number(assetWithSensorsList.count),
      'totalPages': Math.ceil(assetWithSensorsList.count / pageSize),
      'items': items,
      'otherData': {
        'aspectVariableHeaders': [],
        'units': [],
        'variableKeys': []
      }
    };
  }

  _.forEach(assetWithSensorsList.rows, assetWithSensors => {
    let aspectVariables = [];
    _.forEach(sensorVars, sensorVar => {
      let keyOfValue = sensorVar.variable_id + '-value';
      let keyOfStatus = sensorVar.variable_id + '-status';
      let aspectVariable = {
        'name': sensorVar.name,
        'header': sensorVar.name,
        'giveName': sensorVar.given_name,
        'value': assetWithSensors[keyOfValue],
        'subCondition': assetWithSensors[keyOfStatus]
      };
      aspectVariables.push(aspectVariable);
      variableKeys.push(keyOfValue);
    });
    let item = {
      'assetName': assetWithSensors.asset_name,
      'assetId': assetWithSensors.asset_id,
      'condition': assetWithSensors.condition,
      'aspectVariables': aspectVariables
    };
    items.push(item);
  });

  return {
    'totalItems': Number(assetWithSensorsList.count),
    'totalPages': Math.ceil(assetWithSensorsList.count / pageSize),
    'items': items,
    'otherData': {
      'aspectVariableHeaders': assetWithSensorsList.otherData.sensorNames,
      'units': assetWithSensorsList.otherData.units,
      'variableKeys': _.uniqBy(variableKeys, String)
    }
  };
};

const convertForEventTimelines = timelines => {
  let responses = [];
  timelines.map(timeline => {
    switch(timeline.type){
      case timelinesConfig.DOCUMENT:
        // eslint-disable-next-line no-case-declarations
        const document = {
          'type': timelinesElement.DOCUMENT,
          'metaInfo': {
            'updatedDate': timeline.updated_date,
            'updatedBy': timeline.updated_by,
            'fileName': timeline.filename,
            'oldFileName': timeline.old_filename,
            'action': timeline.action
          }
        };
        responses = _.concat(responses, document);
        break;
      case timelinesConfig.ASSET_CONDITION:
        responses = _.concat(responses, {
          'type': timelinesElement.MONITORING,
          'metaInfo': {
            'updatedDate': timeline.updated_date,
            'status': timeline.status
          }
        });
        break;
      case timelinesConfig.ASSET_DETAILS:
        responses = _.concat(responses, {
          'type': timelinesElement.CHARACTERISTIC,
          'metaInfo': {
            'updatedDate': timeline.updated_date,
            'updatedBy': timeline.updated_by
          }
        });
        break;
    }
  });

  return responses;
};

const convertVariableBelongToAspectName = (variables) => {
  let results = _.chain(variables).groupBy('aspectName')
    .toPairs()
    .map(function (pair) {
      return _.zipObject(['name', 'variables'], pair);
    })
    .value();
  results = results.map(result => {
    let variables = result.variables.map(variable => {
      return {
        'name': variable.name,
        'value': variable.value
      };
    });

    return {
      'name': result.name,
      'variables':variables
    };
  });

  return results;
};

module.exports = {
  'buidResponseForAssetWithSensorsList': buidResponseForAssetWithSensorsList,
  'convertForEventTimelines': convertForEventTimelines,
  'convertVariableBelongToAspectName': convertVariableBelongToAspectName
};
