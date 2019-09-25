'use strict';

const fs = require('fs');

const removeSync = path => {
  return fs.unlinkSync(path);
};

module.exports = {
  'removeSync': removeSync
};
