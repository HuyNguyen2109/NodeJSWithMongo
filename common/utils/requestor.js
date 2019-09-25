'use strict';

const axios = require('axios');

const makeRequest = options => {
  return axios.request(options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  'makeRequest': makeRequest
};
