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
  this.category_id = uuidv4();
  this.title = category.title;
  this.restaurant_id = category.restaurant_id;
  this.create_date = new Date();
};

Category.Create = (newCategory,result) => {
  sql.query("INSERT INTO categorys SET ?",newCategory,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }
    result(null,newCategory);
  });
};

Category.All = (restaurant_id,result) => {
  sql.query(`SELECT * FROM categorys WHERE restaurant_id="${restaurant_id}"`,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }
    result(null,res);
  });
};

Category.Find = (category_id,result) => {
  sql.query(`SELECT * FROM categorys WHERE category_id="${category_id}"`,(err, res) => {
    if (err) {
      console.log(err)
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

module.exports = Category;