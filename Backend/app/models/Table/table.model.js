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

const Table = function(table) {
  this.table_id = uuidv4();
  this.title = table.title;
  this.restaurant_id = table.restaurant_id;
  this.create_date = create_date;
};

Table.All = (restaurant_id,result) => {
  let query = `SELECT * FROM restaurant_table WHERE restaurant_id="${restaurant_id}"`;

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
      result(null,[])
    }
  });
};

Table.Find = (table_id,result) => {
  let query = `SELECT * FROM restaurant_table WHERE table_id="${table_id}"`;

  sql.query(query, (err, res) => {
    if (err) {
      logger.log('error','Table All Error:',err);
      result(err, null);
      return;
    }
    if(res.length > 0){
      result(null, {title:res[0].title});
    }
    else{
      result(null,{title:"Masa Numarası"})
    }
  });
};

module.exports = Table;