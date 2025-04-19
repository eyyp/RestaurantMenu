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

// Cardaki ürün adedi güncellenmeli 
// Cart fiyatı güncellenmeli

const Cart = function(cart) {
  this.cart_id = uuidv4();
  this.user_id = cart.user_id;
  this.restaurant_id = cart.restaurant_id;
  this.table_id = cart.table_id;
  this.total = "0";
  this.create_date = new Date();
};

Cart.TotalCalculate = (price,cart_id) =>{
  sql.query(`SELECT * FROM cart WHERE cart_id="${cart_id}" `,(err, res) => {
    if (err) {
      logger.log('error','Cart total update Error:',err);
      result(err, null);
      return;
    }
    
    let jsonResult = JSON.parse(JSON.stringify(res))
    const total = parseInt(jsonResult[0].total) + parseInt(price);
    sql.query(`UPDATE cart SET total="${total}"  WHERE cart_id="${cart_id}" `,(err, res) => {
      if (err) {
        logger.log('error','Cart total update Error:',err);
        result(err, null);
        return;
      }
    });
  }); 
}

Cart.TotalCalculateDec = (price,cart_id) =>{
  sql.query(`SELECT * FROM cart WHERE cart_id="${cart_id}" `,(err, res) => {
    if (err) {
      logger.log('error','Cart total update Error:',err);
      result(err, null);
      return;
    }
    if(res.length > 0){
      let jsonResult = JSON.parse(JSON.stringify(res))
      const total = parseInt(jsonResult[0].total) - parseInt(price);
      sql.query(`UPDATE cart SET total="${total}" WHERE cart_id="${cart_id}" `,(err, res) => {
        if (err) {
          logger.log('error','Cart total update Error:',err);
          result(err, null);
          return;
        }
      });
    }
  }); 
}

Cart.Increase = (cart_id) =>{
  sql.query(`SELECT * FROM cart WHERE cart_id="${cart_id}" `,(err, res) => {
    if (err) {
      logger.log('error','Cart total update Error:',err);
      return;
    }
    
    let jsonResult = JSON.parse(JSON.stringify(res))
    const piece = jsonResult[0].piece + 1;

    sql.query(`UPDATE cart SET piece="${piece}" WHERE cart_id="${cart_id}" `,(err, res) => {
      if (err) {
        logger.log('error','Cart total update Error:',err);
        return;
      }
    });
  }); 
}

Cart.Decrease = (cart_id) =>{
  sql.query(`SELECT * FROM cart WHERE cart_id="${cart_id}" `,(err, res) => {
    if (err) {
      logger.log('error','Cart total update Error:',err);
      return;
    }
    
    let jsonResult = JSON.parse(JSON.stringify(res))
    const piece = jsonResult[0].piece - 1;

    sql.query(`UPDATE cart SET piece="${piece}" WHERE cart_id="${cart_id}" `,(err, res) => {
      if (err) {
        logger.log('error','Cart total update Error:',err);
        return;
      }
    });
  }); 
}

Cart.Create = (newCart,result) => {
  sql.query(`SELECT * FROM cart WHERE user_id="${newCart.user_id}" and restaurant_id="${newCart.restaurant_id}" and table_id="${newCart.table_id}" `,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }
    
    if(res.length === 0){
      sql.query("INSERT INTO cart SET ?",newCart,(err, resCreate) => {
        if (err) {
          logger.log('error','User create Error:',err);
          result(err, null);
          return;
        }
        result(null,{...newCart});
      });
    }
    else{
      result(null,res[0]);
    }
  });
};

Cart.User = (cart_id,result) => {

  sql.query(`SELECT * FROM cart_item WHERE cart_id="${cart_id}"`,(err, res) => {
    if (err) {
      logger.log('error','Cart user Error:',err);
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
};

Cart.Total = (cart_id,result) => {

  sql.query(`SELECT * FROM cart WHERE cart_id="${cart_id}"`,(err, res) => {
    if (err) {
      logger.log('error','Cart user Error:',err);
      result(err, null);
      return;
    }
    if(res.length > 0){
      result(null,{total:res[0].total});
    }
    else{
      result(null,{total:0});
    }
  });
};

Cart.Count = (cart_id,result) => {

  sql.query(`SELECT COUNT(*) as count FROM cart_item WHERE cart_id="${cart_id}"`,(err, res) => {
    if (err) {
      logger.log('error','Cart user Error:',err);
      result(err, null);
      return;
    }
    if(res.length > 0){
      result(null,res[0]);
    }
    else{
      result(null,{count:0});
    }
  });
};

Cart.Delete = (cart_id,result) => {

  sql.query(`DELETE FROM cart WHERE cart_id="${cart_id}"`,(err, res) => {
    if (err) {
      logger.log('error','Cart user Error:',err);
      result(err, null);
      return;
    }
    result(null,{status:true});
  });
};

module.exports = Cart;