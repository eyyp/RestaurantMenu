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

const ProductPhoto = function(photo) {
    this.product_photo_id = uuidv4();
    this.product_id = photo.product_id;
    this.photo_url = photo.photo_url;
    this.create_date = new Date();
};
  
ProductPhoto.image = (product_id,result) => {
    let query = `SELECT photo_url FROM product_photo WHERE product_id = "${product_id}" `;
    sql.query(query, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
};
 
module.exports = ProductPhoto;