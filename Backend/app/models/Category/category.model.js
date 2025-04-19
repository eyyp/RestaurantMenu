const sql = require("../db.js");
const winston = require('winston');
var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

const { 
    v4: uuidv4,
} = require('uuid');

const Category = function(category) {

};

Category.All = (restaurant_id,result) => {

  let query = `SELECT * FROM categorys WHERE restaurant_id="${restaurant_id}"`;

  sql.query(query, (err, res) => {
    if (err) {
        logger.log('error','Table All Error:',err);
        result(err, null);
        return;
    }
    if(res.length > 0){
        result(null, res);
    }
    else{
        result(null,{status:'dont'})
    }
  });
};

module.exports = Category;