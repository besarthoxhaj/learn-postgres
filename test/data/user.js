'use strict';

var uuid = require('node-uuid');

module.exports = function (o) {
  var random = Math.floor(Math.random() * 1000000);
  return {
    first_name: 'Foo-' + random,
    last_name: 'Bar-' + random,
    money: random,
    payout: random,
    preferences: JSON.stringify([preferences(), preferences()]),
  };
}

function preferences () {

  return [
    'football',
    'arsenal',
    'roma',
    'tennis',
    'barcelona',
    'chelsea',
    'milan',
    'siena',
    'villarreal',
    'dortmund',
    'real_madrid',
    'schalke',
    'man_city',
    'liverpool',
    'tottenham'
  ][Math.floor(Math.random()*15)];
}
