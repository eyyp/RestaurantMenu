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

const Property_type = function(property_type) {
    this.product_property_type_id = uuidv4();
    this.title = property_type.title;
    this.restaurant_id = property_type.restaurant_id;
    this.number_choices = property_type.number_choices;
    this.difficualty = property_type.difficualty;
    this.create_date = new Date();
};

Property_type.Create = (newPropertyType,result) => {

  sql.query("INSERT INTO property_type SET ?",newPropertyType,(err, res) => {
    if (err) {
        console.log(err)
        result(err, null);
        return;
    }
    result(null,newPropertyType)
  });
};

Property_type.TypeAll = (restaurant_id,result) => {

  sql.query(`SELECT * FROM property_type WHERE restaurant_id="${restaurant_id}"`,(err, res) => {
    if (err) {
      console.log(err)
      result(err, null);
      return;
    }
    result(null,res)
  });
};

module.exports = Property_type;