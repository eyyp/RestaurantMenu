const sql = require("../db.js");
const winston = require('winston');
const Cart_item_property = require("./cart_item_property.js");
const Cart = require("./cart.model.js");
var logger = new winston.Logger({
  level: 'error',
  transports: [
    new (winston.transports.File)({ filename: 'error.log' })
  ]
});

const { 
    v4: uuidv4,
} = require('uuid');

const Cart_item = function(cart_item) {
  this.item_id = uuidv4();
  this.cart_id = cart_item.cart_id;
  this.product_id = cart_item.product_id;
  this.quantity = "1";
  this.create_date = new Date();
};

Cart_item.Add = (newCartItem,property,result) => {

  sql.query("INSERT INTO cart_item SET ?",newCartItem,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }

    sql.query(`SELECT * FROM product WHERE product_id="${newCartItem.product_id}" `,(err, res) => {
      if (err) {
        console.log(err)
        result(err, null);
        return;
      }
      if(res.length > 0){
        Cart.Increase(newCartItem.cart_id);
        Cart.TotalCalculate(res[0].price,newCartItem.cart_id);
      }
    }); 
    
    console.log("test");
    property.map((item,index)=>{
      const cart_item_property = new Cart_item_property({
        cart_item_id: newCartItem.item_id,
        property_id: item.property_id 
      })

      Cart_item_property.Add(cart_item_property)
    })
    result(null,newCartItem);
  });
};

Cart_item.DeleteItem = (cart_item_id,result) => {
  sql.query(`SELECT * FROM cart_item WHERE item_id="${cart_item_id}" `,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }
    if(res.length > 0){
      sql.query(`SELECT * FROM product WHERE product_id="${res[0].product_id}" `,(err, resProduct) => {
        if (err) {
          console.log(err)
          result(err, null);
          return;
        }
        if(resProduct.length > 0){
          //Cart.Increase(res.cart_id);
          Cart.TotalCalculateDec(resProduct[0].price,res[0].cart_id);
        }
        else{
          console.log("product non");
        }
      });
    }
    else{
      console.log("cart_item non");
    }
  });

  sql.query(`DELETE FROM cart_item WHERE item_id="${cart_item_id}"`,(err, resCart) => {
    if (err) {
      console.log('error','Cart user Error:',err);
      result(err, null);
      return;
    }
    sql.query(`DELETE FROM cart_item_property WHERE cart_item_id="${cart_item_id}"`,(err, resProperty) => {
      if (err) {
        console.log('error','Cart user Error:',err);
        result(err, null);
        return;
      }
      result(null,{cart_item_id});
    });
  });

};

module.exports = Cart_item;