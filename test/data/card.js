'use strict';

var uuid = require('node-uuid');

module.exports = function (o) {
  var random = Math.floor(Math.random() * 1000000);
  return {
    user_id: o.userId,
    description: 'card-' + random
  };
}
