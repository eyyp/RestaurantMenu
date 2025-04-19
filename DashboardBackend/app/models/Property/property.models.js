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

const Property = function(property) {
    this.property_id = uuidv4();
    this.title = property.title;
    this.product_id = property.product_id;
    this.product_property_type_id = property.product_property_type_id;
    this.create_date = new Date();
};

Property.Add = (newProperty) => {

  sql.query("INSERT INTO product_property SET ?",newProperty,(err, res) => {
    if (err) {
        console.log(err)
    }
  });
};

Property.Find = (property_id,result) => {

  sql.query(`SELECT * FROM product_property WHERE property_id="${property_id}" `,(err, res) => {
    if (err) {
      console.log(err);
      result(err,null);
    }

    if(res.length > 0){
      result(null,res[0]);
    }
  });
};

module.exports = Property;