'use strict';

var knex = require('../db.js');

knex('user').select('*').where('id', '0c9b6bae-4961-4675-a74e-d0bc204fcf21').asCallback(function (err, row) {
  console.log('Query result:', row);
});
