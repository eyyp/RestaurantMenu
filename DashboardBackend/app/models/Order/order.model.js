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

const Order = function(order) {
  this.order_id = uuidv4();
  this.user_id = order.user_id;
  this.table_id = order.table_id;
  this.restaurant_id = order.restaurant_id;
  this.total = order.total;
  this.piece = order.piece;
  this.create_date = new Date();
  this.active = "1";
};

Order.Pull = (restaurant_id,delivery,perPage,result) =>{
  sql.query(`SELECT * FROM restaurant_order WHERE restaurant_id="${restaurant_id}" and active="1" and delivery="${delivery}" ORDER BY create_date ASC LIMIT 3 OFFSET ${perPage}`,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }

    if(res.length > 0){
      result(null,res);
    }
    else{
      result(null,[]);
    }
  }); 
}

Order.Delete = (order_id,result) =>{
  console.log(order_id)
  sql.query(`UPDATE restaurant_order SET active="0" WHERE order_id="${order_id}"`,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }
    result(null,{status:false});
  }); 
}

Order.ChangeDelivery = (order_id,delivery,result) =>{
  sql.query(`UPDATE restaurant_order SET delivery="${delivery}" WHERE order_id="${order_id}"`,(err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if(delivery == "order"){
      result(null,{status:false});
    }
    else{
      result(null,{status:true});
    }
  }); 
}

Order.ItemFind = (order_id,result) =>{
  sql.query(`SELECT * FROM order_item WHERE order_id="${order_id}" `,(err, res) => {
    if (err) {
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
}

module.exports = Order;