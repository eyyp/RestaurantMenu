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
  this.video_url = product.video_url;
  this.create_date = new Date();
  this.active = "1";
};



const Property = require("../Property/property.models.js")

Product.Create = (product,property,result) => {

  sql.query("INSERT INTO product SET ?",product,(err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    property.map((item,index)=>{
      const property = new Property({
        title: item.title,
        product_property_type_id: item.product_property_type_id,
        product_id: product.product_id
      })
      Property.Add(property);
    })

    result(null,product);
  });
};

Product.All = (restaurant_id,perPage,result) => {

  let query = `SELECT * FROM product WHERE restaurant_id="${restaurant_id}" and active="1" ORDER BY create_date ASC LIMIT 3 OFFSET ${perPage} `;

  sql.query(query, (err, res) => {
    if (err) {
        console.log(err)
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

Product.Delete = (product_id,result) => {

  let query = `UPDATE product SET active = "0" WHERE product_id="${product_id}" `;

  sql.query(query, (err, res) => {
    if (err) {
      logger.log('error','Table All Error:',err);
      result(err, null);
      return;
    }
    result(null, {status:false});
  });
};

Product.Find = (product_id,result) => {

  let query = `SELECT * FROM product WHERE product_id="${product_id}" `;

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
      result(null,{})
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
      result(null,{status:'dont'})
    }
  });
};

module.exports = Product;