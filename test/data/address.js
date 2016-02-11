'use strict';

module.exports = function (object) {
  var random = Math.floor(Math.random() * 1000000);
  return {
    line1: 'Road-' + random,
    place: 'City-' + random,
    user_id: object.userId
  };
}
