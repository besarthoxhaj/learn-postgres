'use strict';

var uuid = require('node-uuid');

module.exports = function (o) {
  var random = Math.floor(Math.random() * 1000000);
  return {
    sender_id: o.senderId,
    recipient_id: o.recipientId,
    bet_part: JSON.stringify(o.betPart === undefined ? betPart() : o.betPart),
  };
}

function betPart () {
  var random = Math.floor(Math.random() * 1000000);
  return {
    name: 'bet-' + random
  };
}
