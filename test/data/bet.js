'use strict';

var uuid = require('node-uuid');

module.exports = function (o) {
  var random = Math.floor(Math.random() * 1000000);
  return {
    user_id: o.userId,
    bet_part: JSON.stringify(o.betPart === undefined ? betPart() : o.betPart),
  };
}

function betPart () {
  var random = Math.floor(Math.random() * 1000000);
  return {
    name: 'bet-' + random
  };
}
