'use strict';

const constant = require('../constants');

const convertAssetGroupList = (groups, conditions) => {
  groups = groups.map((group, index) => {
    group = group.toJSON();
    let numberOfAbnormalAsset = 0;
    conditions[index].forEach(item => {
      if (item.conditions !== Number(constant.assetCondition.NORMAL)) {
        numberOfAbnormalAsset += Number(item.numberOfAssets);
      }
    });
    group.numberOfAbnormalAsset = numberOfAbnormalAsset;

    return group;
  });

  return groups;
};

module.exports = {
  'convertAssetGroupList': convertAssetGroupList
};
