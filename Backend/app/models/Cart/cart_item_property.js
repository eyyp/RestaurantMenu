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

const Cart_item_property = function(cart_item_property) {
  this.cart_item_property_id = uuidv4();
  this.cart_item_id = cart_item_property.cart_item_id;
  this.property_id = cart_item_property.property_id;
  this.create_date = new Date();
};

Cart_item_property.Add = (newCartItemProperty) => {
  sql.query("INSERT INTO cart_item_property SET ?",newCartItemProperty,(err, res) => {});
};

Cart_item_property.Property = (cart_item_id,result) => {
  sql.query(`SELECT * FROM cart_item_property WHERE cart_item_id="${cart_item_id}"`,(err, res) => {
    if(err){
      console.log(err);
      result(err,null);
    }
    if(res.length > 0){
      result(null,res);
    }
    else{
      result(null,[]);
    }
  });
};

module.exports = Cart_item_property;