// to run NODE_ENV=test node query/raw.js

'use strict';

var knex = require('../db.js');

// const query = `UPDATE bet AS b SET
//   settled = obj.settled,
//   payout = obj.payout
// FROM (VALUES 
//     (1, true, 3.50),
//     (2, true, 4.00)
// ) AS obj (id, settled, payout)
// WHERE obj.id = b.id;
// SELECT * FROM bet;`; // or 'RETURNING *;'

// knex.raw(query).asCallback((err,data) => {
//   console.log('err',err);
//   console.log('data',data);
// });


const updateQuery = data => {

  const reduceBy = (acc,elm) => {
    return acc + `(${elm.id},${elm.settled},${elm.payout}),`;
  };

  const values = data.reduce(reduceBy,``).slice(0, -1);

  return `UPDATE bet AS b SET
    settled = obj.settled,
    payout = obj.payout
  FROM (VALUES
    ${values}
  ) AS obj (id, settled, payout)
  WHERE obj.id = b.id;
  RETURNING *;`;
};


const generatedQuery = updateQuery([{
  "id": 70549,
  "void": false,
  "type": "settlement",
  "payout": 3.5
},{
  "id": 70549,
  "void": false,
  "type": "settlement",
  "payout": 3.5
}]);

console.log('generatedQuery',generatedQuery);

const knexQuery = (knex('bet').select('user_id').where({id:1,id:2})).toString();
console.log('knexQuery',knexQuery);

knex('bet')
.select('*')
.asCallback((err, res) => console.log('all',err,res));

knex('bet')
.select('payout')
.where({
  id:1,
  id:2
})
.asCallback((err, res) => console.log('some',err,res));


