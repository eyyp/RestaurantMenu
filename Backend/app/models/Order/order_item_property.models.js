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

const Order_item_property = function(order_item_property) {
  this.order_item_property_id = uuidv4();
  this.order_item_id = order_item_property.order_item_id;
  this.property_id = order_item_property.property_id;
  this.create_date = new Date();
};

Order_item_property.Add = (newItemProperty,cart_item_id,result) =>{
  sql.query(`INSERT INTO order_item_property SET ?`,newItemProperty,(err, res) => {
    console.log(newItemProperty)
    if(err){
      console.log(err)
    }
    sql.query(`DELETE FROM cart_item_property WHERE cart_item_id="${cart_item_id}"`,(err, res) => {
      if(err){
        console.log(err)
      }
    });
  }); 
}

module.exports = Order_item_property;