// to run NODE_ENV=test node query/join.js

'use strict';

var knex = require('../db.js');

knex('user')
.select('*')
.join('address', 'user.id', 'user_id')
.asCallback(function (err, row) {
  console.log('Query result:', arguments);
});
