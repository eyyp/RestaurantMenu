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

ProductPhoto.setImage = (productPhoto,result) => {
    sql.query("INSERT INTO product_photo SET ?",productPhoto,(err, res) => {
        if (err) {
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        result(null, { product_id: productPhoto.product_id});
      }
    );
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