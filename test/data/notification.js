'use strict';

module.exports = function (o) {
  var random = Math.floor(Math.random() * 1000000);
  return {
    user_id: o.userId,
    message: 'notification-' + random
  };
}
