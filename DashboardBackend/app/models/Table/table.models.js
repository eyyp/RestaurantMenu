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
  this.create_date = new Date();
};

Table.Create = (newTable,result) => {

  sql.query("INSERT INTO restaurant_table SET ?",newTable,(err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,newTable);
  });
};

Table.Find = (table_id,result) => {

  sql.query(`SELECT * FROM restaurant_table WHERE table_id="${table_id}"`,(err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if(res.length > 0){
      result(null,res[0]);
    }
    else{
      result(null,{});
    }
    
  });
};


module.exports = Table;