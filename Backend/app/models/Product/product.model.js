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

const Product = function(product) {
    this.product_id = uuidv4();
    this.title = product.title;
    this.exp = product.exp;
    this.price = product.price;
    this.category_id = product.category_id;
    this.restaurant_id = product.restaurant_id;
    this.summary = product.summary;
    this.create_date = new Date();
};

Product.All = (restaurant_id,result) => {

  let query = `SELECT * FROM product WHERE restaurant_id="${restaurant_id}"`;

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

Product.Find = (product_id,result) => {

  let query = `SELECT * FROM product WHERE product_id="${product_id}"`;

  sql.query(query, (err, res) => {
    if (err) {
      logger.log('error','Table All Error:',err);
      result(err, null);
      return;
    }
    if(res.length > 0){
      result(null, res[0]);
    }
    else{
      result(null,{status:'dont'})
    }
  });
};

Product.Category = (restaurant_id,category_id,result) => {

  let query = `SELECT * FROM product WHERE restaurant_id="${restaurant_id}" and category_id="${category_id}" `;

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
      result(null,[]);
    }
  });
};

module.exports = Product;