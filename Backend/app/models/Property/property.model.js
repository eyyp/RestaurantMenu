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

const Property = function(property){

}
  
Property.Type = (restaurant_id,result) => {

    let query = `SELECT * FROM property_type WHERE restaurant_id = "${restaurant_id}" `;
    sql.query(query, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        
        result(null,res);
    });
};

Property.Find = (property_id,result) => {

  let query = `SELECT * FROM product_property WHERE property_id = "${property_id}"`;
  sql.query(query, (err, res) => {
      if (err) {
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

Property.Product = (product_id,product_property_type_id,result) => {

  let query = `SELECT * FROM product_property WHERE product_id = "${product_id}" and product_property_type_id="${product_property_type_id}"`;
  sql.query(query, (err, res) => {
    if (err) {
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
 
module.exports = Property;