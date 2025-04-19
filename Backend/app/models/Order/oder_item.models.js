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

const Order_item = function(order) {
  this.order_item_id = uuidv4();
  this.user_id = order.user_id;
  this.order_id = order.order_id;
  this.product_id = order.product_id;
  this.piece = order.piece;
  this.create_date = new Date();
};

Order_item.Add = (newOrder,cart_item_id,result) =>{
  sql.query(`INSERT INTO order_item SET ?`,newOrder,(err, res) => {
    if(err){
        console.log(err)
    }
    sql.query(`DELETE FROM cart_item WHERE item_id="${cart_item_id}"`,(err, res) => {
        if(err){
            console.log(err)
        }
      });
  }); 
}

module.exports = Order_item;