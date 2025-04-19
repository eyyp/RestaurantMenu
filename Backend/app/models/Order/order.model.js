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

const Order_item = require("./oder_item.models.js");
const Order_item_property = require("./order_item_property.models.js");

const Order = function(order) {
  this.order_id = uuidv4();
  this.user_id = order.user_id;
  this.table_id = order.table_id;
  this.restaurant_id = order.restaurant_id;
  this.total = order.total;
  this.piece = order.piece;
  this.delivery = "order";
  this.active = "1";
  this.notes = order.notes;
  this.create_date = new Date();
};

Order.Create = (newOrder,cart_id,result) =>{
  sql.query(`INSERT INTO restaurant_order  SET ?`,newOrder,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }

  sql.query(`SELECT * FROM cart_item WHERE cart_id="${cart_id}"`,(err, resItem) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }

    if(resItem.length > 0){
      const jsonItem = JSON.parse(JSON.stringify(resItem));
      jsonItem.map((item,index)=>{
        const order_item = new Order_item({
            user_id: newOrder.user_id,
            order_id: newOrder.order_id,
            piece: "0",
            product_id: item.product_id 
        })
        Order_item.Add(order_item,item.item_id)
        sql.query(`SELECT * FROM cart_item_property WHERE cart_item_id="${item.item_id}"`,(err, resPropertyItem) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
          if(resPropertyItem.length > 0){
            const jsonItem = JSON.parse(JSON.stringify(resPropertyItem));
            jsonItem.map((item,index)=>{
              const order_item_property = new Order_item_property({
                order_item_id: order_item.order_item_id,
                property_id: item.property_id
              })
              Order_item_property.Add(order_item_property,item.cart_item_id)
            })
          }
          
        }); 
      })
    }
  });
    
    result(null,newOrder);
  }); 
}

module.exports = Order;