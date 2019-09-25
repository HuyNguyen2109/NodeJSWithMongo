module.exports = {
  'paginator': {
    'defaultPageSize': 10,
    'defaultPageIndex': 1,
    'defaultSortType': 'ASC',
    'sortTypeList': ['ASC', 'DESC']
  },
  'numberRegex': /^\d+$/,
  'assetCondition': {
    'NORMAL': '0',
    'MODERATE': '1',
    'CRITICAL': '2'
  },
  'assetConditionInText': {
    'NORMAL': 'Normal',
    'MODERATE': 'Moderate',
    'CRITICAL': 'Critical'
  },
  'chartViewBy': {
    'THREE_WEEKS': '1',
    'THREE_MONTHS': '2',
    'THIRTEEN_MONTHS': '3'
  },
  'chartViewIntervalType': {
    'WEEK': 'week',
    'MONTH': 'month',
    'YEAR': 'year'
  },
  'timeTypeOfAssetStatus': {
    'DAY': 'day',
    'WEEK': 'week',
    'MONTH': 'month'
  },
  'aspectTypeCategory': {
    'STATIC': 'static',
    'DYNAMIC': 'dynamic'
  },
  'documentActions': {
    'UPLOAD': 'Upload',
    'RENAME': 'Rename',
    'DELETE': 'Delete'
  },
  'timelinesConfig': {
    'LIMIT_ITEMS': 20,
    'DOCUMENT': 1,
    'ASSET_DETAILS': 2,
    'ASSET_CONDITION': 3
  },
  'timelinesElement': {
    'DOCUMENT': 'document',
    'CHARACTERISTIC': 'characteristic',
    'MONITORING': 'monitoring'
  },
  'assetGroupSyncTimer': 3600, // In seconds
  'userInfo': {
    'APP_ADMIN_ROLE': 'mdsp:ppaldev:assets360.admin'
  }
};
