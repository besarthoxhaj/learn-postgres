
exports.up = function(knex, Promise) {

  return knex.schema
  .raw('ALTER TABLE "user" ALTER COLUMN "money" TYPE float;')
  .raw('ALTER TABLE "user" ALTER COLUMN "payout" TYPE float;');
};

exports.down = function(knex, Promise) {

};
