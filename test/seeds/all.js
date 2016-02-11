'use strict';

const createUser = require('../data/user.js');
const createAddress = require('../data/address.js');
const createBet = require('../data/bet.js');
const createCard = require('../data/card.js');
const createTransaction = require('../data/transaction.js');
const createNotification = require('../data/notification.js');
const createSplit = require('../data/split.js');

exports.seed = function(knex, Promise) {

  let user_1, user_2;

  return knex('user').del()
  .then(function () {
    return knex('address').del();
  })
  .then(function () {
    return knex('user').insert([
      createUser(),
      createUser()
    ],'*');
  })
  .then(function (users) {
    user_1 = users[0].id;
    user_2 = users[1].id;
    return knex('address').insert([
      createAddress({userId:user_1}),
      createAddress({userId:user_2})
    ]);
  })
  .then(function () {
    return knex('bet').insert([
      createBet({userId:user_1}),
      createBet({userId:user_1})
    ]);
  })
  .then(function () {
    return knex('transaction').insert([
      createTransaction({userId:user_1}),
      createTransaction({userId:user_1})
    ]);
  })
  .then(function () {
    return knex('card').insert([
      createCard({userId:user_1}),
      createCard({userId:user_1})
    ]);
  })
  .then(function () {
    return knex('notification').insert([
      createNotification({userId:user_1}),
      createNotification({userId:user_1})
    ]);
  })
  .then(function () {
    return knex('split').insert([
      createSplit({senderId:user_1,recipientId:user_2}),
      createSplit({senderId:user_2,recipientId:user_1})
    ]);
  });
};
