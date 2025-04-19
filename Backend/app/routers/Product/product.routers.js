const authorize = require('../../middleware/authorize/authorize.js');

module.exports = app => {
    const Product = require("../../controllers/Product/product.controller.js");
  
    var router = require("express").Router();
  
    router.get("/all/:restaurant_id", Product.All);

    router.post("/category", Product.Category);

    router.get("/find/:product_id", Product.Find);

    app.use('/api/v1/product', authorize.authorize ,router);
    
};